import HighlightService from './HighlightService';
import Unit from '../models/Unit';

describe('HighlightService', () => {
  let unit1: Unit;
  let unit2: Unit;
  let unit3: Unit;
  let units: Unit[];

  beforeEach(() => {
    unit1 = {
      name: 'Unit 1',
      state: { setPossibleTarget: jest.fn() },
    } as unknown as Unit;
    unit2 = {
      name: 'Unit 2',
      state: { setPossibleTarget: jest.fn() },
    } as unknown as Unit;
    unit3 = {
      name: 'Unit 3',
      state: { setPossibleTarget: jest.fn() },
    } as unknown as Unit;

    units = [unit1, unit2, unit3];
  });

  describe('highlightAllUnits', () => {
    it('should set all units as possible targets', () => {
      HighlightService.highlightAllUnits(units);

      units.forEach((unit) => {
        expect(unit.state.setPossibleTarget).toHaveBeenCalledWith(true);
      });
    });
  });

  describe('clearHighlight', () => {
    it('should clear possible targets for all units', () => {
      HighlightService.clearHighlight(units);

      units.forEach((unit) => {
        expect(unit.state.setPossibleTarget).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('highlightOnlyValidTargets', () => {
    it('should highlight only valid targets based on validIndices', () => {
      const validIndices = new Set([0, 2]);

      HighlightService.highlightOnlyValidTargets(units, validIndices);

      expect(unit1.state.setPossibleTarget).toHaveBeenCalledWith(true); // Unit 1 is valid
      expect(unit2.state.setPossibleTarget).toHaveBeenCalledWith(false); // Unit 2 is not valid
      expect(unit3.state.setPossibleTarget).toHaveBeenCalledWith(true); // Unit 3 is valid
    });

    it('should not highlight units that are not in validIndices', () => {
      const validIndices = new Set([1]); // Only Unit 2 is valid

      HighlightService.highlightOnlyValidTargets(units, validIndices);

      expect(unit1.state.setPossibleTarget).toHaveBeenCalledWith(false); // Unit 1 is not valid
      expect(unit2.state.setPossibleTarget).toHaveBeenCalledWith(true); // Unit 2 is valid
      expect(unit3.state.setPossibleTarget).toHaveBeenCalledWith(false); // Unit 3 is not valid
    });
  });
});
