import type { BoardCell, Direction, Position } from "../types/snake";
import { INITIAL_SNAKE, INITIAL_AI_SNAKE } from "../constants/gameConfig";

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
  food: Position,
  aiSnake: Position[] = []
): BoardCell[] {
  const cells: BoardCell[] = [];

  for (let row = 0; row < boardSize; row += 1) {
    for (let col = 0; col < boardSize; col += 1) {
      const position = { row, col };
      const isHead = isSamePosition(position, snake[0]);
      const isSnake = isPositionInSnake(position, snake);
      const isFood = isSamePosition(position, food);

      const isAiHead = aiSnake.length > 0 && isSamePosition(position, aiSnake[0]);
      const isAiSnake = isPositionInSnake(position, aiSnake);

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

      // AI snake render implementation
      if (isAiSnake) {
        state = "ai-snake";
      }

      if (isAiHead) {
        state = "ai-snake-head";
      }

      cells.push({
        id: `${row}-${col}`,
        position,
        state,
      });
    }
  }

  return cells;
<<<<<<< Updated upstream
=======
}

// AI SNAKE CODE
const DIRECTIONS: Direction[] = ["up", "down", "left", "right"];

function positionKey(position: Position): string {
  return `${position.row}-${position.col}`;
}

export function createInitialAiSnake(): Position[] {
  return INITIAL_AI_SNAKE.map((segment) => ({
    row: segment.row,
    col: segment.col,
  }));
}

// BFS FUNCTION
export function findShortestPath(
  start: Position,
  target: Position,
  blockedPositions: Position[],
  boardSize: number
): Position[] {
  const queue: Position[] = [start];
  const visited = new Set<string>([positionKey(start)]);

  // Stored for backtracking and path saving
  const previous = new Map<string, Position>();
  const blocked = new Set(blockedPositions.map(positionKey));

  while (queue.length > 0) {
    const current = queue.shift();

    if (!current) {
      break;
    }

    // BACKTRACKING to save the AI the shortest path from
    if (isSamePosition(current, target)) {
      const path: Position[] = [];
      let step: Position | undefined = current;

       // Reconstructs whole path until run out of previous positions or reach AI snake head
      while (step && !isSamePosition(step, start)) {

        // Adds in front of step array
        path.unshift(step);
        // positionKey - converts into string key e.g. { row: 5, col: 8 } -> "5-8"
        // Iterates through pathing until no more
        step = previous.get(positionKey(step));
      }

      return path;
    }

    for (const direction of DIRECTIONS) {
      const next = getNextPosition(current, direction);
      const key = positionKey(next);

      if (
        visited.has(key) ||
        blocked.has(key) ||
        isOutsideBoard(next, boardSize)
      ) {
        continue;
      }

      visited.add(key);

      // I got to key from current
      previous.set(key, current);
      queue.push(next);
    }
  }

  return [];
>>>>>>> Stashed changes
}