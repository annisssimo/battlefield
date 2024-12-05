import Unit from '../models/Unit';

interface ActionStrategy {
  executeAction(attacker: Unit, target?: Unit): void;
}

export default ActionStrategy;
