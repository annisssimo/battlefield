import Unit from '../models/Unit';
import ActionStrategy from './ActionStrategy';

class StrategyContext {
  private actionStrategy: ActionStrategy;

  constructor(actionStrategy: ActionStrategy) {
    this.actionStrategy = actionStrategy;
  }

  public setActionStrategy(actionStrategy: ActionStrategy) {
    this.actionStrategy = actionStrategy;
  }

  public attack(attacker: Unit, target?: Unit): void {
    console.log(
      "StrategyContext: Executing action using the ActionStrategy (not sure how it'll do it)"
    );
    this.actionStrategy.executeAction(attacker, target);
  }
}

export default StrategyContext;
