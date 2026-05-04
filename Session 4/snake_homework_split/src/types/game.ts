export type Position = {
  x: number;
  y: number;
};

export type Direction = {
  dx: number;
  dy: number;
};

export type GameState = {
  width: number;
  height: number;
  snake: Position[];
  dir: Direction;
  pendingDir: Direction;
  food: Position;
  score: number;
  tickMs: number;
  tick: number;
  paused: boolean;
  gameOver: boolean;
  gameOverReason: string;
  debug: boolean;
  lastTrace: string;
};