import Position from "./Position";

export interface GameObject {
  position: Position;
  isActive: boolean;
  size: number;
  target: Position;
}
