import ATTACK_RANGES from '../constants/attackRanges';
import Unit from '../models/Unit';
import { AllUnits } from '../types/types';
import AttackRangeCalculator from './AttackRangeCalculator';

// helper function to create mock units
function createUnit({
  id,
  name,
  healthPoints,
  team,
  teamIndex,
  isAlive = jest.fn(() => true),
}: Partial<Unit>): Unit {
  return {
    id: id || 'default-id',
    name: name || 'Default',
    healthPoints: healthPoints || 100,
    damage: 10,
    initiative: 10,
    team: team || 'red',
    teamIndex: teamIndex || 0,
    state: {
      isDefending: false,
      isParalyzed: false,
      isPossibleTarget: false,
      setDefending: jest.fn(),
      setParalyzed: jest.fn(),
      setPossibleTarget: jest.fn(),
    },
    image: '',
    isAlive,
    takeDamage: jest.fn(),
    takeHealing: jest.fn(),
    getActionType: jest.fn(),
  };
}

// fixtures
const allUnitsFixture: AllUnits = {
  red: [
    createUnit({ id: '1', name: 'Sirena', healthPoints: 80, teamIndex: 0 }),
    createUnit({ id: '2', name: 'Archimage', healthPoints: 90, teamIndex: 2 }),
    createUnit({ id: '3', name: 'Archimage', healthPoints: 90, teamIndex: 3 }),
  ],
  orange: [
    createUnit({
      id: '4',
      name: 'Skeleton',
      healthPoints: 100,
      team: 'orange',
      teamIndex: 1,
    }),
  ],
};

// utility for checking ranges
function checkUnitsInRange(actual: Set<number>, expected: number[]) {
  expect(actual).toEqual(new Set(expected));
}

describe('findAttackRanges', () => {
  it('should return correct attack ranges for a valid key', () => {
    const key: [number, string] = [2, 'red'];
    AttackRangeCalculator.attackRanges = ATTACK_RANGES;

    const result = AttackRangeCalculator.findAttackRanges(key);
    expect(result).toEqual([
      [1, 'red'],
      [4, 'red'],
      [5, 'red'],
    ]);
  });

  it('should throw an error for a missing key', () => {
    const key: [number, string] = [2, 'red'];
    AttackRangeCalculator.attackRanges = new Map();

    expect(() => AttackRangeCalculator.findAttackRanges(key)).toThrow(
      'No corresponding value'
    );
  });
});

describe('calculateMeleeRange', () => {
  let allUnits: AllUnits;
  let mockFindAttackRanges: jest.SpyInstance;

  beforeEach(() => {
    allUnits = { ...allUnitsFixture };
    mockFindAttackRanges = jest
      .spyOn(AttackRangeCalculator, 'findAttackRanges')
      .mockReturnValue([
        [3, 'red'],
        [4, 'red'],
        [5, 'red'],
      ]);
  });

  afterEach(() => {
    mockFindAttackRanges.mockRestore();
  });

  it('should return the correct indices for melee range', () => {
    const attacker = allUnits.orange[0];
    const currentUnit = allUnits.red[2];

    const result = AttackRangeCalculator.calculateMeleeRange(
      allUnits,
      attacker,
      currentUnit
    );

    checkUnitsInRange(result, []);
  });

  it('should not target units from the same team that are alive', () => {
    const redUnit = createUnit({
      id: '2f49812a-af65-4026-b2c7-b1480c698d51',
      name: 'Bishop',
      healthPoints: 130,
      team: 'red',
      teamIndex: 1,
    });

    mockFindAttackRanges.mockReturnValue([[1, 'red']]);

    const attacker = allUnits.orange[0];
    const currentUnit = allUnits.red[2];

    const result = AttackRangeCalculator.calculateMeleeRange(
      allUnits,
      attacker,
      currentUnit
    );

    expect(result.has(redUnit.teamIndex)).toBe(false);
  });
});

describe('calculateMassAttack', () => {
  it('returns all alive enemy team', () => {
    const enemyTeam: Unit[] = [
      createUnit({ id: '1', name: 'Sirena', healthPoints: 80 }),
      createUnit({
        id: '2',
        name: 'Archimage',
        healthPoints: 90,
        isAlive: jest.fn(() => false),
      }),
      createUnit({ id: '3', name: 'Archimage', healthPoints: 90 }),
    ];

    const expectedAliveIndices = new Set([0, 2]);

    const result = AttackRangeCalculator.calculateMassAttack(enemyTeam);

    expect(result).toEqual(expectedAliveIndices);
  });
});
