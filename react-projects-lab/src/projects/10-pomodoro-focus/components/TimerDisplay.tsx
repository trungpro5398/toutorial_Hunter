export function TimerDisplay() {
  return (
    <section className="starter-panel" aria-labelledby="timer-display-title">
      <h2 id="timer-display-title">TimerDisplay</h2>
      <p>Show remaining time and progress here.</p>

      <div className="starter-metrics">
        <span>25:00</span>
        <span>Progress: 0%</span>
      </div>
    </section>
  );
}
