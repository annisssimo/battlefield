import Unit from './Unit';

class RangeUnit extends Unit {
  getActionType(): string {
    return 'rangeAttack';
  }

  canAttack(target: Unit): boolean {
    console.log(target);
    return true;
  }
}

export default RangeUnit;
