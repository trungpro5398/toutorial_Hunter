export function TransactionList() {
  return (
    <section className="starter-panel" aria-labelledby="transaction-list-title">
      <h2 id="transaction-list-title">TransactionList</h2>
      <p>Render transactions here.</p>

      <ul className="starter-list">
        <li className="starter-item">
          <span>Example income</span>
          <span>$0</span>
        </li>
        <li className="starter-item">
          <span>Example expense</span>
          <span>$0</span>
        </li>
      </ul>
    </section>
  );
}
