import { UnitType } from './unit.enums';
import skeletonImg from '../../../assets/Skeleton.webp';
import centaurImg from '../../../assets/Centaur.webp';
import banditImg from '../../../assets/Bandit.webp';
import elfArcherImg from '../../../assets/Elf Archer.webp';
import skeletonMageImg from '../../../assets/Skeleton mage.webp';
import archimageImg from '../../../assets/Archimage.webp';
import monkImg from '../../../assets/Monk.webp';
import bishopImg from '../../../assets/Bishop.webp';
import sirenaImg from '../../../assets/Sirena.webp';

export const GameUnits = {
  Skeleton: {
    type: UnitType.Melee,
    health: 100,
    damage: 25,
    initiative: 50,
    image: skeletonImg,
  },
  Centaur: {
    type: UnitType.Melee,
    health: 150,
    damage: 50,
    initiative: 50,
    image: centaurImg,
  },
  Bandit: {
    type: UnitType.Range,
    health: 75,
    damage: 30,
    initiative: 60,
    image: banditImg,
  },
  'Elf Archer': {
    type: UnitType.Range,
    health: 90,
    damage: 45,
    initiative: 60,
    image: elfArcherImg,
  },
  'Skeleton Mage': {
    type: UnitType.Mage,
    health: 50,
    damage: 20,
    initiative: 40,
    image: skeletonMageImg,
  },
  Archimage: {
    type: UnitType.Mage,
    health: 90,
    damage: 30,
    initiative: 40,
    image: archimageImg,
  },
  Monk: {
    type: UnitType.HealerSingle,
    health: 90,
    heal: 40,
    initiative: 20,
    image: monkImg,
  },
  Bishop: {
    type: UnitType.HealerMass,
    health: 130,
    heal: 25,
    initiative: 20,
    image: bishopImg,
  },
  Sirena: {
    type: UnitType.Paralyzer,
    health: 80,
    damage: 0,
    initiative: 20,
    image: sirenaImg,
  },
} as const;
