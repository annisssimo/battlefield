import Unit from '../models/Unit';

class AttackRangeCalculator {
  /**
   * Определяет допустимые индексы целей для ближнего боя.
   * @param attackerIndex Индекс атакующего в своей команде.
   * @param attackerTeam Команда атакующего ('red' или 'orange').
   * @param enemyTeam Вражеская команда.
   * @returns Массив индексов доступных целей.
   */
  static calculateMeleeRange(
    attackerIndex: number,
    attackerTeam: 'red' | 'orange',
    enemyTeam: Unit[]
  ): number[] {
    // Диапазоны атак для каждой команды
    const ranges: Record<'red' | 'orange', Record<number, number[]>> = {
      red: {
        3: [0, 1], // Первая линия команды orange
        4: [0, 1, 2],
        5: [1, 2],
      },
      orange: {
        0: [3, 4], // Первая линия команды red
        1: [3, 4, 5],
        2: [4, 5],
      },
    };

    const frontLine = ranges[attackerTeam][attackerIndex] || [];

    // Проверяем, жива ли первая линия
    const isFrontLineDead = frontLine.every(
      (index) => enemyTeam[index]?.healthPoints <= 0
    );

    if (isFrontLineDead) {
      // Если первая линия мертва, возвращаем все индексы живых юнитов
      return enemyTeam
        .map((unit, index) => (unit.isAlive() ? index : -1))
        .filter((index) => index !== -1);
    }

    // Возвращаем только живых юнитов в первой линии
    return frontLine.filter((index) => enemyTeam[index]?.isAlive());
  }

  /**
   * Определяет все доступные индексы для дальнего боя.
   * @param enemyTeam Вражеская команда.
   * @returns Массив индексов доступных целей.
   */
  static calculateRangeAttack(enemyTeam: Unit[]): number[] {
    // Возвращаем индексы всех живых юнитов
    return enemyTeam
      .map((unit, index) => (unit.isAlive() ? index : -1))
      .filter((index) => index !== -1);
  }

  /**
   * Возвращает индексы всех врагов для массовой атаки (например, магов).
   * @param enemyTeam Вражеская команда.
   * @returns Массив индексов всех врагов.
   */
  static calculateMassAttack(enemyTeam: Unit[]): number[] {
    return enemyTeam.map((_, index) => index); // Все индексы
  }
}

export default AttackRangeCalculator;
