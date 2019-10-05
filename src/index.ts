import { angleRadians, moveToAngle, distanceTo, isCollision } from "./helpers";
import { CIRCLE_RADIUS } from "./constants";
import Character from "./Character";
import Position from "./Position";
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

// Randomize position
characters.forEach(character => {
  character.position = randomPosition();
});

function randomItem<T>(items: T[], currentIndex): T {
  let index = -1;
  do {
    index = Math.round(Math.random() * items.length);
  } while (index === currentIndex);
  return items[index];
}

characters.forEach((character, index) => {
  character.target = randomItem<Character>(characters, index);
});

let selectedIndex: number = -1;

window.addEventListener("mouseup", event => {
  const target: Position = new Position(event.pageX, event.pageY);
  let isSelected: boolean = false;

  characters.forEach((character, index) => {
    if (
      distanceTo(character.position, target) <=
      character.size + CIRCLE_RADIUS
    ) {
      isSelected = true;
      selectedIndex = index;
    }
  });

  if (!isSelected) {
    //characters[selectedIndex].target = target;
  }
});

const lineTo = (from: Position, to: Position) => {
  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
};

const drawCircle = (
  position: Position,
  angle: number,
  active: boolean = false,
  size: number
) => {
  const { x, y } = position;

  ctx.translate(x, y);
  ctx.rotate(angle);

  // Circle
  ctx.beginPath();
  ctx.arc(0, 0, size, 0, 2 * Math.PI);
  ctx.strokeStyle = active ? "red" : "black";
  ctx.stroke();

  // line
  lineTo(new Position(), new Position(size));

  ctx.setTransform(1, 0, 0, 1, 0, 0);
};

const clearRect = () => {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); // clear canvas
};

const update = () => {
  clearRect();

  characters.forEach((character, index) => {
    const isActive = selectedIndex === index;

    if (character.target) {
      character.angle = angleRadians(
        character.position,
        character.target.position
      );
    }

    character.position = moveToAngle(
      character.position,
      character.angle,
      character.speed
    );

    characters.forEach(enemy => {
      if (enemy !== character) {
        if (isCollision(enemy, character)) {
          character.position = moveToAngle(
            character.position,
            character.angle + Math.PI,
            1
          );

          character.target = randomItem(characters, index);
        }
      }
    });

    if (isActive && character.target) {
      lineTo(character.position, character.target.position);
    }

    drawCircle(character.position, character.angle, isActive, character.size);
  });

  requestAnimationFrame(update);
};

const init = () => {
  requestAnimationFrame(update);
};

resize();
init();
