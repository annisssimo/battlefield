import GameUnitCard from '../GameUnitCard/GameUnitCard';
import Unit from '../../models/Unit';
import * as style from './TeamField.css';
import { GeneralActionType, TeamNames, AllUnits } from '../../types/types';
import { mapToGeneralActionType } from '../../utils/actionMapper';
import { useCurrentUnit } from '../../hooks/useCurrentUnit';
import { useState } from 'react';
import StrategyFactory from '../../strategies/StrategyFactory';
import StrategyContext from '../../strategies/StrategyContext';

const TeamField = ({
  team,
  color,
  highlightedUnit,
  currentUnitId,
  onEndTurn,
  allUnits,
}: TeamFieldProps) => {
  const { currentUnit } = useCurrentUnit();
  const [isHoveringTargets, setIsHoveringTargets] = useState(false);

  const attackerActionType = currentUnit?.getActionType();
  const generalAttackerActionType = currentUnit
    ? (mapToGeneralActionType(currentUnit.getActionType()) as GeneralActionType)
    : null;

  const handleMouseEnter = () => {
    if (
      attackerActionType === 'mageAttack' ||
      attackerActionType === 'healMass'
    ) {
      setIsHoveringTargets(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHoveringTargets(false);
  };

  const handleUnitClick = (targetUnit: Unit) => {
    if (!currentUnit) return;

    try {
      const strategy = StrategyFactory.createStrategy(
        currentUnit.getActionType()
      );
      const strategyContext = new StrategyContext(strategy);

      strategyContext.attack(currentUnit, allUnits, targetUnit);

      console.log(`Action executed: ${currentUnit.name} -> ${targetUnit.name}`);
    } catch (error) {
      console.error('Error executing action:', error);
    }

    if (onEndTurn) onEndTurn();
  };

  return (
    <div
      className={style.teamContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {team.map((unit) => (
        <GameUnitCard
          key={unit.id}
          unit={unit}
          color={color}
          highlightedUnit={highlightedUnit}
          isCurrent={unit.id === currentUnitId}
          onEndTurn={onEndTurn}
          generalAttackerActionType={generalAttackerActionType}
          isHoveringTargets={isHoveringTargets}
          onUnitClick={() => handleUnitClick(unit)}
        />
      ))}
    </div>
  );
};

export default TeamField;

interface TeamFieldProps {
  team: Unit[];
  color: TeamNames;
  highlightedUnit: Unit | null;
  currentUnitId: string | null;
  onEndTurn: () => void;
  allUnits: AllUnits;
}
