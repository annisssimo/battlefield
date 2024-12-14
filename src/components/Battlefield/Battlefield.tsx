import { useState, useEffect } from 'react';

import { TeamManager } from '../../features/battle/TeamManager';
import { GameStateManager } from '../../features/battle/GameStateManager';
import { WinnerChecker } from '../../features/battle/WinnerChecker';
import Unit from '../../features/units/models/Unit';
import TeamField from '../TeamField/TeamField';
import * as style from './Battlefield.css';
import RoundInfo from '../RoundInfo/RoundInfo';
import StrategyFactory from '../../features/battle/strategies/StrategyFactory';
import vsImg from '../../assets/vs.png';
import { AllUnits } from '../../shared/types/types';
import LogService from '../../features/units/services/LogService';
import { useCurrentUnit } from '../../shared/hooks/useCurrentUnit';
import Modal from '../Modal/Modal';

const Battlefield = () => {
  const [teams, setTeams] = useState<AllUnits>({
    red: [],
    orange: [],
  });
  const [sortedUnits, setSortedUnits] = useState<Unit[]>([]);
  const [highlightedUnit, setHighlightedUnit] = useState<Unit | null>(null);
  const { currentUnit, setCurrentUnit } = useCurrentUnit();
  const [roundNumber, setRoundNumber] = useState(1);
  const [winner, setWinner] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const { redTeam, orangeTeam } = TeamManager.initializeTeams();
    setTeams({ red: redTeam, orange: orangeTeam });
    setSortedUnits(TeamManager.sortUnitsByInitiative(redTeam, orangeTeam));
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (sortedUnits.length > 0) {
      const currentUnit = sortedUnits[0];
      setCurrentUnit(currentUnit);

      const strategy = StrategyFactory.createStrategy(
        currentUnit.getActionType()
      );
      strategy.highlightTargets(currentUnit, teams);
      setHighlightedUnit(currentUnit);
    }
  }, [sortedUnits, teams, setCurrentUnit]);

  const restartGame = () => {
    const { redTeam, orangeTeam } = TeamManager.initializeTeams();
    setTeams({ red: redTeam, orange: orangeTeam });
    setSortedUnits(TeamManager.sortUnitsByInitiative(redTeam, orangeTeam));
    setRoundNumber(1);
    setWinner(null);
    setHighlightedUnit(null);
    setCurrentUnit(null);
  };

  useEffect(() => {
    if (isInitialized) {
      const winner = WinnerChecker.checkForWinner(teams);
      if (winner) {
        setWinner(winner);
      }
    }
  }, [isInitialized, teams, [...Object.values(teams)]]);

  const handleHighlightUnit = (unit: Unit | null) => {
    setHighlightedUnit(unit);
  };

  const nextTurn = (index: number | null = null) => {
    if (!currentUnit && index === null) return;

    Object.values(teams).forEach((team) =>
      team.forEach((unit) => unit.state.setPossibleTarget(false))
    );

    const currentIndex =
      index !== null
        ? index
        : currentUnit
        ? sortedUnits.indexOf(currentUnit)
        : -1;

    if (currentIndex < 0) return;

    const nextUnit = GameStateManager.findNextAliveUnit(
      sortedUnits,
      currentIndex
    );

    if (GameStateManager.skipParalyzedUnit(nextUnit)) {
      nextTurn(sortedUnits.indexOf(nextUnit));
      return;
    }

    if (nextUnit.isAlive()) {
      setCurrentUnit(nextUnit);

      const strategy = StrategyFactory.createStrategy(nextUnit.getActionType());
      strategy.highlightTargets(nextUnit, teams);

      setHighlightedUnit(nextUnit);

      if (currentIndex > sortedUnits.indexOf(nextUnit)) {
        setRoundNumber((prev) => prev + 1);

        Object.values(teams).forEach((team) =>
          team.forEach((unit) => unit.state.setDefending(false))
        );

        LogService.log(`Round ${roundNumber + 1} starts!`);
      }
    } else {
      console.warn('No alive units left');
    }
  };

  return (
    <div className={style.app}>
      <div className={style.battlefield}>
        <TeamField
          team={teams.red}
          color="red"
          highlightedUnit={highlightedUnit}
          currentUnitId={currentUnit?.id || ''}
          onEndTurn={nextTurn}
          allUnits={teams}
        />

        <img src={vsImg} alt="vs" className={style.vsImg} />

        <TeamField
          team={teams.orange}
          color="orange"
          highlightedUnit={highlightedUnit}
          currentUnitId={currentUnit?.id || ''}
          onEndTurn={nextTurn}
          allUnits={teams}
        />
      </div>
      <RoundInfo
        units={sortedUnits}
        onHighlightUnit={handleHighlightUnit}
        currentUnitIndex={sortedUnits.indexOf(currentUnit!)}
        roundNumber={roundNumber}
      />
      {winner && <Modal winner={winner} onRestart={restartGame} />}
    </div>
  );
};

export default Battlefield;
