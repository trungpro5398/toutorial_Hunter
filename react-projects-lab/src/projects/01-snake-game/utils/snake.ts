import type { BoardCell, Direction, Position } from "../types/snake";
import { INITIAL_SNAKE } from "../constants/gameConfig";

/*
function notImplemented(): never {
  throw new Error("TODO: Students implement this Snake helper.");
}
*/

export function createInitialSnake(): Position[] {
  return INITIAL_SNAKE.map((segment) => ({
      row: segment.row,
      col: segment.col,
    }));x
}

export function createFoodPosition(
  snake: Position[],
  boardSize: number
): Position {
  let food: Position = {
    row: Math.floor(Math.random() * boardSize),
    col: Math.floor(Math.random() * boardSize),
  };

  while (isPositionInSnake(food, snake)) {
    food = {
      row: Math.floor(Math.random() * boardSize),
      col: Math.floor(Math.random() * boardSize),
    };
  }

  return food;
}

export function getNextPosition(
  head: Position,
  direction: Direction
): Position {
  if (direction === "up") {
    return {
      row: head.row - 1,
      col: head.col,
    };
  }

  if (direction === "down") {
    return {
      row: head.row + 1,
      col: head.col,
    };
  }

  if (direction === "left") {
    return {
      row: head.row,
      col: head.col - 1,
    };
  }

  return {
    row: head.row,
    col: head.col + 1,
  };
}


export function isSamePosition(a: Position, b: Position): boolean {
  return a.row === b.row && a.col === b.col;
}

export function isOppositeDirection(
  current: Direction,
  next: Direction
): boolean {
  return (
    (current === "up" && next === "down") ||
    (current === "down" && next === "up") ||
    (current === "left" && next === "right") ||
    (current === "right" && next === "left")
  );
}

export function isOutsideBoard(
  position: Position,
  boardSize: number
): boolean {
  return (
    position.row < 0 ||
    position.row >= boardSize ||
    position.col < 0 ||
    position.col >= boardSize
  );
}

export function isPositionInSnake(
  position: Position,
  snake: Position[]
): boolean {
  return snake.some((segment) => isSamePosition(position, segment));
}

export function createBoardCells(
  boardSize: number,
  snake: Position[],
  food: Position
): BoardCell[] {
  const cells: BoardCell[] = [];

  for (let row = 0; row < boardSize; row += 1) {
    for (let col = 0; col < boardSize; col += 1) {
      const position = { row, col };
      const isHead = isSamePosition(position, snake[0]);
      const isSnake = isPositionInSnake(position, snake);
      const isFood = isSamePosition(position, food);

      let state: BoardCell["state"] = "empty";

      if (isFood) {
        state = "food";
      }

      if (isSnake) {
        state = "snake";
      }

      if (isHead) {
        state = "snake-head";
      }

      cells.push({
        id: `${row}-${col}`,
        position,
        state,
      });
    }
  }

  return cells;
}