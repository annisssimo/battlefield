import Unit from '../../models/Unit';
import * as style from './GameUnitCard.css';

const GameUnitCard = ({
  unit,
  team,
  color,
  handleUnitClick,
}: GameUnitCardProps) => {
  const unitClass = style.unitState({
    isDefending: unit.isDefending,
    color: color,
  });

  return (
    <div className={unitClass} onClick={() => handleUnitClick(team, unit)}>
      <figure>
        <img src={unit.image} alt={unit.name} className={style.unitImage} />
        <figcaption>
          <b>{unit.name}</b> <br /> (HP: {unit.healthPoints})
        </figcaption>
      </figure>
    </div>
  );
};

export default GameUnitCard;

interface GameUnitCardProps {
  unit: Unit;
  team: Unit[];
  color: 'red' | 'orange';
  handleUnitClick: (team: Unit[], unit: Unit) => void;
}
