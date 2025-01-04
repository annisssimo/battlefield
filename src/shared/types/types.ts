import Unit from '../../features/units/models/Unit';

export type TeamNames = 'red' | 'orange';

export type AllUnits = { red: Unit[]; orange: Unit[] };

export type ActionType =
  | 'meleeAttack'
  | 'rangeAttack'
  | 'mageAttack'
  | 'healSingle'
  | 'healMass'
  | 'paralyze';

export type GeneralActionType = 'attack' | 'heal' | 'paralyze';
