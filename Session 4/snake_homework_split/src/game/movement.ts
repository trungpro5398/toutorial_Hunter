import type { Direction, Position } from "../types/game.js";

export function getNextHead(
  head: Position,
  dir: Direction,
  width: number,
  height: number,
  wrap: boolean,
): Position {
  let dX = head.x + dir.dx;
  let dY = head.y + dir.dy;

  if (wrap) {
    if (dX >= width) dX = 0;
    if (dX < 0) dX = width - 1;

    if (dY >= height) dY = 0;
    if (dY < 0) dY = height - 1;
  }

  return { x: dX, y: dY };
}

export function moveSnake(
  snake: Position[],
  nextHead: Position,
  ateFood: boolean,
): Position[] {
  const newSnake = [nextHead, ...snake];

  if (!ateFood) {
    newSnake.pop();
  }

  return newSnake;
}