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
  // TODO:
  // Return the next head cell after moving one step.
  // If wrap is true, crossing a border should move the head to the opposite side.
  //
  // Example:
  // getNextHead({x:9,y:2}, {dx:1,dy:0}, 10, 6, true) -> {x:0,y:2}
  throw new Error("TODO: implement getNextHead");
}

function willHitBody(nextHead, snake, ateFood) {
  // TODO:
  // Return true if nextHead collides with the body.
  // If ateFood is false, moving into the current tail cell is allowed
  // because the tail will be removed this tick.
  throw new Error("TODO: implement willHitBody");
}

function moveSnake(snake, nextHead, ateFood) {
  // TODO:
  // Add nextHead to the front of the snake.
  // If ateFood is false, remove the tail.
  // If ateFood is true, keep the tail so the snake grows by 1.
  throw new Error("TODO: implement moveSnake");
}

function spawnFood(width, height, snake) {
  // TODO:
  // Return a random {x, y} cell that is not on the snake.
  // A simple random retry loop is acceptable for this homework.
  throw new Error("TODO: implement spawnFood");
}

function computeTickMs(score) {
  // TODO:
  // Start at 200ms.
  // Every 2 points, reduce speed by 15ms.
  // Do not go below 80ms.
  throw new Error("TODO: implement computeTickMs");
}

function renderBoard(width, height, snake, food) {
  // TODO:
  // Return one multi-line string that renders the board.
  // Use:
  // - "." for empty
  // - "*" for food
  // - "@" for the head
  // - "o" for the body
  // - "#" for the border
  throw new Error("TODO: implement renderBoard");
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
