// Shows game info

import type { GameStatus } from "../types/memoryCards";

type GameSummaryProps = {
  moves: number;
  status: GameStatus;
  onReset: () => void;
};


export function GameSummary( { moves, status, onReset }: GameSummaryProps) {


  return (
    <section className="starter-panel" aria-labelledby="memory-summary-title">
      <h2 id="memory-summary-title">GameSummary</h2>
      <p>Show moves and game status here.</p>

      <div className="starter-metrics">
        <span>Moves: {moves}</span>
        <span>Status: {status}</span>
      </div>

        <button type="button" onClick={onReset}>
            Reset
        </button>

    </section>
  );
}
