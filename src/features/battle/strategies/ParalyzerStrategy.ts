import { AllUnits } from '../../../shared/types/types';
import Unit from '../../units/models/Unit';
import AttackRangeCalculator from '../../units/services/AttackRangeCalculator';
import HighlightService from '../../units/services/HighlightService';
import LogService from '../../units/services/LogService';
import ActionStrategy from './ActionStrategy';
import BaseStrategy from './BaseStrategy';

class ParalyzerStrategy extends BaseStrategy implements ActionStrategy {
  highlightTargets(attacker: Unit, allUnits: AllUnits) {
    const enemyTeam = this.getEnemyTeam(attacker, allUnits);

    const allowedIndices = AttackRangeCalculator.calculateMassAttack(enemyTeam);

    HighlightService.highlightOnlyValidTargets(enemyTeam, allowedIndices);
  }

  executeAction(attacker: Unit, _allUnits: AllUnits, target?: Unit): void {
    if (!target || !target.state.isPossibleTarget || !target.isAlive()) {
      LogService.log(`${attacker.name} has no valid target!`);
      return;
    }

    target.state.setParalyzed(true);
    LogService.log(`${attacker.name} paralyzes ${target.name}!`);
  }
}

export default ParalyzerStrategy;
