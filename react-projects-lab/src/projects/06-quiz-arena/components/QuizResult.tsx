export function QuizResult() {
  return (
    <section className="starter-panel" aria-labelledby="quiz-result-title">
      <h2 id="quiz-result-title">QuizResult</h2>
      <p>Show final score and play-again action here.</p>

      <div className="starter-metrics">
        <span>Score: 0</span>
        <button className="button secondary" type="button">
          Play again
        </button>
      </div>
    </section>
  );
}
