import Unit from './Unit';

class ParalyzerUnit extends Unit {
  getActionType(): string {
    return 'paralyze';
  }

  canAttack(target: Unit): boolean {
    console.log(target);
    return true;
  }
}

export default ParalyzerUnit;
