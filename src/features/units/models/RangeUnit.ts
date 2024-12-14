import { ActionType } from '../../../shared/types/types';
import Unit from './Unit';

class RangeUnit extends Unit {
  getActionType(): ActionType {
    return 'rangeAttack';
  }
}

export default RangeUnit;
