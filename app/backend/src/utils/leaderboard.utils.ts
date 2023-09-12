import IMatch from '../Interfaces/IMatch';
import ITeam from '../Interfaces/ITeam';

export default class LeaderboardUtils {
  constructor(private teams: ITeam[], private matches: IMatch[]) {}

  private getName = (team: ITeam) => team.teamName;

  private getTotalPoints = (team: ITeam) => {
    const { matches } = this;
    return matches.reduce((total: number, match: IMatch) => {
      if (match.homeTeamId === team.id) {
        if (match.homeTeamGoals > match.awayTeamGoals) return total + 3;
        if (match.homeTeamGoals === match.awayTeamGoals) return total + 1;
      }
      if (match.awayTeamId === team.id) {
        if (match.awayTeamGoals > match.homeTeamGoals) return total + 3;
        if (match.awayTeamGoals === match.homeTeamGoals) return total + 1;
      }
      return total;
    }, 0);
  };

  private getTotalGames = (team: ITeam) => this.matches.reduce((total: number, match: IMatch) => {
    if (match.homeTeamId === team.id || match.awayTeamId === team.id) return total + 1;
    return total;
  }, 0);

  private getTotalVictories = (team: ITeam) =>
    this.matches.reduce((total: number, match: IMatch) => {
      if (match.homeTeamId === team.id && match.homeTeamGoals > match.awayTeamGoals) {
        return total + 1;
      }
      if (match.awayTeamId === team.id && match.awayTeamGoals > match.homeTeamGoals) {
        return total + 1;
      }
      return total;
    }, 0);

  private getTotalDraws = (team: ITeam) => this.matches.reduce((total: number, match: IMatch) => {
    if (match.homeTeamId === team.id && match.homeTeamGoals === match.awayTeamGoals) {
      return total + 1;
    }
    if (match.awayTeamId === team.id && match.awayTeamGoals === match.homeTeamGoals) {
      return total + 1;
    }
    return total;
  }, 0);

  private getGoalsFavor = (team: ITeam) => this.matches.reduce((total: number, match: IMatch) => {
    if (match.homeTeamId === team.id) return total + match.homeTeamGoals;
    if (match.awayTeamId === team.id) return total + match.awayTeamGoals;
    return total;
  }, 0);

  private getGoalsOwn = (team: ITeam) => this.matches.reduce((total: number, match: IMatch) => {
    if (match.homeTeamId === team.id) return total + match.awayTeamGoals;
    if (match.awayTeamId === team.id) return total + match.homeTeamGoals;
    return total;
  }, 0);

  private getGoalsBalance = (team: ITeam) => this.getGoalsFavor(team) - this.getGoalsOwn(team);

  private getEfficiency = (team: ITeam) =>
    ((this.getTotalPoints(team) / ((this.getTotalGames(team) * 3))) * 100).toFixed(2);

  public getResults = () => this.teams.map((team: ITeam) => ({
    name: this.getName(team),
    totalPoints: this.getTotalPoints(team),
    totalGames: this.getTotalGames(team),
    totalVictories: this.getTotalVictories(team),
    totalDraws: this.getTotalDraws(team),
    totalLosses: this.getTotalGames(team) - this.getTotalVictories(team) - this.getTotalDraws(team),
    goalsFavor: this.getGoalsFavor(team),
    goalsOwn: this.getGoalsOwn(team),
  }));
}
