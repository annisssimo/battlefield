import { FaHeart } from 'react-icons/fa';
import Unit from '../../models/Unit';
import * as style from './GameUnitCard.css';
import { TeamNames } from '../../types/types';

const GameUnitCard = ({
  unit,
  color,
  highlightedUnit,
  isCurrent,
}: GameUnitCardProps) => {
  const unitClass = style.unitState({
    isDefending: unit.state.isDefending,
    isHighlighted: highlightedUnit?.id === unit.id,
    isPossibleTarget: unit.state.isPossibleTarget,
    isCurrent,
    color,
  });

  const handleDefending = (): void => {
    unit.setDefending(true);
    console.log('defend!');
    console.log(unit);
  };

  return (
    <div
      className={`${unitClass} ${
        unit.state.isPossibleTarget ? style.target : ''
      }`}
    >
      <figure className={style.unitFigure}>
        <img src={unit.image} alt={unit.name} className={style.unitImage} />
        <figcaption className={style.unitCaption}>
          <div className={style.hp}>
            <FaHeart className={style.heartIcon} />
            <span className={style.healthPoints}>{unit.healthPoints}</span>
          </div>
          <b>{unit.name}</b>
          <br />
          <span>Damage: {unit.damage}</span>
          <br />
          {isCurrent && (
            <button className={style.defendButton} onClick={handleDefending}>
              Defend
            </button>
          )}
        </figcaption>
      </figure>
    </div>
  );
};

export default GameUnitCard;

interface GameUnitCardProps {
  unit: Unit;
  highlightedUnit: Unit | null;
  isCurrent: boolean;
  color: TeamNames;
}
