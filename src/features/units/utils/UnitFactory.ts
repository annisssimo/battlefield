import { TeamNames } from '../../../shared/types/types';
import { GameUnits } from '../enums/game.units';
import { UnitName, UnitType } from '../enums/unit.enums';
import HealerUnitMass from '../models/HealerUnitMass';
import HealerUnitSingle from '../models/HealerUnitSingle';
import MageUnit from '../models/MageUnit';
import MeleeUnit from '../models/MeleeUnit';
import ParalyzerUnit from '../models/ParalyzerUnit';
import RangeUnit from '../models/RangeUnit';
import Unit from '../models/Unit';

export const UnitFactory = (
  name: UnitName,
  team: TeamNames,
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
