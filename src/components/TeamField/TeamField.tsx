import GameUnitCard from '../GameUnitCard/GameUnitCard';
import Unit from '../../models/Unit';
import * as style from './TeamField.css';
import { GeneralActionType, TeamNames } from '../../types/types';
import { mapToGeneralActionType } from '../../utils/actionMapper';
import { useCurrentUnit } from '../../hooks/useCurrentUnit';

const TeamField = ({
  team,
  color,
  highlightedUnit,
  currentUnitId,
  onEndTurn,
}: TeamFieldProps) => {
  const { currentUnit } = useCurrentUnit();

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
          attackerActionType={
            currentUnit
              ? (mapToGeneralActionType(
                  currentUnit.getActionType()
                ) as GeneralActionType)
              : null
          }
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
}
