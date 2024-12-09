import { useState, useEffect } from 'react';

import { generateRandomTeam } from '../../utils/randomTeamGenerator';
import Unit from '../../models/Unit';
import TeamField from '../TeamField/TeamField';
import * as style from './Battlefield.css';
import RoundInfo from '../RoundInfo/RoundInfo';
import StrategyFactory from '../../strategies/StrategyFactory';
import { AllUnits } from '../../types/types';
import { useCurrentUnit } from '../../hooks/useCurrentUnit';

const Battlefield = () => {
  const [teams, setTeams] = useState<AllUnits>({
    red: [],
    orange: [],
  });
  const [sortedUnits, setSortedUnits] = useState<Unit[]>([]);
  const [highlightedUnit, setHighlightedUnit] = useState<Unit | null>(null);
  const { currentUnit, setCurrentUnit } = useCurrentUnit();

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

  const nextTurn = () => {
    if (!currentUnit) return;

    const nextUnitIndex =
      (sortedUnits.indexOf(currentUnit) + 1) % sortedUnits.length;
    setCurrentUnit(sortedUnits[nextUnitIndex]);
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
        />
        <h2>VS</h2>
        <TeamField
          team={teams.orange}
          color="orange"
          highlightedUnit={highlightedUnit}
          currentUnitId={currentUnit?.id || ''}
          onEndTurn={nextTurn}
        />
      </div>
      <RoundInfo
        units={sortedUnits}
        onHighlightUnit={handleHighlightUnit}
        currentUnitIndex={sortedUnits.indexOf(currentUnit!)}
      />
    </div>
  );
};

export default Battlefield;
