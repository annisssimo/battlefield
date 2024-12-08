import { useState, useEffect } from 'react';
import { generateRandomTeam } from '../../utils/RandomTeamGenerator';
import Unit from '../../models/Unit';
import TeamField from '../TeamField/TeamField';
import * as style from './Battlefield.css';
import RoundInfo from '../RoundInfo/RoundInfo';

const Battlefield = () => {
  const [teams, setTeams] = useState<{ red: Unit[]; orange: Unit[] }>({
    red: [],
    orange: [],
  });

  const [sortedUnits, setSortedUnits] = useState<Unit[]>([]);
  const [highlightedUnit, setHighlightedUnit] = useState<Unit | null>(null);

  useEffect(() => {
    console.log(highlightedUnit);
  });

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
        />
        <h2>VS</h2>
        <TeamField
          team={teams.orange}
          color="orange"
          highlightedUnit={highlightedUnit}
        />
      </div>
      <RoundInfo units={sortedUnits} onHighlightUnit={handleHighlightUnit} />
    </div>
  );
};

export default Battlefield;
