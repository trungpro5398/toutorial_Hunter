"use strict";

/**
 * Session 2 - Snake Console (Taught So Far)
 *
 * Run:
 *   node snake_taught_so_far.js
 *
 * Controls:
 *   W A S D or Arrow keys = move
 *   P = pause / resume
 *   T = toggle debug trace
 *   R = restart
 *   Q = quit
 *
 * This file represents the classroom checkpoint after the MVP lesson.
 * It intentionally keeps the logic simpler than the full solution.
 *
 * Included here:
 * - Input -> Update -> Render loop
 * - Wrap-around movement
 * - Food and score
 * - Stable board rendering
 * - Tick trace for debugging
 *
 * Left for homework:
 * - Snake growth when food is eaten
 * - Self-collision game over
 * - Speed increase based on score
 */

const readline = require("readline");

// ============================================================
// Configuration
// ============================================================

const WIDTH = 20;
const HEIGHT = 12;
const WRAP = true;
const TICK_MS = 200;

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

function moveSnake(snake, nextHead) {
  // Classroom MVP: keep the snake length fixed.
  // Homework changes this behavior to grow on food.
  const nextSnake = [nextHead, ...snake];
  nextSnake.pop();
  return nextSnake;
}

function spawnFood(width, height, snake) {
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
    tickMs: TICK_MS,
    tick: 0,
    paused: false,
    gameOver: false,
    debug: false,
    lastTrace: "",
  };
}

let state = createInitialState();

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

function updateOneTick() {
  if (state.gameOver || state.paused) {
    return;
  }

  state.tick += 1;

  // 1) Apply the latest valid direction request.
  state.dir = { ...state.pendingDir };

  const head = state.snake[0];

  // 2) Compute the next head position.
  const nextHead = getNextHead(head, state.dir, state.width, state.height, WRAP);

  // 3) Move the snake. In the MVP checkpoint, length stays fixed.
  state.snake = moveSnake(state.snake, nextHead);

  // 4) Food and score are basic in the taught version.
  const ateFood = samePos(nextHead, state.food);
  if (ateFood) {
    state.score += 1;
    state.food = spawnFood(state.width, state.height, state.snake);
  }

  // 5) Save a readable trace line for debugging.
  state.lastTrace =
    `tick=${state.tick} dir=${dirLabel(state.dir)} ` +
    `head=(${head.x},${head.y}) ` +
    `next=(${nextHead.x},${nextHead.y}) ` +
    `ate=${ateFood} ` +
    `len=${state.snake.length} ` +
    `score=${state.score} ` +
    `ms=${state.tickMs}`;
}

function renderFrame() {
  const status = state.paused ? "PAUSED" : "RUNNING";
  const header =
    `Score: ${state.score} | Speed: ${state.tickMs}ms | Tick: ${state.tick} | ${status}\n` +
    "Controls: WASD/Arrows move | P pause | T debug | R restart | Q quit";

  const board = renderBoard(state.width, state.height, state.snake, state.food);
  const footer = [];

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
