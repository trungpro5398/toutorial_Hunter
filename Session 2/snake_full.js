"use strict";

/**
 * Session 2 - Snake Console (Full Reference)
 *
 * Run:
 *   node snake_full.js
 *
 * Controls:
 *   W A S D or Arrow keys = move
 *   P = pause / resume
 *   T = toggle debug trace
 *   R = restart
 *   Q = quit
 *
 * This file is the complete reference solution.
 * It includes the in-class MVP plus the homework features.
 */

const readline = require("readline");

// ============================================================
// Configuration
// ============================================================

const WIDTH = 20;
const HEIGHT = 12;
const WRAP = true;

const SPEED = {
  START_MS: 200,
  MIN_MS: 80,
  STEP_POINTS: 2,
  STEP_DECREASE_MS: 15,
};

const CH = {
  EMPTY: ".",
  FOOD: "*",
  HEAD: "@",
  BODY: "o",
  BORDER: "#",
};

const DIR = {
  UP: { dx: 0, dy: -1 },
  DOWN: { dx: 0, dy: 1 },
  LEFT: { dx: -1, dy: 0 },
  RIGHT: { dx: 1, dy: 0 },
};

const ENABLE_ASSERTS = true;

// ============================================================
// Small helpers
// ============================================================

function samePos(a, b) {
  return !!a && !!b && a.x === b.x && a.y === b.y;
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

function createInitialState() {
  const startX = Math.floor(WIDTH / 2);
  const startY = Math.floor(HEIGHT / 2);

  const snake = [
    { x: startX, y: startY },
    { x: startX - 1, y: startY },
    { x: startX - 2, y: startY },
  ];

  const state = {
    width: WIDTH,
    height: HEIGHT,
    snake,
    dir: { ...DIR.RIGHT },
    pendingDir: { ...DIR.RIGHT },
    food: null,
    score: 0,
    tickMs: SPEED.START_MS,
    tick: 0,
    paused: false,
    gameOver: false,
    gameOverReason: "",
    debug: false,
    lastTrace: "",
  };

  state.food = spawnFood(state.width, state.height, state.snake);
  return state;
}

let state = createInitialState();

// ============================================================
// Core game functions
// ============================================================

function getNextHead(head, dir, width, height, wrap) {
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

function willHitBody(nextHead, snake, ateFood) {
  // If the snake does not eat, the tail will move away this tick.
  // That means moving into the current tail cell is allowed.
  const bodyToCheck = ateFood ? snake : snake.slice(0, snake.length - 1);
  return bodyToCheck.some((segment) => samePos(segment, nextHead));
}

function moveSnake(snake, nextHead, ateFood) {
  const nextSnake = [nextHead, ...snake];
  if (!ateFood) nextSnake.pop();
  return nextSnake;
}

function spawnFood(width, height, snake) {
  const maxAttempts = width * height * 2;

  for (let i = 0; i < maxAttempts; i += 1) {
    const candidate = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };

    if (!snake.some((segment) => samePos(segment, candidate))) {
      return candidate;
    }
  }

  // Safe fallback: scan the board if random retries fail.
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const candidate = { x, y };
      if (!snake.some((segment) => samePos(segment, candidate))) {
        return candidate;
      }
    }
  }

  // The board is full.
  return null;
}

function computeTickMs(score) {
  const steps = Math.floor(score / SPEED.STEP_POINTS);
  return Math.max(SPEED.MIN_MS, SPEED.START_MS - steps * SPEED.STEP_DECREASE_MS);
}

function assertState(currentState) {
  if (!ENABLE_ASSERTS) return;

  const seen = new Set();
  for (const segment of currentState.snake) {
    const key = `${segment.x},${segment.y}`;
    if (seen.has(key)) {
      throw new Error("ASSERT FAIL: snake contains duplicate cells");
    }
    seen.add(key);
  }

  if (currentState.food && currentState.snake.some((segment) => samePos(segment, currentState.food))) {
    throw new Error("ASSERT FAIL: food spawned on the snake");
  }

  const head = currentState.snake[0];
  const inBounds =
    head.x >= 0 &&
    head.x < currentState.width &&
    head.y >= 0 &&
    head.y < currentState.height;

  if (!inBounds) {
    throw new Error("ASSERT FAIL: head moved out of bounds");
  }
}

function buildTrace(tick, dir, head, nextHead, ateFood, nextLength, score, tickMs, hitBody) {
  return (
    `tick=${tick} dir=${dirLabel(dir)} ` +
    `head=(${head.x},${head.y}) ` +
    `next=(${nextHead.x},${nextHead.y}) ` +
    `ate=${ateFood} ` +
    `len=${nextLength} ` +
    `score=${score} ` +
    `ms=${tickMs}` +
    (hitBody ? " hitBody=true" : "")
  );
}

function renderBoard(width, height, snake, food) {
  const grid = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => CH.EMPTY)
  );

  if (food) {
    grid[food.y][food.x] = CH.FOOD;
  }

  for (let i = snake.length - 1; i >= 0; i -= 1) {
    const segment = snake[i];
    grid[segment.y][segment.x] = i === 0 ? CH.HEAD : CH.BODY;
  }

  const border = CH.BORDER.repeat(width + 2);
  const lines = [border];

  for (let y = 0; y < height; y += 1) {
    lines.push(CH.BORDER + grid[y].join("") + CH.BORDER);
  }
  
  lines.push(border);
  return lines.join("\n");
}

function renderFrame() {
  const status = state.gameOver ? "GAME OVER" : state.paused ? "PAUSED" : "RUNNING";

  const header =
    `Score: ${state.score} | Speed: ${state.tickMs}ms | Tick: ${state.tick} | ${status}\n` +
    "Controls: WASD/Arrows move | P pause | T debug | R restart | Q quit";

  const board = renderBoard(state.width, state.height, state.snake, state.food);

  const footer = [];

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

// ============================================================
// Input handling
// ============================================================

function setPendingDir(nextDir) {
  // Compare with pendingDir so quick turns in one tick still stay valid.
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
// Tick loop
// ============================================================

function updateOneTick() {
  if (state.gameOver || state.paused) {
    return;
  }

  state.tick += 1;

  // 1) Apply the player intent for this tick.
  state.dir = { ...state.pendingDir };

  const head = state.snake[0];

  // 2) Compute the next head position.
  const nextHead = getNextHead(head, state.dir, state.width, state.height, WRAP);

  // 3) Check food before body collision because it changes tail behavior.
  const ateFood = state.food ? samePos(nextHead, state.food) : false;

  // 4) Check body collision.
  const hitBody = willHitBody(nextHead, state.snake, ateFood);

  const projectedLength = state.snake.length + (ateFood ? 1 : 0);
  state.lastTrace = buildTrace(
    state.tick,
    state.dir,
    head,
    nextHead,
    ateFood,
    projectedLength,
    state.score + (ateFood ? 1 : 0),
    ateFood ? computeTickMs(state.score + 1) : state.tickMs,
    hitBody
  );

  if (hitBody) {
    state.gameOver = true;
    state.gameOverReason = "Game Over: hit body";
    return;
  }

  // 5) Move the snake.
  state.snake = moveSnake(state.snake, nextHead, ateFood);

  // 6) Update score, food, and speed after a successful eat.
  if (ateFood) {
    state.score += 1;
    state.tickMs = computeTickMs(state.score);
    state.food = spawnFood(state.width, state.height, state.snake);

    if (!state.food) {
      state.gameOver = true;
      state.gameOverReason = "Game Over: board is full";
    }
  }

  // 7) Validate the final state in development mode.
  assertState(state);
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
