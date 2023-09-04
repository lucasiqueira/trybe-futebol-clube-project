import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ITeamModel from '../Interfaces/ITeamModel';
import TeamModel from '../models';
import ITeam from '../Interfaces/ITeam';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const data = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data };
  }
}
