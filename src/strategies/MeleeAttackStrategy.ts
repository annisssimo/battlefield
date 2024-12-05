import Unit from '../models/Unit';
import ActionStrategy from './ActionStrategy';

class MeleeAttackStrategy implements ActionStrategy {
  executeAction(attacker: Unit, target?: Unit): void {
    if (!target) {
      console.log(`${attacker.name} has no target to attack!`);
      return;
    }

    console.log(`${attacker.name} attacks ${target.name}!`);
    target.takeDamage(attacker.damage);
  }
}

export default MeleeAttackStrategy;
