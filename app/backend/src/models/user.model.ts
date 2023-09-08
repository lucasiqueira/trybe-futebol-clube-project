import LoginData from '../Interfaces/Login';
import IUser from '../Interfaces/IUser';
import IUserModel from '../Interfaces/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async login(loginData: LoginData): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email: loginData.email } });

    if (!user) return null;

    const { id, username, password, role } = user;
    return { id, username, password, role, email: loginData.email };
  }
}
