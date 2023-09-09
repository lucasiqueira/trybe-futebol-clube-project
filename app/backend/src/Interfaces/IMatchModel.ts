import IMatch from './IMatch';

export default interface ITeamModel {
  findAll(): Promise<IMatch[]>,
}
