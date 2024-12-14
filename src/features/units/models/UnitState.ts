class UnitState {
  isDefending: boolean = false;
  isParalyzed: boolean = false;
  isPossibleTarget: boolean = false;

  setDefending(state: boolean) {
    this.isDefending = state;
  }

  setParalyzed(state: boolean) {
    this.isParalyzed = state;
  }

  setPossibleTarget(state: boolean) {
    this.isPossibleTarget = state;
  }
}

export default UnitState;
