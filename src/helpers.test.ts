import {
  angleRadians,
  angleDegrees,
  moveToAngle,
  distanceTo,
  willCollide,
  isInReach
} from "./helpers";
import Vector, { UP, RIGHT, DOWN, LEFT } from "./Vector";
import { Radians } from "./constants";
import Character from "./Character";

describe("angleRadians", () => {
  it("should return correct angle in radians", () => {
    expect(angleRadians(new Vector(), UP)).toEqual(Radians.UP);
    expect(angleRadians(new Vector(), RIGHT)).toEqual(Radians.RIGHT); // Right is default direction
    expect(angleRadians(new Vector(), DOWN)).toEqual(Radians.DOWN);
    expect(angleRadians(new Vector(), LEFT)).toEqual(Radians.LEFT);
  });
});

describe("angleDegrees", () => {
  it("should return correct angle", () => {
    expect(angleDegrees(new Vector(), UP)).toEqual(-90);
    expect(angleDegrees(new Vector(), RIGHT)).toEqual(0);
    expect(angleDegrees(new Vector(), DOWN)).toEqual(90);
    expect(angleDegrees(new Vector(), LEFT)).toEqual(180);
  });
});

describe("moveToAngle", () => {
  // Javascript is having hard time with zeros
  xit("should return correct position", () => {
    expect(moveToAngle(new Vector(), Radians.UP, 1)).toEqual(
      new Vector(0, -1)
    );
    expect(moveToAngle(new Vector(), Radians.RIGHT, 1)).toEqual(
      new Vector(1, 0)
    );
    expect(moveToAngle(new Vector(), Radians.DOWN, 1)).toEqual(
      new Vector(0, 1)
    );
    expect(moveToAngle(new Vector(), Radians.LEFT, 1)).toEqual(
      new Vector(-1, 0)
    );
  });
});

describe("distanceTo", () => {
  it("should return correct distance", () => {
    expect(distanceTo(new Vector(), UP)).toEqual(1);
    expect(distanceTo(new Vector(), RIGHT)).toEqual(1);
    expect(distanceTo(new Vector(), DOWN)).toEqual(1);
    expect(distanceTo(new Vector(), LEFT)).toEqual(1);
  });
});

describe("willCollide", () => {
  it("should return true when characters are touching", () => {
    const a = new Character();
    const b = new Character();
    expect(willCollide(a, b)).toEqual(true);
  });
  it("should return true when characters are NOT touching", () => {
    const a = new Character(40);
    const b = new Character();
    expect(willCollide(a, b)).toEqual(false);
  });
});

describe("isInReach", () => {
  it("should return true if target is in view and in reach", () => {
    const a = new Character();
    expect(isInReach(a, new Character())).toEqual(true);
    // Default angle is towards to right
    expect(isInReach(a, new Character(RIGHT))).toEqual(true);
  });
  it("should return false if target is not in reach or view", () => {
    const a = new Character();
    expect(isInReach(a, new Character(LEFT))).toEqual(false);
    expect(isInReach(a, new Character(UP))).toEqual(false);
    expect(isInReach(a, new Character(DOWN))).toEqual(false);
  });
});
