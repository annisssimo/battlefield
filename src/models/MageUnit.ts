import Unit from './Unit';

class MageUnit extends Unit {
  getActionType(): string {
    return 'mageAttack';
  }

  canAttack(target: Unit): boolean {
    console.log(target);
    return true;
  }
}

export default MageUnit;
