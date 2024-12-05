import Unit from './Unit';

class MeleeUnit extends Unit {
  canAttack(target: Unit): boolean {
    console.log(target);
    return true;
  }
}

export default MeleeUnit;
