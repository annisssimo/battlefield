import Unit from './Unit';

class HealerUnitSingle extends Unit {
  canAttack(target: Unit): boolean {
    console.log(target);
    return true;
  }
}

export default HealerUnitSingle;
