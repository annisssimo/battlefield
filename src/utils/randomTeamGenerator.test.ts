import { generateRandomTeam } from './randomTeamGenerator';
import { UnitName } from '../enums/unit.enums';
import { UnitFactory } from '../models/UnitFactory';
import { TeamNames } from '../types/types';

jest.mock('../models/UnitFactory', () => ({
  UnitFactory: jest.fn((name, team, index) => ({
    id: `${name}-${team}-${index}`,
    name,
    team,
    teamIndex: index,
  })),
}));

describe('generateRandomTeam', () => {
  const teamName: TeamNames = 'red';

  it('should generate a team with 6 units', () => {
    const team = generateRandomTeam(teamName);

    expect(team).toHaveLength(6);
  });

  it('should generate units with valid names and team', () => {
    const team = generateRandomTeam(teamName);
    const validNames = Object.values(UnitName);

    team.forEach((unit, index) => {
      expect(validNames).toContain(unit.name);
      expect(unit.team).toBe(teamName);
      expect(unit.teamIndex).toBe(index);
    });
  });

  it('should call UnitFactory for each unit', () => {
    generateRandomTeam(teamName);

    expect(UnitFactory).toHaveBeenCalledTimes(6);
    for (let i = 0; i < 6; i++) {
      expect(UnitFactory).toHaveBeenCalledWith(expect.any(String), teamName, i);
    }
  });

  it('should generate different teams on subsequent calls', () => {
    const team1 = generateRandomTeam(teamName);
    const team2 = generateRandomTeam(teamName);

    // verify that at least some units differ between the two teams
    const differences = team1.filter(
      (unit, index) => unit.name !== team2[index]?.name
    );
    expect(differences.length).toBeGreaterThan(0);
  });
});
