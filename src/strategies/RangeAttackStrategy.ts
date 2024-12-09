import Unit from '../models/Unit';
import AttackRangeCalculator from '../services/AttackRangeCalculator';
import HighlightService from '../services/HighlightService';
import { AllUnits } from '../types/types';
import ActionStrategy from './ActionStrategy';
import BaseStrategy from './BaseStrategy';

class RangeAttackStrategy extends BaseStrategy implements ActionStrategy {
  highlightTargets(attacker: Unit, allUnits: AllUnits) {
    const enemyTeam = this.getEnemyTeam(attacker, allUnits);

    const allowedIndices =
      AttackRangeCalculator.calculateRangeAttack(enemyTeam);

    HighlightService.highlightOnlyValidTargets(enemyTeam, allowedIndices);
  }

  executeAction(attacker: Unit, allUnits: AllUnits, target?: Unit): void {
    if (!target || !target.state.isPossibleTarget) {
      console.log(`${attacker.name} has no valid target!`);
      return;
    }

    if (target.healthPoints <= 0) {
      console.log(`${target.name} is already dead!`);
      return;
    }

    console.log(`${attacker.name} attacks ${target.name}!`);
    target.takeDamage(attacker.damage);
  }
}

export default RangeAttackStrategy;
