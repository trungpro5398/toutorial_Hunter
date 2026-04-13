import { WRAP } from "./config/constants.js";
import { willHitBody } from "./game/collision.js";
import { spawnFood } from "./game/food.js";
import { getNextHead, moveSnake } from "./game/movement.js";
import { computeTickMs } from "./game/speed.js";
import { setupControls } from "./input/controls.js";
import { renderBoard } from "./render/board.js";
import { createInitialState } from "./state/initialState.js";
import type { GameState } from "./types/game.js";
import { dirLabel, samePos } from "./utils/helpers.js";

let state: GameState = createInitialState();

function resetGame(): void {
  state = createInitialState();
}

function exitGame(code: number): void {
  if (process.stdin.isTTY) {
    process.stdin.setRawMode?.(false);
  }
  process.exit(code);
}

setupControls(
  () => state,
  resetGame,
  exitGame,
);

function updateOneTick(): void {
  if (state.gameOver || state.paused) {
    return;
  }

  state.tick += 1;
  state.dir = { ...state.pendingDir };

  const head = state.snake[0];

  const nextHead = getNextHead(
    head,
    state.dir,
    state.width,
    state.height,
    WRAP,
  );

  const ateFood = samePos(nextHead, state.food);
  const hitBody = willHitBody(nextHead, state.snake, ateFood);

  if (hitBody) {
    state.gameOver = true;
    state.gameOverReason = "Game Over: hit body ૮(˶ㅠ︿ㅠ)ა";
    state.lastTrace =
      `tick=${state.tick} dir=${dirLabel(state.dir)} ` +
      `head=(${head.x},${head.y}) next=(${nextHead.x},${nextHead.y}) hitBody=true`;
    return;
  }

  state.snake = moveSnake(state.snake, nextHead, ateFood);

  if (ateFood) {
    state.score += 1;
    state.tickMs = computeTickMs(state.score);
    state.food = spawnFood(state.width, state.height, state.snake);
  }

  state.lastTrace =
    `tick=${state.tick} dir=${dirLabel(state.dir)} ` +
    `head=(${head.x},${head.y}) next=(${nextHead.x},${nextHead.y}) ` +
    `ate=${ateFood} len=${state.snake.length} score=${state.score} ms=${state.tickMs}`;
}

function renderFrame(): void {
  const status = state.gameOver
    ? "GAME OVER"
    : state.paused
      ? "PAUSED"
      : "RUNNING";

  const header =
    `Score: ${state.score} | Speed: ${state.tickMs}ms | Tick: ${state.tick} | ${status}\n` +
    "Controls: WASD/Arrows move | P pause | T debug | R restart | Q quit";

  const board = renderBoard(state.width, state.height, state.snake, state.food);
  const footer: string[] = [];

  if (state.gameOver && state.gameOverReason) {
    footer.push("");
    footer.push(state.gameOverReason);
    footer.push("Press R to restart or Q to quit.");
  }

  if (state.debug && state.lastTrace) {
    footer.push("");
    footer.push("Trace: " + state.lastTrace);
  }

  console.clear();
  console.log([header, board, ...footer].join("\n"));
}

function loop(): void {
  updateOneTick();
  renderFrame();
  setTimeout(loop, state.tickMs);
}

renderFrame();
setTimeout(loop, state.tickMs);