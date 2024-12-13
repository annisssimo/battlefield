import Unit from '../models/Unit';
import AttackRangeCalculator from '../services/AttackRangeCalculator';
import HighlightService from '../services/HighlightService';
import LogService from '../services/LogService';
import { AllUnits } from '../types/types';
import ActionStrategy from './ActionStrategy';
import BaseStrategy from './BaseStrategy';

class RangeAttackStrategy extends BaseStrategy implements ActionStrategy {
  highlightTargets(attacker: Unit, allUnits: AllUnits) {
    const enemyTeam = this.getEnemyTeam(attacker, allUnits);

    const allowedIndices = AttackRangeCalculator.calculateMassAttack(enemyTeam);

    HighlightService.highlightOnlyValidTargets(enemyTeam, allowedIndices);
  }

  executeAction(attacker: Unit, allUnits: AllUnits, target?: Unit): void {
    if (!target || !target.state.isPossibleTarget || !target.isAlive()) {
      LogService.log(`${attacker.name} has no valid target!`);
      return;
    }

    target.takeDamage(attacker.damage);

    LogService.log(
      `${attacker.name} attacks ${target.name}! Remaining HP: ${target.healthPoints}`
    );
  }
}

export default RangeAttackStrategy;
