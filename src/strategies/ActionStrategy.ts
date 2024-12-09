import Unit from '../models/Unit';
import { AllUnits } from '../types/types';

interface ActionStrategy {
  highlightTargets(attacker: Unit, allUnits: AllUnits): void;

  executeAction(
    attacker: Unit,
    allUnits: {
      red: Unit[];
      orange: Unit[];
    },
    target?: Unit | Unit[] | undefined
  ): void;
}

export default ActionStrategy;
