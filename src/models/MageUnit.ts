import Unit from './Unit';

class MageUnit extends Unit {
  canAttack(target: Unit): boolean {
    console.log(target);
    return true;
  }
}

export default MageUnit;
