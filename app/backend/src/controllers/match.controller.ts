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

  public async patchMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchService.patchMatch(Number(id));
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async patchGoals(req: Request, res: Response) {
    const { id } = req.params;
    const goalsData = req.body;
    const { status, data } = await this.matchService.patchGoals(Number(id), goalsData);
    res.status(mapStatusHTTP(status)).json(data);
  }
}
