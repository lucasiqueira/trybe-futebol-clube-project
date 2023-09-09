import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { MatchService } from '../services';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const { status, data } = await this.matchService.getAllMatches(String(inProgress));
    res.status(mapStatusHTTP(status)).json(data);
  }
}
