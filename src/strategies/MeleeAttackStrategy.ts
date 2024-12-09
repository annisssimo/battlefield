import Unit from '../models/Unit';
import { TeamNames } from '../types/types';
import ActionStrategy from './ActionStrategy';

class MeleeAttackStrategy implements ActionStrategy {
  highlightTargets(attacker: Unit, allUnits: { red: Unit[]; orange: Unit[] }) {
    const enemyTeam = this.getEnemyTeam(attacker, allUnits);

    const allowedIndices = this.calculateAllowedIndices(
      attacker.teamIndex,
      attacker.team,
      enemyTeam
    );

    console.log('allowedIndices: ', allowedIndices);

    enemyTeam.forEach((unit) => unit.state.setPossibleTarget(false));

    allowedIndices.forEach((index) => {
      if (enemyTeam[index]) {
        enemyTeam[index].state.setPossibleTarget(true);
      }
    });
  }

  executeAction(
    attacker: Unit,
    target: Unit,
    allUnits: { red: Unit[]; orange: Unit[] }
  ): void {
    const enemyTeam = this.getEnemyTeam(attacker, allUnits);

    console.log(enemyTeam);

    console.log(`${attacker.name} attacks ${target.name}!`);
    target.takeDamage(attacker.damage);
  }

  private getEnemyTeam(
    attacker: Unit,
    allUnits: { red: Unit[]; orange: Unit[] }
  ) {
    return attacker.team === 'red' ? allUnits.orange : allUnits.red;
  }

  private calculateAllowedIndices(
    attackerIndex: number,
    attackerTeam: TeamNames,
    enemyTeam: Unit[]
  ): number[] {
    console.log(attackerIndex);
    console.log(attackerTeam);
    console.log(enemyTeam);

    const ranges: Record<TeamNames, Record<number, number[]>> = {
      red: {
        3: [0, 1],
        4: [0, 1, 2],
        5: [1, 2],
      },
      orange: {
        0: [3, 4],
        1: [3, 4, 5],
        2: [4, 5],
      },
    };

    return ranges[attackerTeam][attackerIndex] || [];
  }
}

export default MeleeAttackStrategy;
