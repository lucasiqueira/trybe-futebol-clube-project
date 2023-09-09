import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { MatchModel } from '../models';
import IMatch from '../Interfaces/IMatch';

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
  ) {}

  public async getAllMatches(inProgress: string): Promise<ServiceResponse<IMatch[]>> {
    const data = await this.matchModel.findAll(inProgress);
    return { status: 'SUCCESSFUL', data };
  }
}
