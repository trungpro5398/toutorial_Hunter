export function TimerControls() {
  return (
    <section className="starter-panel" aria-labelledby="timer-controls-title">
      <h2 id="timer-controls-title">TimerControls</h2>
      <p>Build start, pause, and reset controls here.</p>

      <div className="starter-actions">
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
