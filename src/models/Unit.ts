import { v4 as uuidv4 } from 'uuid';

import UnitState from './UnitState';
import { TeamNames } from '../types/types';

abstract class Unit {
  id: string;
  name: string;
  healthPoints: number;
  damage: number;
  initiative: number;
  image: string;
  team: TeamNames;
  teamIndex: number;
  state: UnitState;

  constructor(
    name: string,
    health: number,
    damage: number,
    initiative: number,
    image: string,
    team: TeamNames,
    teamIndex: number
  ) {
    this.id = uuidv4();
    this.name = name;
    this.healthPoints = health;
    this.damage = damage;
    this.initiative = initiative;
    this.image = image;
    this.team = team;
    this.teamIndex = teamIndex;
    this.state = new UnitState();
  }

  takeDamage(amount: number) {
    this.healthPoints -= this.state.isDefending ? amount / 2 : amount;
    if (this.healthPoints < 0) this.healthPoints = 0;
  }

  heal(amount: number) {
    this.healthPoints += amount;
  }

  setDefending(state: boolean) {
    this.state.isDefending = state;
  }

  setParalyzed(state: boolean) {
    this.state.isParalyzed = state;
  }

  abstract canAttack(target: Unit): boolean;
  abstract getActionType(): string;
}

export default Unit;
