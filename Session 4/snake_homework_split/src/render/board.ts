import { CH } from "../config/constants.js";
import type { Position } from "../types/game.js";

export function renderBoard(
  width: number,
  height: number,
  snake: Position[],
  food: Position,
): string {
  const grid = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => CH.EMPTY),
  );

  grid[food.y][food.x] = CH.FOOD;

  for (let i = snake.length - 1; i >= 0; i -= 1) {
    const segment = snake[i];
    grid[segment.y][segment.x] = i === 0 ? CH.HEAD : CH.BODY;
  }

  const border = CH.BORDER.repeat(width + 2);
  const lines: string[] = [border];

  for (let y = 0; y < height; y += 1) {
    lines.push(CH.BORDER + grid[y].join("") + CH.BORDER);
  }

  lines.push(border);
  return lines.join("\n");
}