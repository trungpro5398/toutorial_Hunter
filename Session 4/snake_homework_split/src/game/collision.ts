import type { Position } from "../types/game.js";

export function willHitBody(
  nextHead: Position,
  snake: Position[],
  ateFood: boolean,
): boolean {
  const limit = ateFood ? snake.length : snake.length - 1;

  for (let i = 0; i < limit; i++) {
    const snakePart = snake[i];
    if (snakePart.x === nextHead.x && snakePart.y === nextHead.y) {
      return true;
    }
  }

  return false;
}