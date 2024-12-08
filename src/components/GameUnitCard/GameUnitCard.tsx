import { FaHeart } from 'react-icons/fa';
import Unit from '../../models/Unit';
import * as style from './GameUnitCard.css';

const GameUnitCard = ({ unit, color, highlightedUnit }: GameUnitCardProps) => {
  const unitClass = style.unitState({
    isDefending: unit.state.isDefending,
    isHighlighted: highlightedUnit?.id === unit.id,
    color,
  });

  return (
    <div className={unitClass}>
      <figure className={style.unitFigure}>
        <img src={unit.image} alt={unit.name} className={style.unitImage} />
        <figcaption className={style.unitCaption}>
          <div className={style.hp}>
            <FaHeart className={style.heartIcon} />
            <span className={style.healthPoints}>{unit.healthPoints}</span>
          </div>
          <b>{unit.name}</b>
          <br />
          <span>Initiative: {unit.initiative}</span>
          <br />
          <span>Damage: {unit.damage}</span>
          <br />
        </figcaption>
      </figure>
    </div>
  );
};

export default GameUnitCard;

interface GameUnitCardProps {
  unit: Unit;
  color: 'red' | 'orange';
  highlightedUnit: Unit | null;
}
