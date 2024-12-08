import ActionStrategy from './ActionStrategy';
import MeleeAttackStrategy from './MeleeAttackStrategy';

class StrategyFactory {
  static createStrategy(action: string): ActionStrategy {
    switch (action) {
      case 'meleeAttack':
        return new MeleeAttackStrategy();
      // TODO: case 'rangeAttack': return new RangeAttackStrategy();
      default:
        throw new Error(`Unknown action strategy: ${action}`);
    }
  }
}

export default StrategyFactory;
