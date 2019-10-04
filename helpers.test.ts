import { angleRadians } from "./helpers";

describe("angleRadians", () => {
  it("should return correct angle", () => {
    expect(angleRadians({ x: 1, y: 0 }, { x: -1, y: 0 })).toEqual(Math.PI);
  });
});
