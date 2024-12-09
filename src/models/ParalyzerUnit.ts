import { ActionType } from '../types/types';
import Unit from './Unit';

class ParalyzerUnit extends Unit {
  getActionType(): ActionType {
    return 'paralyze';
  }

  canAttack(target: Unit): boolean {
    console.log(target);
    return true;
  }
}

export default ParalyzerUnit;
