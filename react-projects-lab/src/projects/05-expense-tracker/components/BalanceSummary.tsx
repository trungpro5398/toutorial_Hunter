export function BalanceSummary() {
  return (
    <section className="starter-panel" aria-labelledby="balance-summary-title">
      <h2 id="balance-summary-title">BalanceSummary</h2>
      <p>Show income, expenses, and balance here.</p>

      <div className="starter-metrics">
        <span>Income: $0</span>
        <span>Expenses: $0</span>
        <span>Balance: $0</span>
      </div>
    </section>
  );
}
