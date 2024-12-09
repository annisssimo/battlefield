import Unit from '../models/Unit';
import { AllUnits } from '../types/types';

class BaseStrategy {
  protected getEnemyTeam(attacker: Unit, allUnits: AllUnits): Unit[] {
    return attacker.team === 'red' ? allUnits.orange : allUnits.red;
  }
}

export default BaseStrategy;
