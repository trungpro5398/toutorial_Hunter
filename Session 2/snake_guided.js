"use strict";

/**
 * Session 2 - Snake Console (Guided Live-Coding Skeleton)
 *
 * Run:
 *   node snake_guided.js
 *
 * This file is designed for teaching.
 * The structure is complete, but students should fill the TODO
 * functions in the order used during class.
 *
 * Suggested teaching order:
 * 1. getNextHead
 * 2. moveSnake
 * 3. spawnFood
 * 4. renderBoard
 * 5. willHitBody
 * 6. computeTickMs
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

  return {
    width: WIDTH,
    height: HEIGHT,
    snake,
    dir: { ...DIR.RIGHT },
    pendingDir: { ...DIR.RIGHT },
    food: { x: 15, y: 8 },
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

let state = createInitialState();

// ============================================================
// Input handling
// ============================================================

function setPendingDir(nextDir) {
  // Students should see that input changes intent, not the snake itself.
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
// TODO functions for live coding
// ============================================================

function getNextHead(head, dir, width, height, wrap) {
  // TODO:
  // 1. Compute the next x and y by adding dx and dy.
  // 2. If wrap is true, wrap the values into the board range.
  // 3. Return the new head object.
  //
  // Example:
  // head={x:9,y:2}, dir={dx:1,dy:0}, width=10 -> {x:0,y:2}
  // Default implementation is included so this guided file can run.
  // For class, students can re-implement this function step by step.
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
  // TODO:
  // If the snake does not eat, the tail will move away.
  // That means the current tail cell should not count as a collision.
  //
  // Hint:
  // const bodyToCheck = ateFood ? snake : snake.slice(0, snake.length - 1);
  // Default implementation is included so this guided file can run.
  const bodyToCheck = ateFood ? snake : snake.slice(0, snake.length - 1);
  return bodyToCheck.some((segment) => samePos(segment, nextHead));
}

function moveSnake(snake, nextHead, ateFood) {
  // TODO:
  // 1. Add nextHead to the front.
  // 2. If the snake did not eat food, remove the tail.
  // 3. Return the new snake array.
  // Default implementation is included so this guided file can run.
  const nextSnake = [nextHead, ...snake];
  if (!ateFood) {
    nextSnake.pop();
  }
  return nextSnake;
}

function spawnFood(width, height, snake) {
  // TODO:
  // Keep generating random cells until one is not on the snake.
  // Default implementation is included so this guided file can run.
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

function computeTickMs(score) {
  // TODO:
  // Every 2 points, reduce the speed by 15ms.
  // The minimum speed is 80ms.
  // Default implementation is included so this guided file can run.
  const steps = Math.floor(score / SPEED.STEP_POINTS);
  return Math.max(SPEED.MIN_MS, SPEED.START_MS - steps * SPEED.STEP_DECREASE_MS);
}

function renderBoard(width, height, snake, food) {
  // TODO:
  // 1. Build a 2D grid filled with CH.EMPTY.
  // 2. Place the food.
  // 3. Place the snake body and head.
  // 4. Add a border.
  // 5. Return one multi-line string.
  // Default implementation is included so this guided file can run.
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

// ============================================================
// Tick logic
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

  if (state.gameOver && state.gameOverReason) {
    footer.push("");
    footer.push(state.gameOverReason);
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

renderFrame();
setTimeout(loop, state.tickMs);
