import { GameObject } from "./types";
import Position from "./Position";

class Character implements GameObject {
  position: Position = null;
  isActive: boolean = false;
  size: number = 8 + Math.ceil(Math.random() * 10);
  target: Position = null;

  constructor(position: Position) {
    this.position = position;
    this.target = position;
  }
}

export default Character;
