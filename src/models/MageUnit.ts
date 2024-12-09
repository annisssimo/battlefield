import { ActionType } from '../types/types';
import Unit from './Unit';

class MageUnit extends Unit {
  getActionType(): ActionType {
    return 'mageAttack';
  }

  canAttack(target: Unit): boolean {
    console.log(target);
    return true;
  }
}

export default MageUnit;
