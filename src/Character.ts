import { GameObject } from "./types";
import Position from "./Position";
import { Radians } from "./constants";

class Character implements GameObject {
  position: Position = null;
  isActive: boolean = false;
  size: number = 8 + Math.ceil(Math.random() * 10);
  target: Character = null;
  angle: number;
  isVisible: boolean = true;

  constructor(x: number | Position = 0, y: number = 0) {
    if (typeof x === "number") {
      this.position = new Position(x, y);
    } else {
      this.position = x;
    }
    this.angle = Radians.RIGHT;
  }

  get speed(): number {
    return this.size / 10;
  }

  get reach(): number {
    return this.size * 2;
  }
}

export default Character;
