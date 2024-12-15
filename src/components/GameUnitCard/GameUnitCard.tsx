import { useState } from 'react';
import { GiPotionBall, GiSlashedShield } from 'react-icons/gi';
import { FaHeart } from 'react-icons/fa';

import Unit from '../../features/units/models/Unit';
import * as style from './GameUnitCard.css';
import ActionIcon from '../ActionIcon/ActionIcon';
import { GeneralActionType, TeamNames } from '../../shared/types/types';

const GameUnitCard = ({
  unit,
  color,
  highlightedUnit,
  isCurrent,
  onEndTurn,
  generalAttackerActionType,
  onUnitClick,
  isMassAttack,
}: GameUnitCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const unitClass = style.unitState({
    isHighlighted: highlightedUnit?.id === unit.id,
    isPossibleTarget: unit.state.isPossibleTarget,
    isDead: !unit.isAlive(),
    isDying: unit.healthPoints > 0 && unit.healthPoints <= 15,
    isCurrent,
    color,
  });

  const handleDefending = (): void => {
    unit.state.setDefending(!unit.state.isDefending);
    unit.state.setDefending(true);
    if (onEndTurn) onEndTurn();
  };

  return (
    <div
      className={unitClass}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onUnitClick}
    >
      {unit.state.isPossibleTarget &&
        (isHovered || isMassAttack) &&
        unit.isAlive() && (
          <ActionIcon
            actionType={generalAttackerActionType as GeneralActionType}
          />
        )}
      <figure className={style.unitFigure}>
        <img src={unit.image} alt={unit.name} className={style.unitImage} />
        <figcaption className={style.unitCaption}>
          <div className={style.hp}>
            <FaHeart
              className={style.heartIcon({
                isDefending: unit.state.isDefending,
              })}
            />
            <span className={style.healthPoints}>{unit.healthPoints}</span>
          </div>
          <b>{unit.name}</b>
          <br />
          <span>Damage: {unit.damage}</span>
          <br />
          {isCurrent && (
            <GiSlashedShield
              className={style.defendButton({
                isDefending: unit.state.isDefending,
              })}
              onClick={handleDefending}
            />
          )}
          {unit.state.isParalyzed && (
            <GiPotionBall title="Paralyzed" className={style.paralyzedIcon} />
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
  onEndTurn: () => void;
  generalAttackerActionType: string | null;
  onUnitClick: () => void;
  isMassAttack: boolean;
}
