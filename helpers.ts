import { GameObject, Position } from "./types";

export const angleRadians = (from: Position, to: Position) => {
  const { x: x1, y: y1 } = from;
  const { x: x2, y: y2 } = to;
  return Math.atan2(y2 - y1, x2 - x1);
};

export const angleDegrees = (from, to) => {
  const [x1, y1] = from;
  const [x2, y2] = to;
  return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
};

export const moveToAngle = (
  position: Position,
  angle: number,
  distance: number
) => {
  return {
    x: position.x + Math.cos(angle) * distance,
    y: position.y + Math.sin(angle) * distance
  };
};

export const distanceTo = (from: Position, to: Position) => {
  const a = from.x - to.x;
  const b = from.y - to.y;

  return Math.sqrt(a * a + b * b);
};

export const isCollision = (a: GameObject, b: GameObject): boolean => {
  const distance = distanceTo(a.position, b.position);
  return distance <= a.size + b.size;
};
