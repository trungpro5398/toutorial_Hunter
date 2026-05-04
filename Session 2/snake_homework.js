"use strict";

/**
 * Session 2 - Homework Function Worksheet
 *
 * This file contains only the core functions that students should
 * complete for homework.
 *
 * Design goal:
 * - Keep helper constants and helper functions visible.
 * - Hide only the logic that students must implement.
 * - Let students edit one focused file.
 *
 * This file is intentionally not a full runnable game.
 * Students should implement these functions, then run:
 *
 *   node snake_homework_test.js
 *
 * That test file is designed to keep running even when some functions
 * still throw TODO errors, so students can implement and verify one
 * function at a time.
 *
 * Students can also run:
 *
 *   node snake_homework_game.js
 *
 * That file runs the real game. If a homework function is still TODO,
 * the game temporarily uses a built-in fallback for that specific function
 * so the game can still render and run while the student is progressing.
 */

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

function samePos(a, b) {
  return !!a && !!b && a.x === b.x && a.y === b.y;
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

function willHitBody(nextHead, snake, ateFood) {
  const bodyToCheck = ateFood ? snake : snake.slice(0, snake.length - 1);
  return bodyToCheck.some((segment) => samePos(segment, nextHead));
}

function moveSnake(snake, nextHead, ateFood) {
  const nextSnake = [nextHead, ...snake];

  if (!ateFood) {
    nextSnake.pop();
  }

  return nextSnake;
}

function spawnFood(width, height, snake) {
  if (snake.length >= width * height) {
    throw new Error("Cannot spawn food: board is full.");
  }

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
  const steps = Math.floor(score / SPEED.STEP_POINTS);
  return Math.max(
    SPEED.MIN_MS,
    SPEED.START_MS - steps * SPEED.STEP_DECREASE_MS
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

module.exports = {
  CH,
  SPEED,
  samePos,
  getNextHead,
  willHitBody,
  moveSnake,
  spawnFood,
  computeTickMs,
  renderBoard,
};
