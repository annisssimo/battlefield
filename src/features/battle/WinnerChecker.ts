import Unit from '../units/models/Unit';

export class WinnerChecker {
  static checkForWinner(teams: { red: Unit[]; orange: Unit[] }): string | null {
    const redAlive = teams.red.some((unit) => unit.isAlive());
    const orangeAlive = teams.orange.some((unit) => unit.isAlive());

    if (!redAlive) return 'Orange';
    if (!orangeAlive) return 'Red';
    return null;
  }
}
