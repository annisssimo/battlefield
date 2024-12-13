import HealerUnitMass from '../models/HealerUnitMass';
import Unit from '../models/Unit';
import HighlightService from '../services/HighlightService';
import LogService from '../services/LogService';
import { AllUnits } from '../types/types';
import ActionStrategy from './ActionStrategy';
import BaseStrategy from './BaseStrategy';

class MassHealerStrategy extends BaseStrategy implements ActionStrategy {
  highlightTargets(attacker: Unit, allUnits: AllUnits) {
    HighlightService.highlightAllUnits(allUnits[attacker.team]);
  }

  executeAction(attacker: HealerUnitMass, allUnits: AllUnits): void {
    const myTeam = allUnits[attacker.team];

    myTeam.forEach((unit) => {
      if (unit.isAlive()) {
        unit.takeHealing(attacker.healAmount);
      }
    });

    LogService.log(`${attacker.name} heals all his team`);
  }
}

export default MassHealerStrategy;
