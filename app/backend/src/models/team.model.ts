import ITeam from '../Interfaces/ITeam';
import ITeamModel from '../Interfaces/ITeamModel';
import SequelizeTeam from '../database/models/SequelizeTeam';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const data = await this.model.findAll();
    return data.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(id: number): Promise<ITeam | null> {
    const data = await this.model.findByPk(id);
    if (!data) return null;
    const { teamName } = data;
    return { id, teamName };
  }
}
