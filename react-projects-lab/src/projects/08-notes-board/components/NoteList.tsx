import { EmptyState } from "./EmptyState";
import { NoteItem } from "./NoteItem";

export function NoteList() {
  const hasExampleNote = true;

  return (
    <section className="starter-panel" aria-labelledby="note-list-title">
      <h2 id="note-list-title">NoteList</h2>
      <p>Render notes here.</p>

      {hasExampleNote ? (
        <ul className="starter-list">
          <NoteItem title="Example note" updatedAt="Today" />
        </ul>
      ) : (
        <EmptyState />
      )}
    </section>
  );
}
