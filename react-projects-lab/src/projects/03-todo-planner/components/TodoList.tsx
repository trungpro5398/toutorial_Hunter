/*
 * Renders the filtered list of todo items.
 */

import { TodoItem } from "./TodoItem";
import type { Todo, Priority } from "../types/Todo";

type TodoListProps = {
    todos: Todo[];
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    editTodo: (id: string,
               updates: { title?: string; priority?: Priority; hasDueDate?: boolean; dueDate?: string }
              ) => void;
};

export function TodoList({
  todos,
  toggleTodo,
  deleteTodo,
  editTodo,
}: TodoListProps) {

  return (
    <section className="starter-panel" aria-labelledby="todo-list-title">
      <h2 id="todo-list-title">TodoList</h2>
      <p>Render todo items here.</p>
        {todos.length === 0 ? (
            <p>No tasks to show.</p>
          ) : (
            <ul className="starter-list">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                />
              ))}
            </ul>
          )}
    </section>
  );
}
