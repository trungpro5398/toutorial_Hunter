export function TransactionForm() {
  return (
    <section className="starter-panel" aria-labelledby="transaction-form-title">
      <h2 id="transaction-form-title">TransactionForm</h2>
      <p>Build the transaction input form here.</p>

      <div className="starter-stack">
        <input className="starter-input" placeholder="Title" type="text" />
        <input className="starter-input" placeholder="Amount" type="number" />
        <button className="button" type="button">
          Add transaction
        </button>
      </div>
    </section>
  );
}
