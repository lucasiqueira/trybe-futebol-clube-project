import { MatchModel, TeamModel } from '../models';
import LeaderboardUtils from '../utils/leaderboard.utils';

export default class LeaderboardService {
  constructor(
    private matchModel = new MatchModel(),
    private teamModel = new TeamModel(),
  ) {}

  public async getLeaderboard() {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll();
    const leaderboardUtils = new LeaderboardUtils(teams, matches);
    const results = leaderboardUtils.getResults();
    return { status: 'SUCCESSFUL', data: results };
  }
}
