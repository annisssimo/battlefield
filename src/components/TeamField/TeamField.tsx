import { Key } from 'react';
import GameUnitCard from '../GameUnitCard/GameUnitCard';
import Unit from '../../models/Unit';
import * as style from './TeamField.css';

const TeamField = ({ team, color, handleUnitClick }: TeamFieldProps) => {
  return (
    <div className={style.teamContainer}>
      {team.map((unit, index: Key) => (
        <GameUnitCard
          key={index}
          unit={unit}
          team={team}
          color={color}
          handleUnitClick={() => handleUnitClick(team, unit)}
        />
      ))}
    </div>
  );
};

export default TeamField;

interface TeamFieldProps {
  team: Unit[];
  color: 'red' | 'orange';
  handleUnitClick: (team: Unit[], unit: Unit) => void;
}
