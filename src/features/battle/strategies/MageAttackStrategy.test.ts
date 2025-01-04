import MageAttackStrategy from './MageAttackStrategy';
import Unit from '../../units/models/Unit';
import HighlightService from '../../units/services/HighlightService';
import LogService from '../../units/services/LogService';
import { AllUnits } from '../../../shared/types/types';

jest.mock('../../units/services/HighlightService');
jest.mock('../../units/services/LogService');

describe('MageAttackStrategy', () => {
  let mageAttackStrategy: MageAttackStrategy;
  let attacker: Unit;
  let enemy1: Unit;
  let enemy2: Unit;
  let allUnits: AllUnits;

  beforeEach(() => {
    mageAttackStrategy = new MageAttackStrategy();

    attacker = {
      name: 'Mage',
      damage: 30,
      team: 'red',
      isAlive: jest.fn(() => true),
      takeDamage: jest.fn(),
    } as unknown as Unit;

    enemy1 = {
      name: 'Enemy 1',
      healthPoints: 100,
      team: 'orange',
      isAlive: jest.fn(() => true),
      takeDamage: jest.fn(),
    } as unknown as Unit;

    enemy2 = {
      name: 'Enemy 2',
      healthPoints: 50,
      team: 'orange',
      isAlive: jest.fn(() => true),
      takeDamage: jest.fn(),
    } as unknown as Unit;

    allUnits = {
      red: [attacker],
      orange: [enemy1, enemy2],
    };
  });

  describe('highlightTargets', () => {
    it('should highlight all units in the enemy team', () => {
      mageAttackStrategy.highlightTargets(attacker, allUnits);

      expect(HighlightService.highlightAllUnits).toHaveBeenCalledWith([
        enemy1,
        enemy2,
      ]);
    });
  });

  describe('executeAction', () => {
    it('should deal damage to all living enemies and log the action', () => {
      mageAttackStrategy.executeAction(attacker, allUnits);

      expect(enemy1.takeDamage).toHaveBeenCalledWith(attacker.damage);
      expect(enemy2.takeDamage).toHaveBeenCalledWith(attacker.damage);
      expect(LogService.log).toHaveBeenCalledWith(
        `${attacker.name} casts a spell on all enemies!`
      );
    });

    it('should not deal damage to dead enemies', () => {
      enemy2.isAlive = jest.fn().mockReturnValue(false);

      mageAttackStrategy.executeAction(attacker, allUnits);

      expect(enemy1.takeDamage).toHaveBeenCalledWith(attacker.damage);
      expect(enemy2.takeDamage).not.toHaveBeenCalled();
      expect(LogService.log).toHaveBeenCalledWith(
        `${attacker.name} casts a spell on all enemies!`
      );
    });
  });
});
