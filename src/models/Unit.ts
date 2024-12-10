import { v4 as uuidv4 } from 'uuid';

import UnitState from './UnitState';
import { ActionType, TeamNames } from '../types/types';

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

  isAlive(): boolean {
    return this.healthPoints > 0;
  }

  takeDamage(amount: number) {
    this.healthPoints -= this.state.isDefending ? amount / 2 : amount;
    if (this.healthPoints < 0) this.healthPoints = 0;
  }

  takeHealing(amount: number) {
    this.healthPoints += amount;
  }

  abstract canAttack(target: Unit): boolean;
  abstract getActionType(): ActionType;
}

export default Unit;
