import { useState } from 'react';

import './App.css';
import StrategyContext from './strategies/StrategyContext';
import { generateRandomTeam } from './utils/RandomTeamGenerator';
import Unit from './models/Unit';
import Battlefield from './components/Battlefield';
import MeleeAttackStrategy from './strategies/MeleeAttackStrategy';

function App() {
  const [teams, setTeams] = useState({
    red: generateRandomTeam(),
    orange: generateRandomTeam(),
  });

  const handleUnitAction = (attacker: Unit, action: string, target?: Unit) => {
    if (target) {
      const strategyContext = new StrategyContext(new MeleeAttackStrategy());
      console.log('Add attack depending on action: ', action);
      strategyContext.attack(attacker, target);
    }

    setTeams({ ...teams });
  };

  return (
    <div className="app">
      <h1>Battlefield</h1>
      <Battlefield teams={teams} onUnitAction={handleUnitAction} />
    </div>
  );
}

export default App;
