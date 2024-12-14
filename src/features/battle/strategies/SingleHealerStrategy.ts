import { AllUnits } from '../../../shared/types/types';
import HealerUnitSingle from '../../units/models/HealerUnitSingle';
import Unit from '../../units/models/Unit';
import HighlightService from '../../units/services/HighlightService';
import LogService from '../../units/services/LogService';
import ActionStrategy from './ActionStrategy';
import BaseStrategy from './BaseStrategy';

class SingleHealerStrategy extends BaseStrategy implements ActionStrategy {
  highlightTargets(attacker: Unit, allUnits: AllUnits) {
    HighlightService.highlightAllUnits(allUnits[attacker.team]);
  }

  executeAction(
    attacker: HealerUnitSingle,
    _allUnits: AllUnits,
    target?: Unit
  ): void {
    if (target && target.isAlive()) {
      target.takeHealing(attacker.healAmount);
      LogService.log(`${attacker.name} heals ${target.name}`);
    }
  }
}

export default SingleHealerStrategy;
