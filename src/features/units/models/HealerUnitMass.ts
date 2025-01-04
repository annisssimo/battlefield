import { ActionType } from '../../../shared/types/types';
import Unit from './Unit';

class HealerUnitMass extends Unit {
  healAmount: number = 25;

  getActionType(): ActionType {
    return 'healMass';
  }
}

export default HealerUnitMass;
