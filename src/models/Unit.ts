abstract class Unit {
  name: string;
  healthPoints: number;
  damage: number;
  initiative: number;
  isDefending: boolean = false;
  isParalyzed: boolean = false;
  image: string;

  constructor(
    name: string,
    health: number,
    damage: number,
    initiative: number,
    image: string
  ) {
    this.name = name;
    this.healthPoints = health;
    this.damage = damage;
    this.initiative = initiative;
    this.image = image;
  }

  takeDamage(amount: number) {
    this.healthPoints -= this.isDefending ? amount / 2 : amount;
    if (this.healthPoints < 0) this.healthPoints = 0;
  }

  heal(amount: number) {
    this.healthPoints += amount;
  }

  setDefending(state: boolean) {
    this.isDefending = state;
  }

  setParalyzed(state: boolean) {
    this.isParalyzed = state;
  }

  abstract canAttack(target: Unit): boolean;
}

export default Unit;
