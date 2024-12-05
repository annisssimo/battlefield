import MeleeUnit from '../models/MeleeUnit';
import RangeUnit from '../models/RangeUnit';
import MageUnit from '../models/MageUnit';
import HealerUnitSingle from '../models/HealerUnitSingle';
import HealerUnitMass from '../models/HealerUnitMass';
import ParalyzerUnit from '../models/ParalyzerUnit';

import skeletonImg from '../assets/Skeleton.webp';
import centaurImg from '../assets/Centaur.webp';
import banditImg from '../assets/Bandit.webp';
import elfArcherImg from '../assets/Elf Archer.png';
import skeletonMageImg from '../assets/Skeleton mage.png';
import archimageImg from '../assets/Archimage.png';
import monkImg from '../assets/Monk.png';
import bishopImg from '../assets/Bishop.png';
import sirenaImg from '../assets/Sirena.png';

export const generateRandomTeam = () => {
  const units = [
    new MeleeUnit('Skeleton', 100, 25, 50, skeletonImg),
    new MeleeUnit('Centaur', 150, 50, 50, centaurImg),
    new RangeUnit('Bandit', 75, 30, 60, banditImg),
    new RangeUnit('Elf Archer', 90, 45, 60, elfArcherImg),
    new MageUnit('Skeleton Mage', 50, 20, 40, skeletonMageImg),
    new MageUnit('Archimage', 90, 30, 40, archimageImg),
    new HealerUnitSingle('Monk', 90, 40, 20, monkImg),
    new HealerUnitMass('Bishop', 130, 25, 20, bishopImg),
    new ParalyzerUnit('Sirena', 80, 0, 20, sirenaImg),
  ];

  const team = [];
  for (let i = 0; i < 6; i++) {
    team.push(units[Math.floor(Math.random() * units.length)]);
  }

  return team;
};
