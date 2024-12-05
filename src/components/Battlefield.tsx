import Unit from '../models/Unit';

const Battlefield = ({ teams, onUnitAction }: BattlefieldProps) => {
  const handleUnitClick = (team: 'red' | 'orange', unit: Unit) => {
    const targetTeam = team === 'red' ? 'orange' : 'red';
    onUnitAction(unit, 'meleeAttack', teams[targetTeam][0]); // for now to test
  };

  return (
    <div className="battlefield">
      <div className="team red">
        {teams.red.map((unit, index) => (
          <div
            key={index}
            className={`unit ${unit.isDefending ? 'defending' : ''}`}
            onClick={() => handleUnitClick('red', unit)}
          >
            {unit.name} (HP: {unit.healthPoints})
          </div>
        ))}
      </div>
      <h2>VS</h2>
      <div className="team orange">
        {teams.orange.map((unit, index) => (
          <div
            key={index}
            className={`unit ${unit.isDefending ? 'defending' : ''}`}
            onClick={() => handleUnitClick('orange', unit)}
          >
            {unit.name} (HP: {unit.healthPoints})
          </div>
        ))}
      </div>
    </div>
  );
};

export default Battlefield;

interface BattlefieldProps {
  teams: { red: Unit[]; orange: Unit[] };
  onUnitAction: (unit: Unit, action: string, target?: Unit) => void;
}
