import Unit from '../models/Unit';
import AttackRangeCalculator from '../services/AttackRangeCalculator';
import { AllUnits } from '../types/types';
import ActionStrategy from './ActionStrategy';
import BaseStrategy from './BaseStrategy';

class MeleeAttackStrategy extends BaseStrategy implements ActionStrategy {
  highlightTargets(attacker: Unit, allUnits: AllUnits) {
    const enemyTeam = this.getEnemyTeam(attacker, allUnits);

    const allowedIndices = AttackRangeCalculator.calculateMeleeRange(
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

  executeAction(attacker: Unit, allUnits: AllUnits, target: Unit): void {
    const enemyTeam = this.getEnemyTeam(attacker, allUnits);

    console.log(enemyTeam);

    console.log(`${attacker.name} attacks ${target.name}!`);
    target.takeDamage(attacker.damage);
  }
}

export default MeleeAttackStrategy;
