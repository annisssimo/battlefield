import { ActionType } from '../types/types';
import Unit from './Unit';

class MageUnit extends Unit {
  getActionType(): ActionType {
    return 'mageAttack';
  }
}

export default MageUnit;
