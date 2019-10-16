import { GameObject } from "./types";
import Position from "./Position";

export const angleRadians = (from: Position, to: Position): number => {
  const { x: x1, y: y1 } = from;
  const { x: x2, y: y2 } = to;
  return Math.atan2(y2 - y1, x2 - x1);
};

export const angleDegrees = (from: Position, to: Position): number => {
  const { x: x1, y: y1 } = from;
  const { x: x2, y: y2 } = to;
  return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
};

export const moveToAngle = (
  position: Position,
  angle: number,
  distance: number
) => {
  return new Position(
    position.x + Math.cos(angle) * distance,
    position.y + Math.sin(angle) * distance
  );
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

export const angleToTarget = (
  character: GameObject,
  target: GameObject
): number => {
  const angleToEnemy = angleDegrees(character.position, target.position);
  const angle = (character.angle * 180) / Math.PI;
  return 180 - Math.abs(Math.abs(angle - angleToEnemy) - 180);
};
