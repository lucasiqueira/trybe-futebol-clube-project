import IHomeLeaderboard from '../Interfaces/IHomeLeaderboard';
import IMatch from '../Interfaces/IMatch';
import ITeam from '../Interfaces/ITeam';

export default class LeaderboardUtils {
  private _finishedMatches = this._matches.filter((match: IMatch) => !match.inProgress);

  constructor(private _teams: ITeam[], private _matches: IMatch[], private _url: string) {}

  private getName = (team: ITeam) => team.teamName;

  private getHomePoints = (match: IMatch): number => {
    if (match.homeTeamGoals > match.awayTeamGoals) return 3;
    if (match.homeTeamGoals === match.awayTeamGoals) return 1;
    return 0;
  };

  private getAwayPoints = (match: IMatch): number => {
    if (match.awayTeamGoals > match.homeTeamGoals) return 3;
    if (match.awayTeamGoals === match.homeTeamGoals) return 1;
    return 0;
  };

  private getTotalPoints = (team: ITeam): number =>
    this._finishedMatches.reduce((total: number, match: IMatch) => {
      if ((this._url === '/home' || this._url === '/') && match.homeTeamId === team.id) {
        return total + this.getHomePoints(match);
      }
      if ((this._url === '/away' || this._url === '/') && match.awayTeamId === team.id) {
        return total + this.getAwayPoints(match);
      }
      return total;
    }, 0);

  private getTotalGames = (team: ITeam): number =>
    this._finishedMatches.reduce((total: number, match: IMatch) => {
      if ((this._url === '/home' || this._url === '/') && match.homeTeamId === team.id) {
        return total + 1;
      }
      if ((this._url === '/away' || this._url === '/') && match.awayTeamId === team.id) {
        return total + 1;
      }
      return total;
    }, 0);

  private getTotalVictories = (team: ITeam): number =>
    this._finishedMatches.reduce((total: number, match: IMatch) => {
      if ((this._url === '/home' || this._url === '/') && match.homeTeamId === team.id
        && match.homeTeamGoals > match.awayTeamGoals) {
        return total + 1;
      }
      if ((this._url === '/away' || this._url === '/') && match.awayTeamId === team.id
        && match.awayTeamGoals > match.homeTeamGoals) {
        return total + 1;
      }
      return total;
    }, 0);

  private getTotalDraws = (team: ITeam): number =>
    this._finishedMatches.reduce((total: number, match: IMatch) => {
      if ((this._url === '/home' || this._url === '/') && match.homeTeamId === team.id
      && match.homeTeamGoals === match.awayTeamGoals) {
        return total + 1;
      }
      if ((this._url === '/away' || this._url === '/') && match.awayTeamId === team.id
      && match.awayTeamGoals === match.homeTeamGoals) {
        return total + 1;
      }
      return total;
    }, 0);

  private getGoalsFavor = (team: ITeam): number =>
    this._finishedMatches.reduce((total: number, match: IMatch) => {
      if ((this._url === '/home' || this._url === '/') && match.homeTeamId === team.id) {
        return total + match.homeTeamGoals;
      }
      if ((this._url === '/away' || this._url === '/') && match.awayTeamId === team.id) {
        return total + match.awayTeamGoals;
      }
      return total;
    }, 0);

  private getGoalsOwn = (team: ITeam): number =>
    this._finishedMatches.reduce((total: number, match: IMatch) => {
      if ((this._url === '/home' || this._url === '/') && match.homeTeamId === team.id) {
        return total + match.awayTeamGoals;
      }
      if ((this._url === '/away' || this._url === '/') && match.awayTeamId === team.id) {
        return total + match.homeTeamGoals;
      }
      return total;
    }, 0);

  private getGoalsBalance = (team: ITeam): number =>
    this.getGoalsFavor(team) - this.getGoalsOwn(team);

  private getEfficiency = (team: ITeam): number =>
    Number(((this.getTotalPoints(team) / ((this.getTotalGames(team) * 3))) * 100).toFixed(2));

  private sortResults = (results: IHomeLeaderboard[]) => {
    const sortedResults = results.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }

      if (a.totalVictories !== b.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }

      if (a.goalsBalance !== b.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }

      return b.goalsFavor - a.goalsFavor;
    });
    return sortedResults;
  };

  public getResults = (): IHomeLeaderboard[] => {
    const rawResults = this._teams.map((team: ITeam) => ({
      name: this.getName(team),
      totalPoints: this.getTotalPoints(team),
      totalGames: this.getTotalGames(team),
      totalVictories: this.getTotalVictories(team),
      totalDraws: this.getTotalDraws(team),
      totalLosses:
        this.getTotalGames(team) - this.getTotalVictories(team) - this.getTotalDraws(team),
      goalsFavor: this.getGoalsFavor(team),
      goalsOwn: this.getGoalsOwn(team),
      goalsBalance: this.getGoalsBalance(team),
      efficiency: this.getEfficiency(team),
    }));
    return this.sortResults(rawResults);
  };
}
