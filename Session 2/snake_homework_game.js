"use strict";

/**
 * Session 2 - Homework Playable Runner
 *
 * Run:
 *   node snake_homework_game.js
 *
 * Purpose:
 * - Let students play the game while working on homework.
 * - Use the student's functions from `snake_homework.js` whenever possible.
 * - If a function is still TODO, temporarily fall back to a built-in version.
 *
 * Important:
 * - TODO functions fall back automatically so the game keeps running.
 * - Real implementation bugs still throw normally, so students can debug them.
 */

const readline = require("readline");
const homework = require("./snake_homework");

// ============================================================
// Configuration
// ============================================================

const WIDTH = 20;
const HEIGHT = 12;
const WRAP = true;

const DIR = {
  UP: { dx: 0, dy: -1 },
  DOWN: { dx: 0, dy: 1 },
  LEFT: { dx: -1, dy: 0 },
  RIGHT: { dx: 1, dy: 0 },
};

// ============================================================
// Helpers
// ============================================================

function samePos(a, b) {
  return homework.samePos(a, b);
}

function isOpposite(a, b) {
  return a.dx === -b.dx && a.dy === -b.dy;
}

function dirLabel(dir) {
  if (dir.dx === 1 && dir.dy === 0) return "R";
  if (dir.dx === -1 && dir.dy === 0) return "L";
  if (dir.dx === 0 && dir.dy === -1) return "U";
  if (dir.dx === 0 && dir.dy === 1) return "D";
  return "?";
}

function isTodoError(error) {
  return error instanceof Error && error.message.startsWith("TODO:");
}

// Track which functions are still using fallback implementations.
const fallbackActive = new Set();

function callHomeworkFunction(name, fallback, args) {
  try {
    const result = homework[name](...args);
    fallbackActive.delete(name);
    return result;
  } catch (error) {
    if (!isTodoError(error)) {
      throw error;
    }

    fallbackActive.add(name);
    return fallback(...args);
  }
}

// ============================================================
// Built-in fallbacks (used only while the student still has TODOs)
// ============================================================

function fallbackGetNextHead(head, dir, width, height, wrap) {
  let nextX = head.x + dir.dx;
  let nextY = head.y + dir.dy;

  if (wrap) {
    if (nextX < 0) nextX = width - 1;
    else if (nextX >= width) nextX = 0;

    if (nextY < 0) nextY = height - 1;
    else if (nextY >= height) nextY = 0;
  }

  return { x: nextX, y: nextY };
}

function fallbackWillHitBody(nextHead, snake, ateFood) {
  const bodyToCheck = ateFood ? snake : snake.slice(0, snake.length - 1);
  return bodyToCheck.some((segment) => samePos(segment, nextHead));
}

function fallbackMoveSnake(snake, nextHead, ateFood) {
  const nextSnake = [nextHead, ...snake];
  if (!ateFood) {
    nextSnake.pop();
  }
  return nextSnake;
}

function fallbackSpawnFood(width, height, snake) {
  while (true) {
    const candidate = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };

    if (!snake.some((segment) => samePos(segment, candidate))) {
      return candidate;
    }
  }
}

function fallbackComputeTickMs(score) {
  const steps = Math.floor(score / homework.SPEED.STEP_POINTS);
  return Math.max(
    homework.SPEED.MIN_MS,
    homework.SPEED.START_MS - steps * homework.SPEED.STEP_DECREASE_MS
  );
}

function fallbackRenderBoard(width, height, snake, food) {
  const grid = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => homework.CH.EMPTY)
  );

  if (food) {
    grid[food.y][food.x] = homework.CH.FOOD;
  }

  for (let i = snake.length - 1; i >= 0; i -= 1) {
    const segment = snake[i];
    grid[segment.y][segment.x] = i === 0 ? homework.CH.HEAD : homework.CH.BODY;
  }

  const border = homework.CH.BORDER.repeat(width + 2);
  const lines = [border];

  for (let y = 0; y < height; y += 1) {
    lines.push(homework.CH.BORDER + grid[y].join("") + homework.CH.BORDER);
  }

  lines.push(border);
  return lines.join("\n");
}

// ============================================================
// Homework function wrappers
// ============================================================

function getNextHead(head, dir, width, height, wrap) {
  return callHomeworkFunction("getNextHead", fallbackGetNextHead, [head, dir, width, height, wrap]);
}

function willHitBody(nextHead, snake, ateFood) {
  return callHomeworkFunction("willHitBody", fallbackWillHitBody, [nextHead, snake, ateFood]);
}

