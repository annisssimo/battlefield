import SingleHealerStrategy from './SingleHealerStrategy';
import HealerUnitSingle from '../../units/models/HealerUnitSingle';
import Unit from '../../units/models/Unit';
import HighlightService from '../../units/services/HighlightService';
import LogService from '../../units/services/LogService';
import { AllUnits } from '../../../shared/types/types';

jest.mock('../../units/services/HighlightService');
jest.mock('../../units/services/LogService');

describe('SingleHealerStrategy', () => {
  let singleHealerStrategy: SingleHealerStrategy;
  let healer: HealerUnitSingle;
  let target: Unit;
  let allUnits: AllUnits;

  beforeEach(() => {
    singleHealerStrategy = new SingleHealerStrategy();

    healer = {
      name: 'Priest',
      healAmount: 20,
      healthPoints: 100,
      position: 5,
      team: 'red',
      takeHealing: jest.fn(),
    } as unknown as HealerUnitSingle;

    target = {
      name: 'Warrior',
      healthPoints: 50,
      position: 6,
      team: 'red',
      isAlive: jest.fn().mockReturnValue(true),
      takeHealing: jest.fn(),
    } as unknown as Unit;

    allUnits = {
      red: [healer, target],
      orange: [],
    };
  });

  describe('highlightTargets', () => {
    it('should highlight all units in the same team as the attacker', () => {
      singleHealerStrategy.highlightTargets(healer, allUnits);

      expect(HighlightService.highlightAllUnits).toHaveBeenCalledWith([
        healer,
        target,
      ]);
    });
  });

  describe('executeAction', () => {
    it('should heal the target and log the action', () => {
      target.healthPoints = 50;

      singleHealerStrategy.executeAction(healer, allUnits, target);

      expect(target.takeHealing).toHaveBeenCalledWith(healer.healAmount);

      expect(LogService.log).toHaveBeenCalledWith(
        `${healer.name} heals ${target.name}`
      );
    });

    it('should not heal if the target is not alive', () => {
      target.isAlive = jest.fn().mockReturnValue(false);

      singleHealerStrategy.executeAction(healer, allUnits, target);

      expect(target.takeHealing).not.toHaveBeenCalled();
      expect(LogService.log).not.toHaveBeenCalled();
    });
  });
});
