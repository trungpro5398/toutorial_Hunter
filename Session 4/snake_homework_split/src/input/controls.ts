import readline from "node:readline";
import { DIR } from "../config/constants.js";
import { isOpposite } from "../utils/helpers.js";
import type { GameState, Direction } from "../types/game.js";

type ExitFn = (code: number) => void;
type ResetFn = () => void;
type GetStateFn = () => GameState;

function setPendingDir(state: GameState, nextDir: Direction): void {
  if (!isOpposite(nextDir, state.pendingDir)) {
    state.pendingDir = { ...nextDir };
  }
}

export function setupControls(
  getState: GetStateFn,
  resetGame: ResetFn,
  exitGame: ExitFn,
): void {
  readline.emitKeypressEvents(process.stdin);

  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }

  process.stdin.on("keypress", (_, key) => {
    const state = getState();

    if (key && key.ctrl && key.name === "c") {
      exitGame(0);
      return;
    }

    const name = (key?.name || "").toLowerCase();

    if (name === "q") return exitGame(0);
    if (name === "p") {
      state.paused = !state.paused;
      return;
    }
    if (name === "t") {
      state.debug = !state.debug;
      return;
    }
    if (name === "r") {
      resetGame();
      return;
    }

    if (name === "w" || name === "up") return setPendingDir(state, DIR.UP);
    if (name === "s" || name === "down") return setPendingDir(state, DIR.DOWN);
    if (name === "a" || name === "left") return setPendingDir(state, DIR.LEFT);
    if (name === "d" || name === "right") return setPendingDir(state, DIR.RIGHT);
  });
}