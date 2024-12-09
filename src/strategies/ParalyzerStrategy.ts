import Unit from '../models/Unit';
import AttackRangeCalculator from '../services/AttackRangeCalculator';
import HighlightService from '../services/HighlightService';
import { AllUnits } from '../types/types';
import ActionStrategy from './ActionStrategy';
import BaseStrategy from './BaseStrategy';

class ParalyzerStrategy extends BaseStrategy implements ActionStrategy {
  highlightTargets(attacker: Unit, allUnits: AllUnits) {
    const enemyTeam = this.getEnemyTeam(attacker, allUnits);

    const allowedIndices = AttackRangeCalculator.calculateMassAttack(enemyTeam);

    HighlightService.highlightOnlyValidTargets(enemyTeam, allowedIndices);
  }

  executeAction(attacker: Unit, allUnits: AllUnits, target?: Unit): void {
    if (!target || !target.state.isPossibleTarget || !target.isAlive()) {
      console.log(`${attacker.name} has no valid target!`);
      return;
    }

    console.log(`${attacker.name} paralyzes ${target.name}!`);
    target.state.setParalyzed(true);
  }
}

export default ParalyzerStrategy;
