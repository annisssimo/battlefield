import { AllUnits } from '../../../shared/types/types';
import Unit from '../../units/models/Unit';
import ActionStrategy from './ActionStrategy';

class StrategyContext {
  private actionStrategy: ActionStrategy;

  constructor(actionStrategy: ActionStrategy) {
    this.actionStrategy = actionStrategy;
  }

  public setActionStrategy(actionStrategy: ActionStrategy) {
    this.actionStrategy = actionStrategy;
  }

  public attack(attacker: Unit, allUnits: AllUnits, target?: Unit): void {
    this.actionStrategy.executeAction(attacker, allUnits, target);
  }
}

export default StrategyContext;
