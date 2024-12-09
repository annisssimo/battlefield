import Unit from '../models/Unit';
import ActionStrategy from './ActionStrategy';

class MeleeAttackStrategy implements ActionStrategy {
  highlightTargets(attacker: Unit, allUnits: { red: Unit[]; orange: Unit[] }) {
    const enemyTeam = attacker.team === 'red' ? allUnits.orange : allUnits.red;
    const allowedIndices = this.calculateAllowedIndices(
      attacker.teamIndex,
      attacker.team,
      enemyTeam
    );

    enemyTeam.forEach((unit) => unit.state.setPossibleTarget(false));

    allowedIndices.forEach((index) => {
      if (enemyTeam[index]) {
        enemyTeam[index].state.setPossibleTarget(true);
      }
    });
  }

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

    // Приведение индекса атакующего к диапазону от 0 до 2
    const normalizedAttackerIndex = attackerIndex - 3;
    if (normalizedAttackerIndex < 0 || normalizedAttackerIndex > 2) {
      console.warn(`Invalid attacker index: ${attackerIndex}`);
      return []; // Вернуть пустой массив, если индекс выходит за пределы
    }

    const defaultRanges: { [key: string]: number[][] } = {
      red: [
        [0, 1],
        [0, 1, 2],
        [1, 2],
      ],
      orange: [
        [0, 1],
        [0, 1, 2],
        [1, 2],
      ],
    };

    const allowedIndices = defaultRanges[team][normalizedAttackerIndex] || [];
    const maxIndex = enemyTeam.length - 1;

    // Проверка на мертвую первую линию
    const isFrontLineDead = allowedIndices.every(
      (index) => !enemyTeam[index]?.healthPoints
    );

    if (isFrontLineDead) {
      // Все ближайшие мертвы, возвращаем все доступные индексы
      return enemyTeam
        .map((_, index) => index)
        .filter((i) => enemyTeam[i]?.healthPoints > 0);
    }

    // Возвращаем только живых из допустимого диапазона
    return allowedIndices.filter(
      (index) => index <= maxIndex && enemyTeam[index]?.healthPoints > 0
    );
  }
}

export default MeleeAttackStrategy;
