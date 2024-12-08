import Unit from '../models/Unit';
import ActionStrategy from './ActionStrategy';

class MeleeAttackStrategy implements ActionStrategy {
  executeAction(
    attacker: Unit,
    target?: Unit,
    allUnits?: { red: Unit[]; orange: Unit[] }
  ): void {
    if (!target) {
      console.log(`${attacker.name} has no target to attack!`);
      return;
    }

    const attackerTeam = attacker.team;
    const enemyTeam = attackerTeam === 'red' ? 'orange' : 'red';

    if (!this.isTargetWithinRange(attacker, target, allUnits![enemyTeam])) {
      console.log(`${attacker.name} can't reach ${target.name}!`);
      return;
    }

    console.log(`${attacker.name} attacks ${target.name}!`);
    target.takeDamage(attacker.damage);
  }

  private isTargetWithinRange(
    attacker: Unit,
    target: Unit,
    enemyTeam: Unit[]
  ): boolean {
    const attackerIndex = attacker.teamIndex ?? 0;
    const targetIndex = target.teamIndex ?? 0;

    // Определяем допустимые индексы для атаки
    const allowedRanges = this.calculateAllowedIndices(
      attackerIndex,
      attacker.team ?? 'red',
      enemyTeam
    );

    return allowedRanges.includes(targetIndex);
  }

  private calculateAllowedIndices(
    attackerIndex: number,
    team: 'red' | 'orange',
    enemyTeam: Unit[]
  ): number[] {
    const availableTargets = enemyTeam.filter((unit) => unit.healthPoints > 0);
    if (availableTargets.length === 0) return []; // Нет доступных целей

    const normalizedAttackerIndex = attackerIndex - 3; // Приводим к относительным индексам 0, 1, 2
    const defaultRanges: { [key: string]: number[][] } = {
      red: [
        [0, 1],
        [0, 1, 2],
        [1, 2],
      ], // Диапазон для игроков 4, 5, 6 команды red
      orange: [
        [3, 4],
        [3, 4, 5],
        [4, 5],
      ], // Диапазон для игроков 1, 2, 3 команды orange
    };

    const maxIndex = enemyTeam.length - 1;
    let allowedIndices = defaultRanges[team][normalizedAttackerIndex];

    console.log(normalizedAttackerIndex);
    console.log(allowedIndices);

    // Проверяем, не мертвы ли все ближайшие
    const isFrontLineDead = allowedIndices.every(
      (index) => !enemyTeam[index]?.healthPoints
    );

    if (isFrontLineDead) {
      // Расширяем диапазон до более дальних юнитов, если передние мертвы
      allowedIndices = enemyTeam.map((_, index) => index);
    } else {
      // Если только часть мертва, удаляем мертвых из списка
      allowedIndices = allowedIndices.filter(
        (index) => index <= maxIndex && enemyTeam[index]?.healthPoints > 0
      );
    }

    return allowedIndices;
  }
}

export default MeleeAttackStrategy;
