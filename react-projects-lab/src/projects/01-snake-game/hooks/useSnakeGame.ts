import type { BoardCell, Direction, GameStatus } from "../types/snake";

export type UseSnakeGameResult = {
  boardCells: BoardCell[];
  boardSize: number;
  bestScore: number;
  changeDirection: (direction: Direction) => void;
  resetGame: () => void;
  score: number;
  startGame: () => void;
  status: GameStatus;
  togglePause: () => void;
};

function notImplemented(): never {
  throw new Error("TODO: Students implement the Snake game hook.");
}

export function useSnakeGame(): UseSnakeGameResult {
  return notImplemented();
}
