import { compareSync } from 'bcryptjs';

import { UserModel } from '../models';
import JWT from '../utils/JWT';

import { ServiceResponse } from '../Interfaces/ServiceResponse';
import LoginData from '../Interfaces/Login';
import IUserModel from '../Interfaces/IUserModel';
import Token from '../Interfaces/Token';
import { Role } from '../types/Role';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwt = new JWT(),
  ) {}

  public async login(loginData: LoginData): Promise<ServiceResponse<Token>> {
    const userData = await this.userModel.login(loginData);

    if (!userData || !compareSync(loginData.password, userData.password)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = this.jwt.createToken({ id: userData.id, role: userData.role });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async getRole(bearer: string): Promise<ServiceResponse<Role>> {
    const token = bearer.split(' ')[1] || bearer;
    const payload = this.jwt.verifyToken(token);

    if (!payload) {
      return { status: 'UNAUTHORIZED', data: { message: 'Token must be a valid token' } };
    }

    const role = await this.userModel.getRole(payload.id);

    if (!role) {
      return { status: 'NOT_FOUND', data: { message: 'User not found' } };
    }

    return { status: 'SUCCESSFUL', data: role };
  }
}
