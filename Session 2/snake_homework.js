"use strict";

/**
 * Session 2 - Snake Homeworks (Progressive Exercise Game)
 *
 * Run:
 *   node snake_homeworks.js
 *
 * Goal:
 * - The board, snake, food, input handling, and rendering are already provided.
 * - Students only need to implement the core game logic functions.
 * - If a function is still TODO, that feature is simply skipped.
 * - No hidden fallback logic is used.
 *
 * This makes the exercise clearer:
 * - Students can always run the file.
 * - The game always renders.
 * - Features activate only when the student implements them.
 *
 * Suggested student order:
 * 1. getNextHead
 * 2. moveSnake
 * 3. willHitBody
 * 4. spawnFood
 * 5. computeTickMs
 */

const readline = require("readline");

// ============================================================
// Configuration
// ============================================================

const WIDTH = 20;
const HEIGHT = 12;
const WRAP = true;

const CH = {
  EMPTY: ".",
  FOOD: "*",
  HEAD: "@",
  BODY: "o",
  BORDER: "#",
};

const SPEED = {
  START_MS: 200,
  MIN_MS: 80,
  STEP_POINTS: 2,
  STEP_DECREASE_MS: 15,
};

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

function isTodoError(error) {
  return error instanceof Error && error.message.startsWith("TODO:");
}

// Keep track of which features are still incomplete.
const pendingFeatures = new Set();

function tryStudentFunction(name, fn, args) {
  try {
    const value = fn(...args);
    pendingFeatures.delete(name);
    return { ok: true, value };
  } catch (error) {
    if (isTodoError(error)) {
      pendingFeatures.add(name);
      return { ok: false, value: null };
    }

    throw error;
  }
}

// ============================================================
// Student functions (TODO)
// ============================================================

function getNextHead(head, dir, width, height, wrap) {
  // TODO:
  // Return the next head cell after moving one step.
  // If wrap is true, crossing a border should move the head to the opposite side.
  //
  // Example:
  // getNextHead({x:9,y:2}, {dx:1,dy:0}, 10, 6, true) -> {x:0,y:2}
  
  //throw new Error("TODO: implement getNextHead");

  let dX = head.x + dir.dx;
  let dY = head.y + dir.dy;

    if (wrap) {
      if (dX >= width) dX = 0;
      if (dX < 0) dX = width - 1;

      if (dY >= height) dY = 0;
      if (dY < 0) dY = height - 1;
  } 
  /* else {
    if (dX >= width || dX < 0) {
      return -1;
    } else if (dY >= width || dY < 0) {
      return -1;
    }
  } */

  return { x: dX, y: dY };
}

function moveSnake(snake, nextHead, ateFood) {
  // TODO:
  // Add nextHead to the front.
  // If ateFood is false, remove the tail.
  // If ateFood is true, keep the tail so the snake grows.


  const newSnake = [nextHead, ...snake];

  if (!ateFood) {
    newSnake.pop();
  }

  return newSnake;
  throw new Error("TODO: implement moveSnake");
}

function willHitBody(nextHead, snake, ateFood) {
  
  let limit;

  // Check whether snake ate food therefore extended itself
  if (ateFood) {
    limit = snake.length;
  } else {
    limit = snake.length - 1;
  }

    // Check throughout snake body whether next head position will hit a body  
  for (let i = 0; i < limit; i++) {
    const snake_part = snake[i];
    if (snake_part.x === nextHead.x && snake_part.y === nextHead.y) {
      return true;
    }
  }

  return false;
}

function spawnFood(width, height, snake) {
  // TODO:
  // Return a random {x, y} cell that is not on the snake.

  while (true) {

    // Find random coordinates based on board dimensions
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);

    let onSnake = false;

    // For entire snake, check whether random coordinates are on snake body
    // Breaks if coordinates are on snake, otherwise returns coordinates as new food position
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].x === x && snake[i].y === y) {
        onSnake = true;
        break;
      }
    }

    if (!onSnake) {
      return { x: x, y: y };
    }

  }

  throw new Error("TODO: implement spawnFood");
}

