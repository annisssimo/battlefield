import { AllUnits } from '../../../shared/types/types';
import Unit from '../../units/models/Unit';
import AttackRangeCalculator from '../../units/services/AttackRangeCalculator';
import HighlightService from '../../units/services/HighlightService';
import LogService from '../../units/services/LogService';
import ActionStrategy from './ActionStrategy';
import BaseStrategy from './BaseStrategy';

class MeleeAttackStrategy extends BaseStrategy implements ActionStrategy {
  highlightTargets(attacker: Unit, allUnits: AllUnits) {
    const enemyTeam = this.getEnemyTeam(attacker, allUnits);

    // resets visited units before each melee hit
    AttackRangeCalculator.visitedUnits.clear();

    // get allowed indices for attack based on the attacker's position and state
    const allowedIndices = AttackRangeCalculator.calculateMeleeRange(
      allUnits,
      attacker,
      attacker
    );

    if (allowedIndices.size === 0) {
      LogService.info(
        `${attacker.name} don't have valid targets to attack. But can defend himself! Click the shield icon`
      );
      return;
    }

    HighlightService.highlightOnlyValidTargets(enemyTeam, allowedIndices);
  }

  executeAction(attacker: Unit, _allUnits: AllUnits, target: Unit): void {
    target.takeDamage(attacker.damage);

    LogService.log(
      `${attacker.name} attacks ${target.name}! Remaining HP: ${target.healthPoints}`
    );
  }
}

export default MeleeAttackStrategy;
