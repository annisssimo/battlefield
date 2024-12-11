import { ActionType } from '../types/types';
import Unit from './Unit';

class HealerUnitSingle extends Unit {
  healAmount: number = 40;

  getActionType(): ActionType {
    return 'healSingle';
  }
}

export default HealerUnitSingle;
