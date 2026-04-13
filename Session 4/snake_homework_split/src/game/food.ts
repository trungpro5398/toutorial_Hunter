import type { Position } from "../types/game.js";

export function spawnFood(
  width: number,
  height: number,
  snake: Position[],
): Position {
  while (true) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);

    let onSnake = false;

    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x === x && snake[i].y === y) {
        onSnake = true;
        break;
      }
    }

    if (!onSnake) {
      return { x, y };
    }
  }
}