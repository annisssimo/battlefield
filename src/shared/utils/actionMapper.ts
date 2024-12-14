import { GeneralActionType } from '../types/types';

export const mapToGeneralActionType = (
  action: string
): 'attack' | 'heal' | 'paralyze' | null => {
  const actionMapping: { [key: string]: GeneralActionType } = {
    meleeAttack: 'attack',
    rangeAttack: 'attack',
    mageAttack: 'attack',
    healSingle: 'heal',
    healMass: 'heal',
    paralyze: 'paralyze',
  };

  return actionMapping[action] || null;
};
