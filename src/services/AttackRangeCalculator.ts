import Unit from '../models/Unit';

class AttackRangeCalculator {
  static calculateMeleeRange(
    attackerIndex: number,
    attackerTeam: 'red' | 'orange'
  ): number[] {
    const ranges: Record<'red' | 'orange', Record<number, number[]>> = {
      red: {
        0: [],
        1: [],
        2: [],
        3: [0, 1],
        4: [0, 1, 2],
        5: [1, 2],
      },
      orange: {
        0: [3, 4],
        1: [3, 4, 5],
        2: [4, 5],
        3: [],
        4: [],
        5: [],
      },
    };

    return ranges[attackerTeam][attackerIndex];
  }

  static calculateMassAttack(enemyTeam: Unit[]): number[] {
    return enemyTeam
      .map((unit, index) => (unit.isAlive() ? index : -1))
      .filter((index) => index !== -1);
  }
}

export default AttackRangeCalculator;
