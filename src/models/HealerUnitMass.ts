import { ActionType } from '../types/types';
import Unit from './Unit';

class HealerUnitMass extends Unit {
  healAmount: number = 25;

  getActionType(): ActionType {
    return 'healMass';
  }

  canAttack(target: Unit): boolean {
    console.log(target);
    return true;
  }
}

export default HealerUnitMass;
