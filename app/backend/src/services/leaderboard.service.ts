import { MatchModel, TeamModel } from '../models';
import LeaderboardUtils from '../utils/leaderboard.utils';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IHomeLeaderboard from '../Interfaces/IHomeLeaderboard';

export default class LeaderboardService {
  constructor(
    private matchModel = new MatchModel(),
    private teamModel = new TeamModel(),
  ) {}

  public async getLeaderboard(url: string): Promise<ServiceResponse<IHomeLeaderboard[]>> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll();
    const leaderboardUtils = new LeaderboardUtils(teams, matches, url);
    const results = leaderboardUtils.getResults();
    return { status: 'SUCCESSFUL', data: results };
  }
}
