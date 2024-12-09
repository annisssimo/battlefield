import Unit from '../models/Unit';
import { AllUnits } from '../types/types';
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
    console.log(`Executing action for ${attacker.name}`);
    this.actionStrategy.executeAction(attacker, allUnits, target);
  }
}

export default StrategyContext;
