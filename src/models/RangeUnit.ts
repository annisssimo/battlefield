import Unit from './Unit';

class RangeUnit extends Unit {
  canAttack(target: Unit): boolean {
    console.log(target);
    return true;
  }
}

export default RangeUnit;
