import GameUnitCard from '../GameUnitCard/GameUnitCard';
import Unit from '../../features/units/models/Unit';
import * as style from './TeamField.css';
import { mapToGeneralActionType } from '../../shared/utils/actionMapper';
import { useCurrentUnit } from '../../shared/hooks/useCurrentUnit';
import StrategyFactory from '../../features/battle/strategies/StrategyFactory';
import StrategyContext from '../../features/battle/strategies/StrategyContext';
import {
  GeneralActionType,
  TeamNames,
  AllUnits,
} from '../../shared/types/types';

const TeamField = ({
  team,
  color,
  highlightedUnit,
  currentUnitId,
  onEndTurn,
  allUnits,
  isMassAttack,
}: TeamFieldProps) => {
  const { currentUnit } = useCurrentUnit();

  const generalAttackerActionType = currentUnit
    ? (mapToGeneralActionType(currentUnit.getActionType()) as GeneralActionType)
    : null;

  const handleUnitClick = (targetUnit: Unit) => {
    if (!currentUnit || !targetUnit.state.isPossibleTarget) return;

    try {
      const strategy = StrategyFactory.createStrategy(
        currentUnit.getActionType()
      );
      const strategyContext = new StrategyContext(strategy);

      strategyContext.attack(currentUnit, allUnits, targetUnit);
    } catch (error) {
      console.error('Error executing action:', error);
    }

    if (onEndTurn) onEndTurn();
  };

  return (
    <div className={style.teamContainer}>
      {team.map((unit) => (
        <GameUnitCard
          key={unit.id}
          unit={unit}
          color={color}
          highlightedUnit={highlightedUnit}
          isCurrent={unit.id === currentUnitId}
          onEndTurn={onEndTurn}
          generalAttackerActionType={generalAttackerActionType}
          onUnitClick={() => handleUnitClick(unit)}
          isMassAttack={isMassAttack}
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
  isMassAttack: boolean;
}
