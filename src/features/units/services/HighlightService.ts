import Unit from '../models/Unit';

class HighlightService {
  static highlightAllUnits(units: Unit[]): void {
    units.forEach((unit) => unit.state.setPossibleTarget(true));
  }

  static clearHighlight(units: Unit[]): void {
    units.forEach((unit) => unit.state.setPossibleTarget(false));
  }

  static highlightOnlyValidTargets(
    units: Unit[],
    validIndices: Set<number>
  ): void {
    this.clearHighlight(units);
    validIndices.forEach((index) => {
      if (units[index]) {
        units[index].state.setPossibleTarget(true);
      }
    });
  }
}

export default HighlightService;
