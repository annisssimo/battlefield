import { useState } from 'react';

import StrategyContext from '../../strategies/StrategyContext';
import { generateRandomTeam } from '../../utils/RandomTeamGenerator';
import Unit from '../../models/Unit';
import MeleeAttackStrategy from '../../strategies/MeleeAttackStrategy';
import TeamField from '../TeamField/TeamField';
import * as style from './Battlefield.css';

const Battlefield = () => {
  const [teams, setTeams] = useState({
    red: generateRandomTeam(),
    orange: generateRandomTeam(),
  });

  const handleUnitAction = (
    attacker: Unit,
    action: string,
    target?: Unit
  ): void => {
    if (target) {
      const strategyContext = new StrategyContext(new MeleeAttackStrategy());
      strategyContext.attack(attacker, target);
    }

    console.log('Action: ', action);
    setTeams({ ...teams });
  };

  const handleUnitClick = (team: Unit[], unit: Unit): void => {
    const targetTeam = team === teams.red ? teams.orange : teams.red;
    handleUnitAction(unit, 'meleeAttack', targetTeam[0]); // Атакуем первого юнита противоположной команды
  };

  return (
    <div className={style.battlefield}>
      <TeamField
        team={teams.red}
        color="red"
        handleUnitClick={handleUnitClick}
      />
      <h2>VS</h2>
      <TeamField
        team={teams.orange}
        color="orange"
        handleUnitClick={handleUnitClick}
      />
    </div>
  );
};

export default Battlefield;
