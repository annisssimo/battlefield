import { ActionType } from '../../../shared/types/types';
import Unit from './Unit';

class MeleeUnit extends Unit {
  getActionType(): ActionType {
    return 'meleeAttack';
  }
}

export default MeleeUnit;
