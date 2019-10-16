class Position {
  x: number = 0;
  y: number = 0;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `${this.x}, ${this.y}`;
  }

  add(position: Position) {
    this.x += position.x;
    this.y += position.y;
    return this;
  }

  clone() {
    const { x, y } = this;
    return new Position(x, y);
  }

  toArray() {
    const { x, y } = this;
    return [x, y];
  }

  toObject() {
    const { x, y } = this;
    return { x, y };
  }
}

export const UP = new Position(0, -1);
export const RIGHT = new Position(1, 0);
export const DOWN = new Position(0, 1);
export const LEFT = new Position(-1, 0);
export const ZERO = new Position();

export default Position;
