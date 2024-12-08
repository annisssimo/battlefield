import Unit from '../models/Unit';
import MeleeUnit from '../models/MeleeUnit';
import RangeUnit from '../models/RangeUnit';
import MageUnit from '../models/MageUnit';
import HealerUnitSingle from '../models/HealerUnitSingle';
import HealerUnitMass from '../models/HealerUnitMass';
import ParalyzerUnit from '../models/ParalyzerUnit';
import { UnitType, UnitName } from '../enums/unit.enums';
import { GameUnits } from '../enums/game.units';

export const UnitFactory = (
  name: UnitName,
  team: 'red' | 'orange',
  index: number
): Unit => {
  const data = GameUnits[name as keyof typeof GameUnits];
  switch (data.type) {
    case UnitType.Melee:
      return new MeleeUnit(
        name,
        data.health,
        data.damage,
        data.initiative,
        data.image,
        team,
        index
      );
    case UnitType.Range:
      return new RangeUnit(
        name,
        data.health,
        data.damage,
        data.initiative,
        data.image,
        team,
        index
      );
    case UnitType.Mage:
      return new MageUnit(
        name,
        data.health,
        data.damage,
        data.initiative,
        data.image,
        team,
        index
      );
    case UnitType.HealerSingle:
      return new HealerUnitSingle(
        name,
        data.health,
        data.heal,
        data.initiative,
        data.image,
        team,
        index
      );
    case UnitType.HealerMass:
      return new HealerUnitMass(
        name,
        data.health,
        data.heal,
        data.initiative,
        data.image,
        team,
        index
      );
    case UnitType.Paralyzer:
      return new ParalyzerUnit(
        name,
        data.health,
        data.damage,
        data.initiative,
        data.image,
        team,
        index
      );
    default:
      throw new Error(`Unknown unit type`);
  }
};
