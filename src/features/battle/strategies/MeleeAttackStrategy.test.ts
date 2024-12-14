import MeleeAttackStrategy from './MeleeAttackStrategy';
import Unit from '../../units/models/Unit';
import AttackRangeCalculator from '../../units/services/AttackRangeCalculator';
import HighlightService from '../../units/services/HighlightService';
import LogService from '../../units/services/LogService';
import { AllUnits } from '../../../shared/types/types';

jest.mock('../../units/services/AttackRangeCalculator');
jest.mock('../../units/services/HighlightService');
jest.mock('../../units/services/LogService');

describe('MeleeAttackStrategy', () => {
  let meleeAttackStrategy: MeleeAttackStrategy;
  let attacker: Unit;
  let target: Unit;
  let allUnits: AllUnits;

  beforeEach(() => {
    meleeAttackStrategy = new MeleeAttackStrategy();

    attacker = {
      name: 'Skeleton',
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
    } as unknown as Unit;

    allUnits = {
      red: [attacker],
      orange: [target],
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('highlightTargets', () => {
    it('should highlight valid targets if allowed indices are not empty', () => {
      (AttackRangeCalculator.calculateMeleeRange as jest.Mock).mockReturnValue(
        new Set([6])
      );

      meleeAttackStrategy.highlightTargets(attacker, allUnits);

      expect(AttackRangeCalculator.calculateMeleeRange).toHaveBeenCalledWith(
        allUnits,
        attacker,
        attacker
      );

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

    it('should log a message when no valid targets are available', () => {
      (AttackRangeCalculator.calculateMeleeRange as jest.Mock).mockReturnValue(
        new Set()
      );

      meleeAttackStrategy.highlightTargets(attacker, allUnits);

      expect(HighlightService.highlightOnlyValidTargets).not.toHaveBeenCalled();
      expect(LogService.info).toHaveBeenCalledWith(
        `${attacker.name} don't have valid targets to attack. But can defend himself! Click the shield icon`
      );
    });
  });

  describe('executeAction', () => {
    it('should apply damage to the target and log the action', () => {
      target.healthPoints = 50;

      meleeAttackStrategy.executeAction(attacker, allUnits, target);

      expect(target.takeDamage).toHaveBeenCalledWith(attacker.damage);

      expect(LogService.log).toHaveBeenCalledWith(
        `${attacker.name} attacks ${target.name}! Remaining HP: ${target.healthPoints}`
      );
    });
  });
});
