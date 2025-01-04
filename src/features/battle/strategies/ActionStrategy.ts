import { AllUnits } from '../../../shared/types/types';
import Unit from '../../units/models/Unit';

interface ActionStrategy {
  highlightTargets(attacker: Unit, allUnits: AllUnits): void;

  executeAction(
    attacker: Unit,
    allUnits: AllUnits,
    target?: Unit | Unit[] | undefined
  ): void;
}

export default ActionStrategy;
