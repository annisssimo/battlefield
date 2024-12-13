import Unit from '../models/Unit';
import AttackRangeCalculator from '../services/AttackRangeCalculator';
import HighlightService from '../services/HighlightService';
import LogService from '../services/LogService';
import { AllUnits } from '../types/types';
import ActionStrategy from './ActionStrategy';
import BaseStrategy from './BaseStrategy';

class MeleeAttackStrategy extends BaseStrategy implements ActionStrategy {
  highlightTargets(attacker: Unit, allUnits: AllUnits) {
    const enemyTeam = this.getEnemyTeam(attacker, allUnits);

    const allowedIndices = AttackRangeCalculator.calculateMeleeRange(
      attacker.teamIndex,
      attacker.team
    );

    if (allowedIndices.length === 0) {
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
