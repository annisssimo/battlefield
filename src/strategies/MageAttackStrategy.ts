import Unit from '../models/Unit';
import HighlightService from '../services/HighlightService';
import { AllUnits } from '../types/types';
import ActionStrategy from './ActionStrategy';
import BaseStrategy from './BaseStrategy';

class MageAttackStrategy extends BaseStrategy implements ActionStrategy {
  highlightTargets(attacker: Unit, allUnits: AllUnits) {
    const enemyTeam = this.getEnemyTeam(attacker, allUnits);
    HighlightService.highlightAllUnits(enemyTeam);
  }

  executeAction(attacker: Unit, allUnits: AllUnits): void {
    const enemyTeam = attacker.team === 'red' ? allUnits.orange : allUnits.red;

    console.log(`${attacker.name} casts a spell on all enemies!`);

    enemyTeam.forEach((unit) => {
      if (unit.isAlive()) {
        unit.takeDamage(attacker.damage);
        console.log(
          `${attacker.name} deals ${attacker.damage} damage to ${unit.name}. Remaining HP: ${unit.healthPoints}`
        );
      }
    });
  }
}

export default MageAttackStrategy;
