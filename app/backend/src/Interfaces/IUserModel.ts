import { Role } from '../types/Role';
import IUser from './IUser';
import LoginData from './Login';

export default interface IUserModel {
  login(loginData: LoginData): Promise<IUser | null>,
  getRole(id: number): Promise<Role | null>,
}
