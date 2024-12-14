export const UnitType = {
  Melee: 'melee',
  Range: 'range',
  Mage: 'mage',
  HealerSingle: 'healer_single',
  HealerMass: 'healer_mass',
  Paralyzer: 'paralyzer',
} as const;

export type UnitType = (typeof UnitType)[keyof typeof UnitType];

export const UnitName = {
  Skeleton: 'Skeleton',
  Centaur: 'Centaur',
  Bandit: 'Bandit',
  'Elf Archer': 'Elf Archer',
  'Skeleton Mage': 'Skeleton Mage',
  Archimage: 'Archimage',
  Monk: 'Monk',
  Bishop: 'Bishop',
  Sirena: 'Sirena',
} as const;

export type UnitName = keyof typeof UnitName;
