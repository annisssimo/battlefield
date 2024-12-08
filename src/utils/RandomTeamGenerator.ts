import { UnitFactory } from '../models/UnitFactory';
import { UnitName } from '../enums/unit.enums';

export const generateRandomTeam = (teamName: 'red' | 'orange') => {
  const unitNames = Object.values(UnitName);
  const team = Array.from({ length: 6 }, (_, index) => {
    const randomName = unitNames[Math.floor(Math.random() * unitNames.length)];
    return UnitFactory(randomName, teamName, index);
  });
  return team;
};
