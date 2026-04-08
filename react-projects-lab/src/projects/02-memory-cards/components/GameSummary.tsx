export function GameSummary() {
  return (
    <section className="starter-panel" aria-labelledby="memory-summary-title">
      <h2 id="memory-summary-title">GameSummary</h2>
      <p>Show moves and game status here.</p>

      <div className="starter-metrics">
        <span>Moves: 0</span>
        <span>Status: Not started</span>
      </div>
    </section>
  );
}
