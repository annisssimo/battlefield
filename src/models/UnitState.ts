class UnitState {
  isDefending: boolean = false;
  isParalyzed: boolean = false;

  setDefending(state: boolean) {
    this.isDefending = state;
  }

  setParalyzed(state: boolean) {
    this.isParalyzed = state;
  }
}

export default UnitState;
