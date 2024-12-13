import Unit from '../models/Unit';
import HighlightService from '../services/HighlightService';
import LogService from '../services/LogService';
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

    enemyTeam.forEach((unit) => {
      if (unit.isAlive()) {
        unit.takeDamage(attacker.damage);
      }
    });

    LogService.log(`${attacker.name} casts a spell on all enemies!`);
  }
}

export default MageAttackStrategy;
