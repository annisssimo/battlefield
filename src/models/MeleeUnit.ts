import { ActionType } from '../types/types';
import Unit from './Unit';

class MeleeUnit extends Unit {
  getActionType(): ActionType {
    return 'meleeAttack';
  }

  canAttack(target: Unit): boolean {
    console.log(target);
    return true;
  }
}

export default MeleeUnit;
