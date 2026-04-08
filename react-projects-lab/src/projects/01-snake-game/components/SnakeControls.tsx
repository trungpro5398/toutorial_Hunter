export function SnakeControls() {
  return (
    <section className="starter-panel" aria-labelledby="snake-controls-title">
      <h2 id="snake-controls-title">SnakeControls</h2>
      <p>Build Start, Pause, Reset, and keyboard controls here.</p>

      <div className="snake-control-preview" aria-label="Snake controls preview">
        <button className="button secondary" type="button">
          Start
        </button>
        <button className="button secondary" type="button">
          Pause
        </button>
        <button className="button secondary" type="button">
          Reset
        </button>
      </div>
    </section>
  );
}
