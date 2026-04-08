import type { Direction, Position } from "../types/snake";

export const BOARD_SIZE = 18;
export const GAME_SPEED_MS = 135;
export const BEST_SCORE_STORAGE_KEY = "react-projects-lab:snake-best-score";

export const INITIAL_DIRECTION: Direction = "right";

export const INITIAL_SNAKE: Position[] = [
  { row: 8, col: 6 },
  { row: 8, col: 5 },
  { row: 8, col: 4 },
];
