import MassHealerStrategy from './MassHealerStrategy';
import HealerUnitMass from '../../units/models/HealerUnitMass';
import Unit from '../../units/models/Unit';
import HighlightService from '../../units/services/HighlightService';
import LogService from '../../units/services/LogService';
import { AllUnits } from '../../../shared/types/types';

jest.mock('../../units/services/HighlightService');
jest.mock('../../units/services/LogService');

describe('MassHealerStrategy', () => {
  let massHealerStrategy: MassHealerStrategy;
  let attacker: HealerUnitMass;
  let ally1: Unit;
  let ally2: Unit;
  let allUnits: AllUnits;

  beforeEach(() => {
    massHealerStrategy = new MassHealerStrategy();

    attacker = {
      name: 'Healer',
      healAmount: 20,
      healthPoints: 50,
      team: 'red',
      takeDamage: jest.fn(),
      isAlive: jest.fn(() => true),
      takeHealing: jest.fn(() => 70),
    } as unknown as HealerUnitMass;

    ally1 = {
      name: 'Ally 1',
      healthPoints: 50,
      team: 'red',
      isAlive: jest.fn(() => true),
      takeHealing: jest.fn(() => 70),
    } as unknown as Unit;

    ally2 = {
      name: 'Ally 2',
      healthPoints: 30,
      team: 'red',
      isAlive: jest.fn(() => true),
      takeHealing: jest.fn(() => 50),
    } as unknown as Unit;

    allUnits = {
      red: [attacker, ally1, ally2],
      orange: [],
    };
  });

  describe('highlightTargets', () => {
    it('should highlight all units in the same team as the attacker', () => {
      massHealerStrategy.highlightTargets(attacker, allUnits);

      expect(HighlightService.highlightAllUnits).toHaveBeenCalledWith([
        attacker,
        ally1,
        ally2,
      ]);
    });
  });

  describe('executeAction', () => {
    it('should heal all living units in the team and log the action', () => {
      massHealerStrategy.executeAction(attacker, allUnits);

      expect(ally1.takeHealing).toHaveBeenCalledWith(attacker.healAmount);
      expect(ally2.takeHealing).toHaveBeenCalledWith(attacker.healAmount);

      expect(LogService.log).toHaveBeenCalledWith(
        `${attacker.name} heals all his team`
      );
    });

    it('should not heal dead units', () => {
      ally2.isAlive = jest.fn().mockReturnValue(false);

      massHealerStrategy.executeAction(attacker, allUnits);

      expect(ally1.takeHealing).toHaveBeenCalledWith(attacker.healAmount);
      expect(ally2.takeHealing).not.toHaveBeenCalled();

      expect(LogService.log).toHaveBeenCalledWith(
        `${attacker.name} heals all his team`
      );
    });
  });
});
