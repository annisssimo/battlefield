import Unit from './Unit';

class ParalyzerUnit extends Unit {
  canAttack(target: Unit): boolean {
    console.log(target);
    return true;
  }
}

export default ParalyzerUnit;
