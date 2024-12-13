import HealerUnitSingle from '../models/HealerUnitSingle';
import Unit from '../models/Unit';
import HighlightService from '../services/HighlightService';
import LogService from '../services/LogService';
import { AllUnits } from '../types/types';
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
