import { MatchModel } from '../models';

import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatch from '../Interfaces/IMatch';
import { MessageResponse } from '../types/MessageResponse';

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
  ) {}

  public async getAllMatches(inProgress: string): Promise<ServiceResponse<IMatch[]>> {
    const data = await this.matchModel.findAll(inProgress);
    return { status: 'SUCCESSFUL', data };
  }

  public async patchMatch(id: number): Promise<ServiceResponse<MessageResponse>> {
    const wasDataPatched = await this.matchModel.patchMatch(id);
    if (!wasDataPatched) return { status: 'INVALID_DATA', data: { message: 'Match not found' } };
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }
}
