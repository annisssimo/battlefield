import Unit from '../models/Unit';

export type TeamNames = 'red' | 'orange';

export type AllUnits = { red: Unit[]; orange: Unit[] };

export type ActionType = 'attack' | 'heal' | 'paralyze' | null;
