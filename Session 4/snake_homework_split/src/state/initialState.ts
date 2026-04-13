import { DIR, HEIGHT, SPEED, WIDTH } from "../config/constants.js";
import type { GameState } from "../types/game.js";

export function createInitialState(): GameState {
  const startX = Math.floor(WIDTH / 2);
  const startY = Math.floor(HEIGHT / 2);

  return {
    width: WIDTH,
    height: HEIGHT,
    snake: [
      { x: startX, y: startY },
      { x: startX - 1, y: startY },
      { x: startX - 2, y: startY },
    ],
    dir: { ...DIR.RIGHT },
    pendingDir: { ...DIR.RIGHT },
    food: { x: WIDTH - 3, y: HEIGHT - 3 },
    score: 0,
    tickMs: SPEED.START_MS,
    tick: 0,
    paused: false,
    gameOver: false,
    gameOverReason: "",
    debug: false,
    lastTrace: "",
  };
}