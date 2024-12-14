import ATTACK_RANGES from '../constants/attackRanges';
import Unit from '../models/Unit';
import { AllUnits } from '../types/types';

// class for calculating attack ranges and possible targets
class AttackRangeCalculator {
  // constant containing predefined attack ranges located in a circle from the current unit (neighbors)
  static attackRanges = ATTACK_RANGES;

  // set to track already visited units during melee range calculation to avoid infinite loop in recursion
  static visitedUnits = new Set<Unit>();

  /**
   * finds the value in Map corresponding to the given key (cuz arrays are compared by links)
   * @param keyToFind - an array containing the team index and team color to search for
   * @returns an array of attack ranges corresponding to the given key
   * @throws an error if no matching key is found
   */
  static findAttackRanges(keyToFind: [number, string]): [number, string][] {
    for (const [key, value] of AttackRangeCalculator.attackRanges) {
      if (key[0] === keyToFind[0] && key[1] === keyToFind[1]) {
        return value;
      }
    }
    throw new Error('No corresponding value');
  }

  /**
   * calculates the melee attack range for attacker
   * @param allUnits - object containing all units, grouped by their team colors
   * @param attacker - the unit initiating the attack
   * @param currentUnit - the current unit being evaluated for attack range (could be attacker or any dead unit around him, then dead unit around this dead unit and so on)
   * @returns a set of allowed indices representing valid attack targets
   */
  static calculateMeleeRange(
    allUnits: AllUnits,
    attacker: Unit,
    currentUnit: Unit
  ): Set<number> {
    // the result Set of valid attack target's indices
    let allowedIndices = new Set<number>();

    // mark current unit as visited
    this.visitedUnits.add(currentUnit);

    // get possible attack targets (all units around current unit)
    const attackIndicesForAttacker = AttackRangeCalculator.findAttackRanges([
      currentUnit.teamIndex,
      currentUnit.team,
    ]);

    // loop the units around current unit
    attackIndicesForAttacker.forEach(([targetIndex, targetTeam]) => {
      // retrieve all units of the enemy (target) team
      const targetTeamUnits = allUnits[targetTeam as keyof AllUnits];

      // exclude units that are already visited
      const possibleTargetUnits = targetTeamUnits.filter(
        (unit) => !this.visitedUnits.has(unit)
      );

      // find target unit
      const targetUnit = possibleTargetUnits.find((unit) => {
        return unit.teamIndex === targetIndex && unit.team === targetTeam;
      });

      if (!targetUnit) return;

      // skip allied units that are alive
      if (targetUnit.team === attacker.team && targetUnit.isAlive()) {
        return;
      }

      // add index if the target is an enemy and is alive
      if (targetUnit.team !== attacker.team && targetUnit.isAlive()) {
        allowedIndices.add(targetIndex);
        return;
      }

      // if the target unit is not alive, recursively calculate attack range for its neighbors
      if (!targetUnit.isAlive()) {
        const targetAllowedIndices = AttackRangeCalculator.calculateMeleeRange(
          allUnits,
          attacker,
          targetUnit
        );
        allowedIndices = new Set([...allowedIndices, ...targetAllowedIndices]);
      }
    });

    return allowedIndices;
  }

  /**
   * calculates the indices of all alive enemy units for a mass attack
   * @param enemyTeam - array of units belonging to the enemy team
   * @returns an array of indices representing all alive units in the enemy team
   */
  static calculateMassAttack(enemyTeam: Unit[]): number[] {
    return enemyTeam.reduce<number[]>((indices, unit, index) => {
      if (unit.isAlive()) indices.push(index);
      return indices;
    }, []);
  }
}

export default AttackRangeCalculator;
