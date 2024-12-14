import Unit from '../units/models/Unit';
import LogService from '../units/services/LogService';

export class GameStateManager {
  static findNextAliveUnit(units: Unit[], currentIndex: number): Unit {
    let nextUnitIndex = currentIndex;
    do {
      nextUnitIndex = (nextUnitIndex + 1) % units.length;
    } while (!units[nextUnitIndex].isAlive() && nextUnitIndex !== currentIndex);

    return units[nextUnitIndex];
  }

  static skipParalyzedUnit(unit: Unit): boolean {
    if (unit.state.isParalyzed) {
      LogService.info(`${unit.name} skips his turn because he is paralyzed.`);
      unit.state.setParalyzed(false);
      return true;
    }
    return false;
  }
}
