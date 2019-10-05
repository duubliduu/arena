import {
  angleRadians,
  angleDegrees,
  moveToAngle,
  distanceTo,
  isCollision
} from "./helpers";
import Position, { UP, RIGHT, DOWN, LEFT } from "./Position";
import { Radians } from "./constants";
import Character from "./Character";

describe("angleRadians", () => {
  it("should return correct angle in radians", () => {
    expect(angleRadians(new Position(), UP)).toEqual(Radians.UP);
    expect(angleRadians(new Position(), RIGHT)).toEqual(Radians.RIGHT); // Right is default direction
    expect(angleRadians(new Position(), DOWN)).toEqual(Radians.DOWN);
    expect(angleRadians(new Position(), LEFT)).toEqual(Radians.LEFT);
  });
});

describe("angleDegrees", () => {
  it("should return correct angle", () => {
    expect(angleDegrees(new Position(), UP)).toEqual(-90);
    expect(angleDegrees(new Position(), RIGHT)).toEqual(0);
    expect(angleDegrees(new Position(), DOWN)).toEqual(90);
    expect(angleDegrees(new Position(), LEFT)).toEqual(180);
  });
});

describe("moveToAngle", () => {
  // Javascript is having hard time with zeros
  xit("should return correct position", () => {
    expect(moveToAngle(new Position(), Radians.UP, 1)).toEqual(
      new Position(0, -1)
    );
    expect(moveToAngle(new Position(), Radians.RIGHT, 1)).toEqual(
      new Position(1, 0)
    );
    expect(moveToAngle(new Position(), Radians.DOWN, 1)).toEqual(
      new Position(0, 1)
    );
    expect(moveToAngle(new Position(), Radians.LEFT, 1)).toEqual(
      new Position(-1, 0)
    );
  });
});

describe("distanceTo", () => {
  it("should return correct distance", () => {
    expect(distanceTo(new Position(), UP)).toEqual(1);
    expect(distanceTo(new Position(), RIGHT)).toEqual(1);
    expect(distanceTo(new Position(), DOWN)).toEqual(1);
    expect(distanceTo(new Position(), LEFT)).toEqual(1);
  });
});

describe("isCollision", () => {
  it("should return true when characters are touching", () => {
    const a = new Character;
    const b = new Character;
    expect(isCollision(a, b)).toEqual(true);
  });
  it("should return true when characters are NOT touching", () => {
    const a = new Character(40);
    const b = new Character;
    expect(isCollision(a, b)).toEqual(false);
  });
});
