import HealerUnitMass from '../models/HealerUnitMass';
import Unit from '../models/Unit';
import HighlightService from '../services/HighlightService';
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
        unit.heal(attacker.healAmount);
      }
    });
  }
}

export default MassHealerStrategy;
