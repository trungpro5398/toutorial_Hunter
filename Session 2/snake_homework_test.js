"use strict";

/**
 * Session 2 - Homework Test Runner
 *
 * Run:
 *   node snake_homework_test.js
 *
 * Students should edit `snake_homework.js`.
 * This test runner will continue even if some functions are not finished yet.
 * That makes it suitable for step-by-step homework progress.
 */

const homework = require("./snake_homework");

let total = 0;
let passed = 0;
let failed = 0;
let todo = 0;

function logDivider() {
  console.log("-".repeat(72));
}

function isTodoError(error) {
  return error instanceof Error && error.message.startsWith("TODO:");
}

function sameJson(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function assertDeepEqual(actual, expected, label) {
  if (!sameJson(actual, expected)) {
    throw new Error(
      `${label}\nExpected: ${JSON.stringify(expected)}\nActual:   ${JSON.stringify(actual)}`
    );
  }
}

function assertTrue(condition, label) {
  if (!condition) {
    throw new Error(label);
  }
}

function runCase(name, fn) {
  total += 1;

  try {
    fn();
    passed += 1;
    console.log(`PASS  ${name}`);
  } catch (error) {
    if (isTodoError(error)) {
      todo += 1;
      console.log(`TODO  ${name} -> ${error.message}`);
    } else {
      failed += 1;
      console.log(`FAIL  ${name}`);
      console.log("      " + error.message.replace(/\n/g, "\n      "));
    }
  }
}

function withMockedRandom(sequence, fn) {
  const originalRandom = Math.random;
  let index = 0;

  Math.random = function mockedRandom() {
    const value = sequence[index];
    index += 1;

    if (typeof value !== "number") {
      return 0;
    }

    return value;
  };

  try {
    return fn();
  } finally {
    Math.random = originalRandom;
  }
}

function runGetNextHeadTests() {
  logDivider();
  console.log("getNextHead");
  logDivider();

  runCase("basic move to the right", () => {
    const actual = homework.getNextHead(
      { x: 4, y: 2 },
      { dx: 1, dy: 0 },
      10,
      6,
      true
    );

    assertDeepEqual(actual, { x: 5, y: 2 }, "Head should move right by 1.");
  });

  runCase("wrap across the right edge", () => {
    const actual = homework.getNextHead(
      { x: 9, y: 2 },
      { dx: 1, dy: 0 },
      10,
      6,
      true
    );

    assertDeepEqual(actual, { x: 0, y: 2 }, "Head should wrap from x=9 to x=0.");
  });

  runCase("wrap across the top edge", () => {
    const actual = homework.getNextHead(
      { x: 3, y: 0 },
      { dx: 0, dy: -1 },
      10,
      6,
      true
    );

    assertDeepEqual(actual, { x: 3, y: 5 }, "Head should wrap from y=0 to y=5.");
  });
}

function runWillHitBodyTests() {
  logDivider();
  console.log("willHitBody");
  logDivider();

  runCase("detect clear body collision", () => {
    const snake = [
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 1, y: 3 },
    ];

    const actual = homework.willHitBody({ x: 1, y: 2 }, snake, true);
    assertTrue(actual === true, "Expected collision with the body.");
  });

  runCase("allow moving into the tail when not eating", () => {
    const snake = [
      { x: 3, y: 2 },
      { x: 2, y: 2 },
      { x: 2, y: 3 },
    ];

    const actual = homework.willHitBody({ x: 2, y: 3 }, snake, false);
    assertTrue(actual === false, "Tail cell should be allowed when the snake does not eat.");
  });
}

function runMoveSnakeTests() {
  logDivider();
  console.log("moveSnake");
  logDivider();

  runCase("normal move keeps the same length", () => {
    const snake = [
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
    ];

    const actual = homework.moveSnake(snake, { x: 3, y: 2 }, false);

    assertDeepEqual(
      actual,
      [
        { x: 3, y: 2 },
        { x: 2, y: 2 },
        { x: 1, y: 2 },
      ],
      "Normal move should add the new head and remove the old tail."
    );
  });

  runCase("eating food makes the snake grow", () => {
    const snake = [
      { x: 2, y: 2 },
      { x: 1, y: 2 },
      { x: 0, y: 2 },
    ];

    const actual = homework.moveSnake(snake, { x: 3, y: 2 }, true);

    assertDeepEqual(
      actual,
      [
        { x: 3, y: 2 },
        { x: 2, y: 2 },
        { x: 1, y: 2 },
        { x: 0, y: 2 },
      ],
      "Eating should keep the tail so length increases by 1."
    );
  });
}

function runSpawnFoodTests() {
  logDivider();
  console.log("spawnFood");
  logDivider();

  runCase("spawnFood retries until it finds a free cell", () => {
    const snake = [
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ];

    const actual = withMockedRandom([0.45, 0.3, 0.0, 0.0], () =>
      homework.spawnFood(5, 4, snake)
    );

    assertDeepEqual(
      actual,
      { x: 0, y: 0 },
      "The first random cell hits the snake, so the function should retry and return the next free cell."
    );
  });

  runCase("spawnFood result stays in bounds and off the snake", () => {
    const snake = [{ x: 1, y: 1 }];

    const actual = withMockedRandom([0.9, 0.75], () => homework.spawnFood(5, 4, snake));

    assertTrue(actual.x >= 0 && actual.x < 5, "Food x must stay inside the board.");
    assertTrue(actual.y >= 0 && actual.y < 4, "Food y must stay inside the board.");
    assertTrue(!homework.samePos(actual, snake[0]), "Food must not spawn on the snake.");
  });
}

function runComputeTickMsTests() {
  logDivider();
  console.log("computeTickMs");
  logDivider();

  runCase("score 0 keeps the starting speed", () => {
    const actual = homework.computeTickMs(0);
    assertTrue(actual === 200, "At score 0, speed should be 200ms.");
  });

  runCase("score 2 reduces speed by one step", () => {
    const actual = homework.computeTickMs(2);
    assertTrue(actual === 185, "At score 2, speed should be 185ms.");
  });

  runCase("speed should not go below the minimum", () => {
    const actual = homework.computeTickMs(100);
    assertTrue(actual === 80, "Speed should be capped at 80ms.");
  });
}

function runRenderBoardTests() {
  logDivider();
  console.log("renderBoard");
  logDivider();

  runCase("render a small board correctly", () => {
    const actual = homework.renderBoard(
      5,
      4,
      [
        { x: 2, y: 1 },
        { x: 1, y: 1 },
      ],
      { x: 4, y: 3 }
    );

    const expected = [
      "#######",
      "#.....#",
      "#.o@..#",
      "#.....#",
      "#....*#",
      "#######",
    ].join("\n");

    assertDeepEqual(actual, expected, "Board string does not match the expected frame.");
  });
}

function printSummary() {
  logDivider();
  console.log("Summary");
  logDivider();
  console.log(`Total: ${total}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`TODO : ${todo}`);

  if (failed === 0 && todo === 0) {
    console.log("\nAll tests passed. The homework functions are complete.");
  } else if (failed === 0) {
    console.log("\nNo incorrect implementations so far. Finish the TODO functions and run again.");
  } else {
    console.log("\nSome implementations are incorrect. Fix the failed cases and run again.");
  }
}

function main() {
  console.log("Running snake_homework.js tests...\n");

  runGetNextHeadTests();
  runWillHitBodyTests();
  runMoveSnakeTests();
  runSpawnFoodTests();
  runComputeTickMsTests();
  runRenderBoardTests();

  printSummary();
}

main();
