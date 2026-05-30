/*
 * Renders the form for creating new todo items.
 */

import { useState } from "react";
import type { Priority } from "../types/Todo";
import { priorityOptions } from "../constants/priorityOptions";

type TodoFormProps = {
    addTodo: (input: {
      title: string;
      priority: Priority;
      hasDueDate: boolean;
      dueDate?: string;
    }) => void;
};

export function TodoForm({ addTodo }: TodoFormProps) {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState<Priority>("medium");
    const [hasDueDate, setHasDueDate] = useState(false);
    const [dueDate, setDueDate] = useState("");

    function handleSubmit() {
      addTodo({
        title,
        priority,
        hasDueDate,
        dueDate: hasDueDate ? dueDate : undefined,
      });

      setTitle("");
      setPriority("medium");
      setHasDueDate(false);
      setDueDate("");
    }

  return (
    <section className="starter-panel" aria-labelledby="todo-form-title">
      <h2 id="todo-form-title">TodoForm</h2>
      <p>Build the task input form here.</p>

      <div className="starter-stack">
        <input
          className="starter-input"
          placeholder="Task title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <select
          className="starter-input"
          value={priority}
          onChange={(event) => setPriority(event.target.value as Priority)}
        >
          {priorityOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <label>
          <input
            type="checkbox"
            checked={hasDueDate}
            onChange={(event) => setHasDueDate(event.target.checked)}
          />
          Has due date
        </label>

        <input
          className="starter-input"
          type="date"
          value={dueDate}
          disabled={!hasDueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />

        <button
          className="button"
          type="button"
          onClick={handleSubmit}
        >
          Add task
        </button>
      </div>
    </section>
  );
}
