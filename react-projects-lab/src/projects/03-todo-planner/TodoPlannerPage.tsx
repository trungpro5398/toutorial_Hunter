import { Link } from "react-router-dom";
import { TodoFilters } from "./components/TodoFilters";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";

export function TodoPlannerPage() {
  return (
    <section className="exercise-page" aria-labelledby="todo-planner-title">
      <Link className="back-link" to="/">
        Back to project list
      </Link>

      <div className="exercise-header">
        <div className="exercise-heading">
          <p className="eyebrow">Project 03 · forms + lists</p>
          <h1 id="todo-planner-title">Todo Planner</h1>
          <p>
            Read the requirements in the README. Build this screen from a form,
            filters, and list components.
          </p>
        </div>
      </div>

      <div className="starter-surface">
        <TodoForm />
        <TodoFilters />
        <TodoList />
      </div>
    </section>
  );
}
