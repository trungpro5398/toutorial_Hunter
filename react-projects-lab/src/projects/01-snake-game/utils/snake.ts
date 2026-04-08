import type { BoardCell, Direction, Position } from "../types/snake";

function notImplemented(): never {
  throw new Error("TODO: Students implement this Snake helper.");
}

export function createInitialSnake(): Position[] {
  return notImplemented();
}

export function createFoodPosition(
  _snake: Position[],
  _boardSize: number
): Position {
  return notImplemented();
}

export function getNextPosition(
  _head: Position,
  _direction: Direction
): Position {
  return notImplemented();
}

export function isSamePosition(_a: Position, _b: Position): boolean {
  return notImplemented();
}

export function isOppositeDirection(
  _current: Direction,
  _next: Direction
): boolean {
  return notImplemented();
}

export function isOutsideBoard(
  _position: Position,
  _boardSize: number
): boolean {
  return notImplemented();
}

export function isPositionInSnake(
  _position: Position,
  _snake: Position[]
): boolean {
  return notImplemented();
}

export function createBoardCells(
  _boardSize: number,
  _snake: Position[],
  _food: Position
): BoardCell[] {
  return notImplemented();
}
