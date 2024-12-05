import MeleeUnit from '../models/MeleeUnit';
import RangeUnit from '../models/RangeUnit';
import MageUnit from '../models/MageUnit';
import HealerUnitSingle from '../models/HealerUnitSingle';
import HealerUnitMass from '../models/HealerUnitMass';
import ParalyzerUnit from '../models/ParalyzerUnit';

export const generateRandomTeam = () => {
  const units = [
    new MeleeUnit('Skeleton', 100, 25, 50, 'skeleton_img'),
    new MeleeUnit('Centaur', 150, 50, 50, 'centaur_img'),
    new RangeUnit('Bandit', 75, 30, 60, 'bandit_img'),
    new RangeUnit('Elf Archer', 90, 45, 60, 'elf_archer_img'),
    new MageUnit('Skeleton Mage', 50, 20, 40, 'skeleton_mage_img'),
    new MageUnit('Archimage', 90, 30, 40, 'archimage_img'),
    new HealerUnitSingle('Monk', 90, 40, 20, 'monk_img'),
    new HealerUnitMass('Bishop', 130, 25, 20, 'bishop_img'),
    new ParalyzerUnit('Sirena', 80, 0, 20, 'sirena_img'),
  ];

  const team = [];
  for (let i = 0; i < 6; i++) {
    team.push(units[Math.floor(Math.random() * units.length)]);
  }

  return team;
};
