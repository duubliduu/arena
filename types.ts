// TODO: rename to Vector also use real Vector library
export type Position = { x: number; y: number };

export interface GameObject {
  position: Position;
  isActive: boolean;
  size: number;
  target: Position;
}
