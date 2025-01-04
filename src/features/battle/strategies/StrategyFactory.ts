import ActionStrategy from './ActionStrategy';
import MeleeAttackStrategy from './MeleeAttackStrategy';
import RangeAttackStrategy from './RangeAttackStrategy';
import MageAttackStrategy from './MageAttackStrategy';
import SingleHealerStrategy from './SingleHealerStrategy';
import MassHealerStrategy from './MassHealerStrategy';
import ParalyzerStrategy from './ParalyzerStrategy';

class StrategyFactory {
  static createStrategy(action: string): ActionStrategy {
    switch (action) {
      case 'meleeAttack':
        return new MeleeAttackStrategy();
      case 'rangeAttack':
        return new RangeAttackStrategy();
      case 'mageAttack':
        return new MageAttackStrategy();
      case 'healSingle':
        return new SingleHealerStrategy();
      case 'healMass':
        return new MassHealerStrategy();
      case 'paralyze':
        return new ParalyzerStrategy();
      default:
        throw new Error(`Unknown action strategy: ${action}`);
    }
  }
}

export default StrategyFactory;
