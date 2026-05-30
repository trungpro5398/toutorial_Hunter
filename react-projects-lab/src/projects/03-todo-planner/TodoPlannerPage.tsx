/*
 * Renders the todo planner page and connects todo state to child components.
 */

import { Link } from "react-router-dom";
import { TodoFilters } from "./components/TodoFilters";
import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";

export function TodoPlannerPage() {
  const { filter, visibleTodos, setFilter, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos();


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

      // Pass to child components
      <div className="starter-surface">
        <TodoForm addTodo={addTodo} />
        <TodoFilters filter={filter} setFilter={setFilter} />
        <TodoList todos={visibleTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} />
      </div>
    </section>
  );
}
