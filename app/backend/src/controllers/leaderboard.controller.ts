import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { LeaderboardService } from '../services';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) {}

  public async getLeaderboard(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.getLeaderboard();
    res.status(mapStatusHTTP(status)).json(data);
  }
}
