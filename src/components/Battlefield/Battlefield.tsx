import { useState, useEffect } from 'react';
import { generateRandomTeam } from '../../utils/RandomTeamGenerator';
import Unit from '../../models/Unit';
import TeamField from '../TeamField/TeamField';
import * as style from './Battlefield.css';
import RoundInfo from '../RoundInfo/RoundInfo';
import StrategyFactory from '../../strategies/StrategyFactory';
import { AllUnits } from '../../types/types';

const Battlefield = () => {
  const [teams, setTeams] = useState<AllUnits>({
    red: [],
    orange: [],
  });

  const [sortedUnits, setSortedUnits] = useState<Unit[]>([]);
  const [highlightedUnit, setHighlightedUnit] = useState<Unit | null>(null);
  //eslint-disable-next-line
  const [currentUnitIndex, setCurrentUnitIndex] = useState(0);

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
      const currentUnit = sortedUnits[currentUnitIndex];
      const strategy = StrategyFactory.createStrategy(
        currentUnit.getActionType()
      );
      strategy.highlightTargets(currentUnit, teams);
      setHighlightedUnit(currentUnit);
    }
  }, [currentUnitIndex, sortedUnits, teams]);

  const handleHighlightUnit = (unit: Unit | null) => {
    setHighlightedUnit(unit);
  };

  return (
    <div className={style.app}>
      <div className={style.battlefield}>
        <TeamField
          team={teams.red}
          color="red"
          highlightedUnit={highlightedUnit}
          currentUnitId={sortedUnits[currentUnitIndex]?.id}
        />
        <h2>VS</h2>
        <TeamField
          team={teams.orange}
          color="orange"
          highlightedUnit={highlightedUnit}
          currentUnitId={sortedUnits[currentUnitIndex]?.id}
        />
      </div>
      <RoundInfo
        units={sortedUnits}
        onHighlightUnit={handleHighlightUnit}
        currentUnitIndex={currentUnitIndex}
      />
    </div>
  );
};

export default Battlefield;
