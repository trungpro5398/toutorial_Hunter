/*
 * Renders a single todo item with complete, edit, and delete actions.
 */

import { useState } from "react";
import type { Todo, Priority } from "../types/Todo";

type TodoItemProps = {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (
    id: string,
    updates: {
      title?: string;
      priority?: Priority;
      hasDueDate?: boolean;
      dueDate?: string;
    }
  ) => void;
};

export function TodoItem({ todo, toggleTodo, deleteTodo, editTodo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editPriority, setEditPriority] = useState<Priority>(todo.priority);
  const [editHasDueDate, setEditHasDueDate] = useState(todo.hasDueDate);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate ?? "");


  function handleSave() {
      editTodo(todo.id, {
        title: editTitle,
        priority: editPriority,
        hasDueDate: editHasDueDate,
        dueDate: editHasDueDate ? editDueDate : undefined,
      });

      setIsEditing(false);
  }

  function handleCancel() {
    setEditTitle(todo.title);
    setEditPriority(todo.priority);
    setEditHasDueDate(todo.hasDueDate);
    setEditDueDate(todo.dueDate ?? "");
    setIsEditing(false);
  }

  return (
    <li className="starter-item">
      {isEditing ? (
        <div className="starter-stack">
          <input
            className="starter-input"
            type="text"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
          />

          <select
            className="starter-input"
            value={editPriority}
            onChange={(event) => setEditPriority(event.target.value as Priority)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <label>
            <input
              type="checkbox"
              checked={editHasDueDate}
              onChange={(event) => setEditHasDueDate(event.target.checked)}
            />
            Has due date
          </label>

          <input
            className="starter-input"
            type="date"
            value={editDueDate}
            disabled={!editHasDueDate}
            onChange={(event) => setEditDueDate(event.target.value)}
          />

          <button type="button" onClick={handleSave}>
            Save
          </button>

          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="starter-stack">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />

          <span>{todo.title}</span>

          <span className="starter-chip">{todo.priority}</span>

          {todo.hasDueDate && todo.dueDate && (
            <span>{todo.dueDate}</span>
          )}

          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>

          <button type="button" onClick={() => deleteTodo(todo.id)}>
            Delete
          </button>
        </div>
      )}
    </li>
  );
}
