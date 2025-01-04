import { AllUnits } from '../../../shared/types/types';
import HealerUnitMass from '../../units/models/HealerUnitMass';
import Unit from '../../units/models/Unit';
import HighlightService from '../../units/services/HighlightService';
import LogService from '../../units/services/LogService';
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
