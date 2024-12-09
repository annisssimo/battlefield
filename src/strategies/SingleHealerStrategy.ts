import HealerUnitSingle from '../models/HealerUnitSingle';
import Unit from '../models/Unit';
import HighlightService from '../services/HighlightService';
import { AllUnits } from '../types/types';
import ActionStrategy from './ActionStrategy';
import BaseStrategy from './BaseStrategy';

class SingleHealerStrategy extends BaseStrategy implements ActionStrategy {
  highlightTargets(attacker: Unit, allUnits: AllUnits) {
    HighlightService.highlightAllUnits(allUnits[attacker.team]);
  }

  executeAction(
    attacker: HealerUnitSingle,
    allUnits: AllUnits,
    target?: Unit
  ): void {
    if (target && target.isAlive()) {
      target.heal(attacker.healAmount);
    }
  }
}

export default SingleHealerStrategy;
