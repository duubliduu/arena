import {
  angleRadians,
  moveToAngle,
  distanceTo,
  willCollide,
  angleToTarget,
  calculateVelocity,
  isInReach,
  randomItem,
} from "./helpers";
import { CONE_OF_SIGHT, TOUCH_RADIUS } from "./constants";
import Character from "./Character";
import Vector, { ZERO } from "./Vector";
import CharacterFactory from "./CharacterFactory";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let frameRate = 1;
let updatedAt = +new Date();
let selectedIndex: Character = null;

const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

window.addEventListener("resize", resize);

const randomPosition = (width: number, height: number): Vector =>
  new Vector(Math.random() * width, Math.random() * height);

const characters: Character[] = CharacterFactory.create(10);

const setRandomPosition = () => {
  characters.forEach(character => {
    character.position = randomPosition(window.innerWidth, window.innerHeight);
  });
};

const setRandomTarget = () => {
  characters.forEach((character, index) => {
    character.target = randomItem<Character>(characters, index).position;
  });
};

window.addEventListener("mouseup", event => {
  const target: Vector = new Vector(event.pageX, event.pageY);
  let clickedIndex: Character = null;

  characters.forEach(character => {
    if (
      distanceTo(character.position, target) <=
      character.size + TOUCH_RADIUS
    ) {
      clickedIndex = character;
    }
  });

  if (selectedIndex && selectedIndex === clickedIndex) {
    // Deselect currently selected character
    selectedIndex = null;
  } else if (!selectedIndex && clickedIndex) {
    // Select this character
    selectedIndex = clickedIndex;
  } else if (selectedIndex && !clickedIndex) {
    // Character is selected but clicked character is not clicked
    // Create character to this point as a target
    selectedIndex.target = target;
  } else if (selectedIndex && selectedIndex !== clickedIndex) {
    // Clicked character is not selected character
    // Set clicked character as a target
    selectedIndex.target = clickedIndex.position;
  }
});

const lineTo = (from: Vector, to: Vector) => {
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
};

const drawCircle = (x = 0, y = 0, radius = 10, color = "black") => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = color;
  ctx.stroke();
};

const drawCone = (x = 0, y = 0, radius = 10, color = "black", offset = 0) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, -Math.PI / 4, Math.PI / 4);
  ctx.strokeStyle = color;
  ctx.stroke();
  lineTo(
    moveToAngle(ZERO, -Math.PI / 4, offset),
    moveToAngle(ZERO, -Math.PI / 4, radius),
  );
  lineTo(
    moveToAngle(ZERO, +Math.PI / 4, offset),
    moveToAngle(ZERO, +Math.PI / 4, radius),
  );
};

const drawCharacter = (character: Character, isActive: boolean = false) => {
  const {
    position: { x, y },
    angle,
    size,
    reach,
  } = character;

  ctx.translate(x, y);
  ctx.rotate(angle);

  // Circle
  drawCircle(0, 0, size, isActive ? "red" : "black");

  // line
  lineTo(ZERO, new Vector(size));

  if (isActive) {
    // Danger Zone
    drawCone(0, 0, reach, "red", size);
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
};

const updateVisibility = () => {
  characters.forEach(character => {
    if (!selectedIndex) {
      character.isVisible = true;
    } else if (selectedIndex !== character) {
      const difference = angleToTarget(selectedIndex, character);
      character.isVisible = difference <= CONE_OF_SIGHT / 2;
    }
  });
};

const update = () => {
  const tick = +new Date() - updatedAt;
  updatedAt = +new Date();
  frameRate = 1000 / tick; // frames per second

  if (selectedIndex && selectedIndex.hitPoints <= 0) {
    selectedIndex = null;
  }

  clearCanvas();
  updateVisibility();

  characters.forEach(character => {
    // Filter out dead characters
    if (character.hitPoints <= 0) {
      return;
    }
    const isActive: boolean = selectedIndex === character;
    const reduction = 1 / frameRate;

    // reduce cool-down if any
    if (character.coolDown > 0) {
      character.reduceCoolDown(reduction);
    }

    const distanceToTarget =
      character.target && distanceTo(character.position, character.target);
    if (distanceToTarget < 1) {
      character.target = null;
    }

    // Turn to target
    if (character.target) {
      character.angle = angleRadians(character.position, character.target);
    }

    character.velocity = calculateVelocity(character.angle, character.speed);

    let isColliding: boolean = false;
    let targetEnemy = null;

    // Resolve collision and target
    characters.forEach(enemy => {
      if (character !== enemy && enemy.hitPoints > 0) {
        // Resolve target
        if (isInReach(character, enemy) && !character.coolDown) {
          targetEnemy = enemy;
        }

        // Resolve collision
        if (willCollide(character, enemy)) {
          isColliding = true;
        }
      }
    });

    if (isColliding || targetEnemy || !character.target) {
      character.velocity = ZERO;
    }

    if (targetEnemy) {
      character.attackTarget(targetEnemy);
    }

    character.update();

    if (isActive && character.target) {
      lineTo(character.position, character.target);
    }

    if (character.isVisible) {
      drawCharacter(character, isActive);
    }
  });

  requestAnimationFrame(update);
};

setInterval(() => {
  console.log(frameRate);
}, 1000);

const init = () => {
  setRandomPosition();
  setRandomTarget();
  requestAnimationFrame(update);
};

resize();
init();
