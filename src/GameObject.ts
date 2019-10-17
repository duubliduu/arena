import Vector, {ZERO} from "./Vector";
import { Radians } from "./constants";

class GameObject {
  position: Vector = ZERO;
  angle: number = Radians.RIGHT;
  isVisible: boolean = true;
  velocity: Vector = ZERO;

  constructor(x: number | Vector = 0, y: number = 0) {
    if (typeof x === "number") {
      this.position = new Vector(x, y);
    } else {
      this.position = x;
    }
  }

  update() {
    if (this.velocity) {
      this.position.add(this.velocity);
    }
  }
}

export default GameObject;
