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

  public attack(
    attacker: Unit,
    target: Unit | undefined,
    allUnits: { red: Unit[]; orange: Unit[] }
  ): void {
    console.log(`Executing action for ${attacker.name}`);
    this.actionStrategy.executeAction(attacker, target, allUnits);
  }
}

export default StrategyContext;
