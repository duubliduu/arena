import { GameObject, Position } from "./types";

class Character implements GameObject {
  position: Position = { x: 0, y: 0 };
  isActive: boolean = false;
  size: number = 8 + Math.ceil(Math.random() * 10);
  target: Position = { x: 0, y: 0 };

  constructor(position: Position) {
    this.position = position;
  }
}

export default Character;
