export function SnakeBoard() {
  return (
    <section className="starter-panel" aria-labelledby="snake-board-title">
      <h2 id="snake-board-title">SnakeBoard</h2>
      <p>Build the game board grid here.</p>

      <div className="snake-board-preview" aria-label="Snake board preview">
        <span className="snake-preview-cell is-snake" />
        <span className="snake-preview-cell is-snake" />
        <span className="snake-preview-cell is-snake" />
        <span className="snake-preview-cell" />
        <span className="snake-preview-cell" />
        <span className="snake-preview-cell" />
        <span className="snake-preview-cell is-food" />
        <span className="snake-preview-cell" />
        <span className="snake-preview-cell" />
      </div>
    </section>
  );
}