function moveSnake(snake, nextHead, ateFood) {
  return callHomeworkFunction("moveSnake", fallbackMoveSnake, [snake, nextHead, ateFood]);
}

function spawnFood(width, height, snake) {
  return callHomeworkFunction("spawnFood", fallbackSpawnFood, [width, height, snake]);
}

function computeTickMs(score) {
  return callHomeworkFunction("computeTickMs", fallbackComputeTickMs, [score]);
}

function renderBoard(width, height, snake, food) {
  return callHomeworkFunction("renderBoard", fallbackRenderBoard, [width, height, snake, food]);
}

// ============================================================
// Game state
// ============================================================

function createInitialState() {
  const startX = Math.floor(WIDTH / 2);
  const startY = Math.floor(HEIGHT / 2);

  const snake = [
    { x: startX, y: startY },
    { x: startX - 1, y: startY },
    { x: startX - 2, y: startY },
  ];

  return {
    width: WIDTH,
    height: HEIGHT,
    snake,
    dir: { ...DIR.RIGHT },
    pendingDir: { ...DIR.RIGHT },
    food: spawnFood(WIDTH, HEIGHT, snake),
    score: 0,
    tickMs: homework.SPEED.START_MS,
    tick: 0,
    paused: false,
    gameOver: false,
    gameOverReason: "",
    debug: false,
    lastTrace: "",
  };
}

let state = createInitialState();

// ============================================================
// Input
// ============================================================

function setPendingDir(nextDir) {
  if (!isOpposite(nextDir, state.pendingDir)) {
    state.pendingDir = { ...nextDir };
  }
}

function resetGame() {
  state = createInitialState();
}

function exitGame(code) {
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(false);
  }
  process.exit(code);
}

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

process.stdin.on("keypress", (str, key) => {
  if (key && key.ctrl && key.name === "c") {
    exitGame(0);
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

  if (name === "w" || name === "up") return setPendingDir(DIR.UP);
  if (name === "s" || name === "down") return setPendingDir(DIR.DOWN);
  if (name === "a" || name === "left") return setPendingDir(DIR.LEFT);
  if (name === "d" || name === "right") return setPendingDir(DIR.RIGHT);
});

// ============================================================
// Update + render
// ============================================================

function updateOneTick() {
  if (state.gameOver || state.paused) {
    return;
  }

  state.tick += 1;
  state.dir = { ...state.pendingDir };

  const head = state.snake[0];
  const nextHead = getNextHead(head, state.dir, state.width, state.height, WRAP);
  const ateFood = state.food ? samePos(nextHead, state.food) : false;
  const hitBody = willHitBody(nextHead, state.snake, ateFood);

  state.lastTrace =
    `tick=${state.tick} dir=${dirLabel(state.dir)} ` +
    `head=(${head.x},${head.y}) ` +
    `next=(${nextHead.x},${nextHead.y}) ` +
    `ate=${ateFood} ` +
    `len=${state.snake.length + (ateFood ? 1 : 0)} ` +
    `score=${state.score + (ateFood ? 1 : 0)} ` +
    `ms=${ateFood ? computeTickMs(state.score + 1) : state.tickMs}` +
    (hitBody ? " hitBody=true" : "");

  if (hitBody) {
    state.gameOver = true;
    state.gameOverReason = "Game Over: hit body";
    return;
  }

  state.snake = moveSnake(state.snake, nextHead, ateFood);

  if (ateFood) {
    state.score += 1;
    state.tickMs = computeTickMs(state.score);
    state.food = spawnFood(state.width, state.height, state.snake);
  }
}

function renderFrame() {
  const status = state.gameOver ? "GAME OVER" : state.paused ? "PAUSED" : "RUNNING";

  const header =
    `Score: ${state.score} | Speed: ${state.tickMs}ms | Tick: ${state.tick} | ${status}\n` +
    "Controls: WASD/Arrows move | P pause | T debug | R restart | Q quit";

  const board = renderBoard(state.width, state.height, state.snake, state.food);
  const footer = [];

  if (fallbackActive.size > 0) {
    footer.push("");
    footer.push("Fallback active for TODO functions: " + Array.from(fallbackActive).join(", "));
  }

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

function loop() {
  updateOneTick();
  renderFrame();
  setTimeout(loop, state.tickMs);
}

// ============================================================
// Start
// ============================================================

renderFrame();
setTimeout(loop, state.tickMs);
