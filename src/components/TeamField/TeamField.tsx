import GameUnitCard from '../GameUnitCard/GameUnitCard';
import Unit from '../../models/Unit';
import * as style from './TeamField.css';

const TeamField = ({ team, color, highlightedUnit }: TeamFieldProps) => {
  return (
    <div className={style.teamContainer}>
      {team.map((unit) => (
        <GameUnitCard
          key={unit.id}
          unit={unit}
          color={color}
          highlightedUnit={highlightedUnit}
        />
      ))}
    </div>
  );
};

export default TeamField;

interface TeamFieldProps {
  team: Unit[];
  color: 'red' | 'orange';
  highlightedUnit: Unit | null;
}
