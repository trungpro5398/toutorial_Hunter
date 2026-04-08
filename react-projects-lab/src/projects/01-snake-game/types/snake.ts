export type Direction = "up" | "down" | "left" | "right";

export type GameStatus = "idle" | "running" | "paused" | "lost";

export type Position = {
  row: number;
  col: number;
};

export type CellState = "empty" | "snake" | "snake-head" | "food";

export type BoardCell = {
  id: string;
  position: Position;
  state: CellState;
};
