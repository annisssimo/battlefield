import { useState, useEffect } from 'react';

import { generateRandomTeam } from '../../utils/randomTeamGenerator';
import Unit from '../../models/Unit';
import TeamField from '../TeamField/TeamField';
import * as style from './Battlefield.css';
import RoundInfo from '../RoundInfo/RoundInfo';
import StrategyFactory from '../../strategies/StrategyFactory';
import { AllUnits } from '../../types/types';
import { useCurrentUnit } from '../../hooks/useCurrentUnit';
import vsImg from '../../assets/vs.png';
import LogService from '../../services/LogService';

const Battlefield = () => {
  const [teams, setTeams] = useState<AllUnits>({
    red: [],
    orange: [],
  });
  const [sortedUnits, setSortedUnits] = useState<Unit[]>([]);
  const [highlightedUnit, setHighlightedUnit] = useState<Unit | null>(null);
  const { currentUnit, setCurrentUnit } = useCurrentUnit();
  const [roundNumber, setRoundNumber] = useState(1);

  useEffect(() => {
    const redTeam = generateRandomTeam('red');
    const orangeTeam = generateRandomTeam('orange');
    setTeams({ red: redTeam, orange: orangeTeam });

    const allUnits = [...redTeam, ...orangeTeam].sort((a, b) => {
      if (a.initiative === b.initiative) {
        return Math.random() - 0.5;
      }
      return b.initiative - a.initiative;
    });

    setSortedUnits(allUnits);
  }, []);

  useEffect(() => {
    if (sortedUnits.length > 0) {
      const currentUnit = sortedUnits[0];
      setCurrentUnit(currentUnit);

      const strategy = StrategyFactory.createStrategy(
        currentUnit.getActionType()
      );
      strategy.highlightTargets(currentUnit, teams);
      setHighlightedUnit(currentUnit);
    }
  }, [sortedUnits, teams, setCurrentUnit]);

  const handleHighlightUnit = (unit: Unit | null) => {
    setHighlightedUnit(unit);
  };

  const nextTurn = (index: number | null = null) => {
    if (!currentUnit && index === null) return;

    Object.values(teams).forEach((team) =>
      team.forEach((unit) => unit.state.setPossibleTarget(false))
    );

    const currentIndex =
      index !== null
        ? index
        : currentUnit
        ? sortedUnits.indexOf(currentUnit)
        : -1;

    if (currentIndex < 0) return;

    let nextUnitIndex = currentIndex;
    let completedRound = false;

    do {
      nextUnitIndex = (nextUnitIndex + 1) % sortedUnits.length;
      if (nextUnitIndex === 0) completedRound = true;
    } while (
      !sortedUnits[nextUnitIndex].isAlive() &&
      nextUnitIndex !== currentIndex
    );

    const nextUnit = sortedUnits[nextUnitIndex];

    if (nextUnit.state.isParalyzed) {
      LogService.info(
        `${nextUnit.name} skips his turn because he is paralyzed.`
      );
      nextUnit.state.setParalyzed(false);
      nextTurn(nextUnitIndex);

      return;
    }

    if (nextUnit.isAlive()) {
      setCurrentUnit(nextUnit);

      const strategy = StrategyFactory.createStrategy(nextUnit.getActionType());
      strategy.highlightTargets(nextUnit, teams);

      setHighlightedUnit(nextUnit);

      if (completedRound) {
        setRoundNumber((prev) => prev + 1);

        Object.values(teams).forEach((team) =>
          team.forEach((unit) => unit.state.setDefending(false))
        );

        LogService.log(`Round ${roundNumber + 1} starts!`);
      }
    } else {
      console.warn('No alive units left');
    }
  };

  return (
    <div className={style.app}>
      <div className={style.battlefield}>
        <TeamField
          team={teams.red}
          color="red"
          highlightedUnit={highlightedUnit}
          currentUnitId={currentUnit?.id || ''}
          onEndTurn={nextTurn}
          allUnits={teams}
        />

        <img src={vsImg} alt="vs" className={style.vsImg} />

        <TeamField
          team={teams.orange}
          color="orange"
          highlightedUnit={highlightedUnit}
          currentUnitId={currentUnit?.id || ''}
          onEndTurn={nextTurn}
          allUnits={teams}
        />
      </div>
      <RoundInfo
        units={sortedUnits}
        onHighlightUnit={handleHighlightUnit}
        currentUnitIndex={sortedUnits.indexOf(currentUnit!)}
        roundNumber={roundNumber}
      />
    </div>
  );
};

export default Battlefield;
