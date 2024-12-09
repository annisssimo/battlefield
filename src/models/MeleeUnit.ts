import Unit from './Unit';

class MeleeUnit extends Unit {
  getActionType(): string {
    return 'meleeAttack';
  }

  canAttack(target: Unit): boolean {
    console.log(target);
    return true;
  }
}

export default MeleeUnit;