function computeTickMs(score) {
  // TODO:
  // Start at 200ms.
  // Every 2 points, reduce speed by 15ms.
  // Do not go below 80ms.

  const steps = Math.floor(score / 2);
  let speed = 200 - steps * 15;

  if (speed < 80) {
    speed =  80;
  }

  return speed;


  throw new Error("TODO: implement computeTickMs");
}

// ============================================================
// Provided rendering (already complete)
// ============================================================

function renderBoard(width, height, snake, food) {
  const grid = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => CH.EMPTY),
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
// State
// ============================================================

function createInitialState() {
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
    // Food is provided up front so the game can render immediately.
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
  pendingFeatures.clear();
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
// Update loop
// ============================================================

function updateOneTick() {
  if (state.gameOver || state.paused) {
    return;
  }

  state.tick += 1;
  state.dir = { ...state.pendingDir };

  const head = state.snake[0];

  // Step 1: Movement begins only when getNextHead is implemented.
  const nextHeadResult = tryStudentFunction("getNextHead", getNextHead, [
    head,
    state.dir,
    state.width,
    state.height,
    WRAP,
  ]);

  if (!nextHeadResult.ok) {
    state.lastTrace =
      `tick=${state.tick} dir=${dirLabel(state.dir)} ` +
      "movement skipped (getNextHead is still TODO)";
    return;
  }

  const nextHead = nextHeadResult.value;
  const ateFood = samePos(nextHead, state.food);

  // Step 2: Collision is optional until the student implements it.
  let hitBody = false;
  const hitBodyResult = tryStudentFunction("willHitBody", willHitBody, [
    nextHead,
    state.snake,
    ateFood,
  ]);

  if (hitBodyResult.ok) {
    hitBody = hitBodyResult.value;
  }

  if (hitBody) {
    state.gameOver = true;
    state.gameOverReason = "Game Over: hit body ૮(˶ㅠ︿ㅠ)ა";
    state.lastTrace =
      `tick=${state.tick} dir=${dirLabel(state.dir)} ` +
      `head=(${head.x},${head.y}) next=(${nextHead.x},${nextHead.y}) hitBody=true`;
    return;
  }

  // Step 3: The snake only moves once moveSnake is implemented.
  const moveResult = tryStudentFunction("moveSnake", moveSnake, [
    state.snake,
    nextHead,
    ateFood,
  ]);

  if (!moveResult.ok) {
    state.lastTrace =
      `tick=${state.tick} dir=${dirLabel(state.dir)} ` +
      `head=(${head.x},${head.y}) next=(${nextHead.x},${nextHead.y}) ` +
      "movement skipped (moveSnake is still TODO)";
    return;
  }

  state.snake = moveResult.value;

  // Step 4: Food / score can still work even if later features are incomplete.
  if (ateFood) {
    state.score += 1;

    // Speed update is optional until implemented.
    const speedResult = tryStudentFunction("computeTickMs", computeTickMs, [
      state.score,
    ]);
    if (speedResult.ok) {
      state.tickMs = speedResult.value;
    }

    // Food respawn is optional until implemented.
    const foodResult = tryStudentFunction("spawnFood", spawnFood, [
      state.width,
      state.height,
      state.snake,
    ]);

    if (foodResult.ok) {
      state.food = foodResult.value;
    }
  }

  state.lastTrace =
    `tick=${state.tick} dir=${dirLabel(state.dir)} ` +
    `head=(${head.x},${head.y}) next=(${nextHead.x},${nextHead.y}) ` +
    `ate=${ateFood} len=${state.snake.length} score=${state.score} ms=${state.tickMs}`;
}

// ============================================================
// Render
// ============================================================

function renderFrame() {
  const status = state.gameOver
    ? "GAME OVER"
    : state.paused
      ? "PAUSED"
      : "RUNNING";

  const header =
    `Score: ${state.score} | Speed: ${state.tickMs}ms | Tick: ${state.tick} | ${status}\n` +
    "Controls: WASD/Arrows move | P pause | T debug | R restart | Q quit";

  const board = renderBoard(state.width, state.height, state.snake, state.food);
  const footer = [];

  if (pendingFeatures.size > 0) {
    footer.push("");
    footer.push(
      "TODO features still inactive: " + Array.from(pendingFeatures).join(", "),
    );
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
