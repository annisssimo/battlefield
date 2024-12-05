import Unit from './Unit';

class HealerUnitMass extends Unit {
  canAttack(target: Unit): boolean {
    console.log(target);
    return true;
  }
}

export default HealerUnitMass;
