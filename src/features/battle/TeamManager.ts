import { generateRandomTeam } from '../units/utils/randomTeamGenerator';
import Unit from '../units/models/Unit';

export class TeamManager {
  static initializeTeams() {
    const redTeam = generateRandomTeam('red');
    const orangeTeam = generateRandomTeam('orange');
    return { redTeam, orangeTeam };
  }

  static sortUnitsByInitiative(redTeam: Unit[], orangeTeam: Unit[]): Unit[] {
    return [...redTeam, ...orangeTeam].sort((a, b) => {
      if (a.initiative === b.initiative) return Math.random() - 0.5;
      return b.initiative - a.initiative;
    });
  }
}
