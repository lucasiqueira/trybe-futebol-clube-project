import SequelizeMatch from '../database/models/SequelizeMatch';
import SequelizeTeam from '../database/models/SequelizeTeam';

import IMatch from '../Interfaces/IMatch';
import IMatchModel from '../Interfaces/IMatchModel';

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
}
