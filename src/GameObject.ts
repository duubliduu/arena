import Position, {ZERO} from "./Position";
import { Radians } from "./constants";

class GameObject {
  position: Position = ZERO;
  angle: number = Radians.RIGHT;
  isVisible: boolean = true;
  velocity: Position = ZERO;

  constructor(x: number | Position = 0, y: number = 0) {
    if (typeof x === "number") {
      this.position = new Position(x, y);
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
