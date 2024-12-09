import Unit from '../models/Unit';
import ActionStrategy from './ActionStrategy';

class RangeAttackStrategy implements ActionStrategy {
  highlightTargets(attacker: Unit, allUnits: { red: Unit[]; orange: Unit[] }) {
    const enemyTeam = attacker.team === 'red' ? allUnits.orange : allUnits.red;
    enemyTeam.forEach((unit) =>
      unit.state.setPossibleTarget(unit.healthPoints > 0)
    );
  }
  
  executeAction(attacker: Unit, target?: Unit): void {
    if (!target) {
      console.log(`${attacker.name} has no target!`);
      return;
    }
    console.log(`${attacker.name} attacks ${target.name}!`);
    target.takeDamage(attacker.damage);
  }
}

export default RangeAttackStrategy;
