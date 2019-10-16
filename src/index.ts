import {
  angleRadians,
  moveToAngle,
  distanceTo,
  isCollision,
  angleToTarget
} from "./helpers";
import { CONE_OF_SIGHT, TOUCH_RADIUS } from "./constants";
import Character from "./Character";
import Position, { ZERO } from "./Position";
import CharacterFactory from "./CharacterFactory";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

window.addEventListener("resize", resize);

const randomPosition = (): Position =>
  new Position(
    Math.random() * window.innerWidth,
    Math.random() * window.innerHeight
  );

const characters: Character[] = CharacterFactory.create(10);

const setRandomPosition = () => {
  characters.forEach(character => {
    character.position = randomPosition();
  });
};

function randomItem<T>(items: T[], currentIndex): T {
  let index = -1;
  do {
    index = Math.round(Math.random() * items.length);
  } while (index === currentIndex);
  return items[index];
}

const setRandomTarget = () => {
  characters.forEach((character, index) => {
    character.target = randomItem<Character>(characters, index);
  });
};

let selectedIndex: number = -1;

window.addEventListener("mouseup", event => {
  const target: Position = new Position(event.pageX, event.pageY);
  let clickedIndex = -1;

  characters.forEach((character, index) => {
    if (
      distanceTo(character.position, target) <=
      character.size + TOUCH_RADIUS
    ) {
      clickedIndex = index;
    }
  });

  if (selectedIndex !== -1 && selectedIndex === clickedIndex) {
    // Deselect currently selected character
    selectedIndex = -1;
  } else if (selectedIndex === -1 && clickedIndex !== -1) {
    // Select this character
    selectedIndex = clickedIndex;
  } else if (selectedIndex !== -1 && clickedIndex === -1) {
    // Character is selected but clicked character is not clicked
    // Create character to this point as a target
    characters[selectedIndex].target = new Character(target);
  } else if (selectedIndex !== -1 && selectedIndex !== clickedIndex) {
    // Clicked character is not selected character
    // Set clicked character as a target
    characters[selectedIndex].target = characters[clickedIndex];
  }
});

const lineTo = (from: Position, to: Position) => {
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
    moveToAngle(ZERO, -Math.PI / 4, radius)
  );
  lineTo(
    moveToAngle(ZERO, +Math.PI / 4, offset),
    moveToAngle(ZERO, +Math.PI / 4, radius)
  );
};

const drawCharacter = (character: Character, isActive: boolean = false) => {
  const {
    position: { x, y },
    angle,
    size,
    reach
  } = character;

  ctx.translate(x, y);
  ctx.rotate(angle);

  // Circle
  drawCircle(0, 0, size, isActive ? "red" : "black");

  // line
  lineTo(new Position(), new Position(size));

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
  characters.forEach((character, index) => {
    if (selectedIndex === -1) {
      character.isVisible = true;
    } else if (selectedIndex !== index) {
      const selectedCharacter = characters[selectedIndex];
      const difference = angleToTarget(selectedCharacter, character);
      character.isVisible = difference <= CONE_OF_SIGHT / 2;
    }
  });
};

const update = () => {
  clearCanvas();
  updateVisibility();

  characters.forEach((character, index) => {
    const isActive: boolean = selectedIndex === index;

    if (character.target) {
      character.angle = angleRadians(
        character.position,
        character.target.position
      );
      character.position = moveToAngle(
        character.position,
        character.angle,
        character.speed
      );
      if (isCollision(character, character.target)) {
        character.target = null;
      }
    }

    if (isActive && character.target) {
      lineTo(character.position, character.target.position);
    }

    if (character.isVisible) {
      drawCharacter(character, isActive);
    }
  });

  requestAnimationFrame(update);
};

const init = () => {
  setRandomPosition();
  setRandomTarget();
  requestAnimationFrame(update);
};

resize();
init();
