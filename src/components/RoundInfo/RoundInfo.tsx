import { useState } from 'react';

import Unit from '../../models/Unit';
import * as style from './RoundInfo.css';

const RoundInfo = ({ units, onHighlightUnit }: RoundInfoProps) => {
  const [highlightedUnit, setHighlightedUnit] = useState<Unit | null>(null);

  const handleMouseEnter = (unit: Unit) => {
    setHighlightedUnit(unit);
    onHighlightUnit(unit);
  };

  const handleMouseLeave = () => {
    setHighlightedUnit(null);
    onHighlightUnit(null);
  };

  return (
    <div className={style.roundInfoContainer}>
      <h3>Turn Order</h3>
      <ul className={style.unitList}>
        {units.map((unit) => (
          <li
            key={unit.id}
            className={`${style.unitItem.default} ${
              highlightedUnit?.id === unit.id ? style.unitItem.highlighted : ''
            }`}
            onMouseEnter={() => handleMouseEnter(unit)}
            onMouseLeave={handleMouseLeave}
          >
            <img src={unit.image} alt={unit.name} className={style.unitImage} />
            <span>
              {unit.name} (Initiative: {unit.initiative})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoundInfo;

interface RoundInfoProps {
  units: Unit[];
  onHighlightUnit: (unit: Unit | null) => void;
}