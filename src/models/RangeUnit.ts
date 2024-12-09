import { ActionType } from '../types/types';
import Unit from './Unit';

class RangeUnit extends Unit {
  getActionType(): ActionType {
    return 'rangeAttack';
  }

  canAttack(target: Unit): boolean {
    console.log(target);
    return true;
  }
}

export default RangeUnit;
