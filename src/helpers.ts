import Position from "./Position";
import GameObject from "./GameObject";
import Character from "./Character";

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

export const calculateVelocity = (
  angle: number,
  distance: number
): Position => {
  return new Position(Math.cos(angle) * distance, Math.sin(angle) * distance);
};

export const moveToAngle = (
  position: Position,
  angle: number,
  distance: number
): Position => {
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

export const willCollide = (a: Character, b: Character): boolean => {
  const aPosition = a.position.clone().add(a.velocity);
  const bPosition = b.position.clone().add(b.velocity);
  const distance = distanceTo(aPosition, bPosition);
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
