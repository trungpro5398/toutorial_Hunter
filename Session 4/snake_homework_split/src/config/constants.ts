import type { Direction } from "../types/game.js";

export const WIDTH = 20;
export const HEIGHT = 12;
export const WRAP = true;

export const CH = {
  EMPTY: ".",
  FOOD: "*",
  HEAD: "@",
  BODY: "o",
  BORDER: "#",
} as const;

export const SPEED = {
  START_MS: 200,
  MIN_MS: 80,
  STEP_POINTS: 2,
  STEP_DECREASE_MS: 15,
} as const;

export const DIR: Record<string, Direction> = {
  UP: { dx: 0, dy: -1 },
  DOWN: { dx: 0, dy: 1 },
  LEFT: { dx: -1, dy: 0 },
  RIGHT: { dx: 1, dy: 0 },
};