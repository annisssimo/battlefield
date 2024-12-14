import RangeAttackStrategy from './RangeAttackStrategy';
import Unit from '../../units/models/Unit';
import AttackRangeCalculator from '../../units/services/AttackRangeCalculator';
import HighlightService from '../../units/services/HighlightService';
import LogService from '../../units/services/LogService';
import { AllUnits } from '../../../shared/types/types';

jest.mock('../../units/services/AttackRangeCalculator');
jest.mock('../../units/services/HighlightService');
jest.mock('../../units/services/LogService');

describe('RangeAttackStrategy', () => {
  let rangeAttackStrategy: RangeAttackStrategy;
  let attacker: Unit;
  let target: Unit;
  let allUnits: AllUnits;

  beforeEach(() => {
    rangeAttackStrategy = new RangeAttackStrategy();

    attacker = {
      name: 'Elf Archer',
      damage: 10,
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
      takeDamage: jest.fn(),
      isAlive: jest.fn().mockReturnValue(true),
      state: { isPossibleTarget: true },
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

      rangeAttackStrategy.highlightTargets(attacker, allUnits);

      expect(AttackRangeCalculator.calculateMassAttack).toHaveBeenCalledWith([
        expect.objectContaining({
          name: 'Enemy',
          position: 6,
          team: 'orange',
          healthPoints: 50,
        }),
      ]);

      expect(HighlightService.highlightOnlyValidTargets).toHaveBeenCalledWith(
        [
          expect.objectContaining({
            name: 'Enemy',
            position: 6,
            team: 'orange',
            healthPoints: 50,
          }),
        ],
        new Set([6])
      );
      expect(LogService.info).not.toHaveBeenCalled();
    });
  });

  describe('executeAction', () => {
    it('should apply damage to the target and log the action', () => {
      target.healthPoints = 50;

      rangeAttackStrategy.executeAction(attacker, allUnits, target);

      expect(target.takeDamage).toHaveBeenCalledWith(attacker.damage);

      expect(LogService.log).toHaveBeenCalledWith(
        `${attacker.name} attacks ${target.name}! Remaining HP: ${target.healthPoints}`
      );
    });
  });
});
