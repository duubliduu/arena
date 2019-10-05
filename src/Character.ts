import { GameObject } from "./types";
import Position from "./Position";

class Character implements GameObject {
  position: Position = null;
  isActive: boolean = false;
  size: number = 8 + Math.ceil(Math.random() * 10);
  target: Position = null;

  constructor(x: number | Position = 0, y: number = 0) {
    if (typeof x === "number") {
      const position = new Position(x, y);
      this.position = position;
      this.target = position;
    } else {
      this.position = x;
      this.target = x;
    }
  }
}

export default Character;
