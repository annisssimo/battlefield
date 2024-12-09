import Unit from './Unit';

class HealerUnitMass extends Unit {
  getActionType(): string {
    return 'heal';
  }

  canAttack(target: Unit): boolean {
    console.log(target);
    return true;
  }
}

export default HealerUnitMass;
