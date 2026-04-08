export function TodoFilters() {
  return (
    <section className="starter-panel" aria-labelledby="todo-filters-title">
      <h2 id="todo-filters-title">TodoFilters</h2>
      <p>Build all, active, and completed filters here.</p>

      <div className="starter-actions">
        <button className="button secondary" type="button">
          All
        </button>
        <button className="button secondary" type="button">
          Active
        </button>
        <button className="button secondary" type="button">
          Completed
        </button>
      </div>
    </section>
  );
}
