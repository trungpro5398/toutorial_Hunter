import { TodoItem } from "./TodoItem";

export function TodoList() {
  return (
    <section className="starter-panel" aria-labelledby="todo-list-title">
      <h2 id="todo-list-title">TodoList</h2>
      <p>Render todo items here.</p>

      <ul className="starter-list">
        <TodoItem status="Active" title="Read the README" />
        <TodoItem status="Next" title="Add useState" />
      </ul>
    </section>
  );
}
