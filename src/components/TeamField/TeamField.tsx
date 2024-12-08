import GameUnitCard from '../GameUnitCard/GameUnitCard';
import Unit from '../../models/Unit';
import * as style from './TeamField.css';

const TeamField = ({
  team,
  color,
  highlightedUnit,
  currentUnitId,
}: TeamFieldProps) => {
  return (
    <div className={style.teamContainer}>
      {team.map((unit) => (
        <GameUnitCard
          key={unit.id}
          unit={unit}
          color={color}
          highlightedUnit={highlightedUnit}
          isCurrent={unit.id === currentUnitId}
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
  currentUnitId: string | null;
}