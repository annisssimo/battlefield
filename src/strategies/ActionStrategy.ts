import Unit from '../models/Unit';

interface ActionStrategy {
  highlightTargets(
    attacker: Unit,
    allUnits: { red: Unit[]; orange: Unit[] }
  ): void;

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
