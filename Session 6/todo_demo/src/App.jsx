import { useState } from "react";
import "./App.css";
import Toast, { toast } from "./Toast";

const initialTodos = [
  { id: 1, text: "Review immutable state updates" },
  { id: 2, text: "Teach delete with filter" },
];

let nextTodoId = 3;

function logStateChange(action, prevTodos, nextTodos) {
  console.groupCollapsed(`todo:${action}`);
  console.log("before:", prevTodos);
  console.log("after :", nextTodos);
  console.groupEnd();
}

export default function App() {
  const [draft, setDraft] = useState("");
  const [todos, setTodos] = useState(initialTodos);
  const [error, setError] = useState(""); // kept for state preview

  function handleDraftChange(event) {
    setDraft(event.target.value);

    if (error) {
      setError("");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedDraft = draft.trim();

    if (!trimmedDraft) {
      setError("Please enter a todo before submitting.");
      toast("Please enter a todo before submitting.", "error");
      console.warn("todo:add blocked because input is empty");
      return;
    }

    const newTodo = {
      id: nextTodoId,
      text: trimmedDraft,
    };
    nextTodoId += 1;

    setTodos((prevTodos) => {
      const nextTodos = [...prevTodos, newTodo];
      logStateChange("add", prevTodos, nextTodos);
      return nextTodos;
    });

    setDraft("");
    setError("");
    toast(`Added "${trimmedDraft}"`, "success");
  }

  function handleDeleteTodo(todoId) {
    setTodos((prevTodos) => {
      const nextTodos = prevTodos.filter((todo) => todo.id !== todoId);
      logStateChange("delete", prevTodos, nextTodos);
      return nextTodos;
    });
  }

  const statePreview = JSON.stringify(
    {
      draft,
      todos,
      error,
    },
    null,
    2
  );

  return (
    <>
    <Toast />
    <main className="page-shell">
      <section className="panel hero-panel">
        <p className="eyebrow">Session 6 · React useState</p>
        <h1>Todo CRUD with controlled input</h1>
        <p className="intro">
          This demo focuses on the exact habits students need next: immutable
          array updates, form control, simple validation, stable list keys, and
          logging state before and after each action.
        </p>

        <div className="rule-strip" aria-label="Core rules">
          <span>add with spread</span>
          <span>delete with filter</span>
          <span>key uses todo.id</span>
        </div>

        <form className="composer" onSubmit={handleSubmit}>
          <label className="field-label" htmlFor="todo-input">
            New todo
          </label>
          <div className="field-row">
            <input
              id="todo-input"
              className="todo-input"
              value={draft}
              onChange={handleDraftChange}
              placeholder="Type a task and press Enter"
            />
            <button className="primary-button" type="submit">
              Add todo
            </button>
          </div>
          {error ? (
            <p className="error-text" role="alert">
              {error}
            </p>
          ) : (
            <p className="helper-text">
              Tip: use a real form so button click and Enter share one submit
              path.
            </p>
          )}
        </form>

        <div className="list-header">
          <h2>Todo list</h2>
          <span className="count-badge">{todos.length} items</span>
        </div>

        {todos.length === 0 ? (
          <div className="empty-state">
            <p>No todos yet.</p>
            <p>Add the first task to see the list render from state.</p>
          </div>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li className="todo-item" key={todo.id}>
                <div>
                  <p className="todo-text">{todo.text}</p>
                  <p className="todo-meta">stable key: {todo.id}</p>
                </div>
                <button
                  className="delete-button"
                  type="button"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <aside className="panel inspector-panel">
        <div className="inspector-header">
          <p className="eyebrow">Debug view</p>
          <h2>State snapshot</h2>
        </div>
        <p className="inspector-copy">
          The UI should match this state. The console should show every add and
          delete as a clear before/after transition.
        </p>
        <pre className="state-preview">{statePreview}</pre>
      </aside>
    </main>
    </>
  );
}
