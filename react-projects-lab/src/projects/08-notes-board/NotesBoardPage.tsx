import { Link } from "react-router-dom";
import { NoteEditor } from "./components/NoteEditor";
import { NoteList } from "./components/NoteList";
import { NotesSearch } from "./components/NotesSearch";

export function NotesBoardPage() {
  return (
    <section className="exercise-page" aria-labelledby="notes-board-title">
      <Link className="back-link" to="/">
        Back to project list
      </Link>

      <div className="exercise-header">
        <div className="exercise-heading">
          <p className="eyebrow">Project 08 · CRUD</p>
          <h1 id="notes-board-title">Notes Board</h1>
          <p>
            Read the requirements in the README. Build this screen from editor,
            list, and note item components.
          </p>
        </div>
      </div>

      <div className="starter-surface">
        <NoteEditor />
        <NotesSearch />
        <NoteList />
      </div>
    </section>
  );
}
