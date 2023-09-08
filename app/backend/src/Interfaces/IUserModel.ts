import IUser from './IUser';
import LoginData from './Login';

export default interface ITeamModel {
  login(loginData: LoginData): Promise<IUser | null>
}
