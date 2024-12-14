import { AllUnits } from '../../../shared/types/types';
import Unit from '../../units/models/Unit';

class BaseStrategy {
  protected getEnemyTeam(attacker: Unit, allUnits: AllUnits): Unit[] {
    return attacker.team === 'red' ? allUnits.orange : allUnits.red;
  }
}

export default BaseStrategy;
