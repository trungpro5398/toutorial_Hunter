export function TodoForm() {
  return (
    <section className="starter-panel" aria-labelledby="todo-form-title">
      <h2 id="todo-form-title">TodoForm</h2>
      <p>Build the task input form here.</p>

      <div className="starter-stack">
        <input className="starter-input" placeholder="Task title" type="text" />
        <button className="button" type="button">
          Add task
        </button>
      </div>
    </section>
  );
}
