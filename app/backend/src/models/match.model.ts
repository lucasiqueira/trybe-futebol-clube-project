import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

import IMatch from '../Interfaces/IMatch';
import IMatchModel from '../Interfaces/IMatchModel';
import IMatchInsert from '../Interfaces/IMatchInsert';
import { GoalsData } from '../types/GoalsData';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(inProgress?: string): Promise<IMatch[]> {
    console.log(MatchModel.createFilter(inProgress));
    const data = await this.model.findAll(
      {
        where: MatchModel.createFilter(inProgress),
        include: [
          {
            model: SequelizeTeam, as: 'homeTeam', attributes: ['teamName'],
          }, {
            model: SequelizeTeam, as: 'awayTeam', attributes: ['teamName'],
          },
        ],
      },
    );
    return data;
  }

  private static createFilter(inProgress: string | undefined) {
    if (inProgress === null) return {};
    if (inProgress === 'true') return { inProgress: true };
    if (inProgress === 'false') return { inProgress: false };
  }

  async findById(id: number): Promise<IMatch | null> {
    const data = await this.model.findByPk(id);
    if (!data) return null;
    return data;
  }

  async patchMatch(id: number): Promise<boolean> {
    const matchData = await this.findById(id);
    if (!matchData) return false;
    await this.model.update({ inProgress: false }, { where: { id } });
    return true;
  }

  async patchGoals(id: number, goalsData: GoalsData): Promise<boolean> {
    const matchData = await this.findById(id);
    if (!matchData) return false;
    await this.model.update(goalsData, { where: { id } });
    return true;
  }

  async createMatch(matchData: IMatchInsert): Promise<IMatch> {
    const data = await this.model.create({ ...matchData, inProgress: true });
    console.log(data);
    return data;
  }
}
