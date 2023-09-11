import { MatchModel } from '../models';

import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatch from '../Interfaces/IMatch';
import IMatchInsert from '../Interfaces/IMatchInsert';
import { MessageResponse } from '../types/MessageResponse';
import { GoalsData } from '../types/GoalsData';

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

  public async patchGoals(id: number, goalsData: GoalsData)
    : Promise<ServiceResponse<MessageResponse>> {
    const wasDataPatched = await this.matchModel.patchGoals(id, goalsData);
    if (!wasDataPatched) return { status: 'INVALID_DATA', data: { message: 'Match not found' } };
    return { status: 'SUCCESSFUL', data: { message: 'Score registered' } };
  }

  public async createMatch(matchData: IMatchInsert) {
    try {
      const data = await this.matchModel.createMatch(matchData);
      return { status: 'CREATED', data };
    } catch (error) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
  }
}
