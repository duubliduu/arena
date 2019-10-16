import Position from "./Position";
import { Radians } from "./constants";
import GameObject from "./GameObject";
import { calculateVelocity } from "./helpers";

class Character extends GameObject {
  isActive: boolean = false;
  size: number = 8 + Math.ceil(Math.random() * 10);
  target: Position = null;
  coolDown: number = 0;
  arms = [
    {
      damage: 10,
      coolDown: 1, // seconds
      reach: 10
    }
  ];
  hitPoints = 30;

  get speed(): number {
    return this.size / 10;
  }

  get reach(): number {
    return this.size + this.size + this.arms[0].reach;
  }

  get damage(): number {
    return this.size + this.arms[0].damage;
  }

  reduceCoolDown(reduction: number) {
    this.coolDown -= reduction;
    if (this.coolDown < 0) {
      this.coolDown = 0;
    }
  }

  attackTarget(enemy: Character) {
    enemy.hitPoints -= this.damage;
    console.log(enemy.hitPoints);
    this.coolDown = this.arms[0].coolDown;
  }
}

export default Character;
