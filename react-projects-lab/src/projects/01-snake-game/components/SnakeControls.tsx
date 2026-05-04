import type { Direction, GameStatus } from "../types/snake";

type SnakeControlsProps = {
  bestScore: number;
  changeDirection: (direction: Direction) => void;
  resetGame: () => void;
  score: number;
  startGame: () => void;
  status: GameStatus;
  togglePause: () => void;
};

export function SnakeControls({
  bestScore,
  changeDirection,
  resetGame,
  score,
  startGame,
  status,
  togglePause,
}: SnakeControlsProps) {
  const pauseLabel = status === "paused" ? "Resume" : "Pause";

  return (
    <section className="starter-panel" aria-labelledby="snake-controls-title">
      <h2 id="snake-controls-title">Controls</h2>

      <div className="snake-metrics">
        <p>Score: {score}</p>
        <p>Best: {bestScore}</p>
        <p>Status: {status}</p>
      </div>

      <div className="snake-control-preview">
        <button className="button secondary" type="button" onClick={startGame}>
          Start
        </button>

        <button
          className="button secondary"
          type="button"
          onClick={togglePause}
          disabled={status === "idle" || status === "lost"}
        >
          {pauseLabel}
        </button>

        <button className="button secondary" type="button" onClick={resetGame}>
          Reset
        </button>
      </div>

      <div className="snake-direction-controls">
        <button type="button" onClick={() => changeDirection("up")}>
          Up
        </button>

        <button type="button" onClick={() => changeDirection("left")}>
          Left
        </button>

        <button type="button" onClick={() => changeDirection("down")}>
          Down
        </button>

        <button type="button" onClick={() => changeDirection("right")}>
          Right
        </button>
      </div>

      <p>
        Use arrow keys or WASD to move. Press Enter to start, Space to pause,
        and R to reset.
      </p>
    </section>
  );
}
