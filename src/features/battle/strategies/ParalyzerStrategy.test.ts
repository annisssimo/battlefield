import ParalyzerStrategy from './ParalyzerStrategy';
import Unit from '../../units/models/Unit';
import AttackRangeCalculator from '../../units/services/AttackRangeCalculator';
import HighlightService from '../../units/services/HighlightService';
import LogService from '../../units/services/LogService';
import { AllUnits } from '../../../shared/types/types';

jest.mock('../../units/services/AttackRangeCalculator');
jest.mock('../../units/services/HighlightService');
jest.mock('../../units/services/LogService');

describe('ParalyzerStrategy', () => {
  let paralyzerStrategy: ParalyzerStrategy;
  let attacker: Unit;
  let target: Unit;
  let allUnits: AllUnits;

  beforeEach(() => {
    paralyzerStrategy = new ParalyzerStrategy();

    attacker = {
      name: 'Paralyzer',
      damage: 0,
      healthPoints: 100,
      position: 5,
      team: 'red',
      takeDamage: jest.fn(),
    } as unknown as Unit;

    target = {
      name: 'Enemy',
      healthPoints: 50,
      position: 6,
      team: 'orange',
      state: {
        isPossibleTarget: true,
        setParalyzed: jest.fn(),
      },
      isAlive: jest.fn().mockReturnValue(true),
    } as unknown as Unit;

    allUnits = {
      red: [attacker],
      orange: [target],
    };
  });

  describe('highlightTargets', () => {
    it('should highlight valid targets if allowed indices are not empty', () => {
      (AttackRangeCalculator.calculateMassAttack as jest.Mock).mockReturnValue(
        new Set([6])
      );

      paralyzerStrategy.highlightTargets(attacker, allUnits);

      expect(AttackRangeCalculator.calculateMassAttack).toHaveBeenCalledWith([
        expect.objectContaining({
          name: 'Enemy',
          position: 6,
          team: 'orange',
          healthPoints: 50,
        }),
      ]);

      expect(HighlightService.highlightOnlyValidTargets).toHaveBeenCalledWith(
        [target],
        new Set([6])
      );
      expect(LogService.info).not.toHaveBeenCalled();
    });
  });

  describe('executeAction', () => {
    it('should paralyze the target and log the action', () => {
      paralyzerStrategy.executeAction(attacker, allUnits, target);

      expect(target.state.setParalyzed).toHaveBeenCalledWith(true);

      expect(LogService.log).toHaveBeenCalledWith(
        `${attacker.name} paralyzes ${target.name}!`
      );
    });

    it('should not paralyze the target if it is not a valid target', () => {
      target.state.isPossibleTarget = false;

      paralyzerStrategy.executeAction(attacker, allUnits, target);

      expect(target.state.setParalyzed).not.toHaveBeenCalled();

      expect(LogService.log).toHaveBeenCalledWith(
        `${attacker.name} has no valid target!`
      );
    });

    it('should not paralyze the target if it is not alive', () => {
      target.isAlive = jest.fn().mockReturnValue(false);

      paralyzerStrategy.executeAction(attacker, allUnits, target);

      expect(target.state.setParalyzed).not.toHaveBeenCalled();

      expect(LogService.log).toHaveBeenCalledWith(
        `${attacker.name} has no valid target!`
      );
    });

    it('should not paralyze the target if no target is provided', () => {
      paralyzerStrategy.executeAction(attacker, allUnits);

      expect(target.state.setParalyzed).not.toHaveBeenCalled();

      expect(LogService.log).toHaveBeenCalledWith(
        `${attacker.name} has no valid target!`
      );
    });
  });
});
