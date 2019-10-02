import { angleRadians, moveToAngle, distanceTo, isCollision } from "./helpers";
import { CIRCLE_RADIUS, VELOCITY } from "./constants";
import { GameObject, Position } from "./types";
import Character from "./Character";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

window.addEventListener("resize", resize);

const randomPosition = (): Position => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight
});

const characters: GameObject[] = [];
let selectedIndex: number = -1;

window.addEventListener("mouseup", event => {
  const target: Position = { x: event.pageX, y: event.pageY };
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
    characters[selectedIndex].target = target;
  }
});

const init = () => {
  for (let i = 0; i < 10; i++) {
    const character = new Character(randomPosition());
    character.target = randomPosition();
    characters.push(character);
  }
  requestAnimationFrame(update);
};

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
  size: number,
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
  lineTo({ x: 0, y: 0 }, { x: size, y: 0 });

  ctx.setTransform(1, 0, 0, 1, 0, 0);
};

const clearRect = () => {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight); // clear canvas
};

const update = () => {
  clearRect();

  characters.forEach((character, index) => {
    const angle = angleRadians(character.position, character.target);
    const isActive = selectedIndex === index;

    if (distanceTo(character.position, character.target) <= character.size) {
      character.target = randomPosition();
    } else {
      character.position = moveToAngle(character.position, angle, character.size/ 10);
    }

    characters.forEach(enemy => {
      if (enemy !== character) {
        if (isCollision(enemy, character)) {
          character.position = moveToAngle(
            character.position,
            angle + Math.PI,
            1
          );
          character.target = randomPosition();
        }
      }
    });

    if (isActive) {
      lineTo(character.position, character.target);
    }

    drawCircle(character.position, angle, isActive, character.size);
  });

  requestAnimationFrame(update);
};

resize();
init();
