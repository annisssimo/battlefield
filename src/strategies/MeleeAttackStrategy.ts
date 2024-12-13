import Unit from '../models/Unit';
import AttackRangeCalculator from '../services/AttackRangeCalculator';
import LogService from '../services/LogService';
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

    enemyTeam.forEach((unit) => unit.state.setPossibleTarget(false));

    allowedIndices.forEach((index) => {
      if (enemyTeam[index]) {
        enemyTeam[index].state.setPossibleTarget(true);
      }
    });
  }

  executeAction(attacker: Unit, allUnits: AllUnits, target: Unit): void {
    target.takeDamage(attacker.damage);

    LogService.log(
      `${attacker.name} attacks ${target.name}! Remaining HP: ${target.healthPoints}`
    );
  }
}

export default MeleeAttackStrategy;
