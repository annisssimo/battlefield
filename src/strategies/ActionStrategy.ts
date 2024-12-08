import Unit from '../models/Unit';

interface ActionStrategy {
  executeAction(
    attacker: Unit,
    target: Unit | Unit[] | undefined,
    allUnits: {
      red: Unit[];
      orange: Unit[];
    }
  ): void;
}

export default ActionStrategy;
