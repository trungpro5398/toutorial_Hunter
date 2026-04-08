export function NoteEditor() {
  return (
    <section className="starter-panel" aria-labelledby="note-editor-title">
      <h2 id="note-editor-title">NoteEditor</h2>
      <p>Build the note editor form here.</p>

      <div className="starter-stack">
        <input className="starter-input" placeholder="Note title" type="text" />
        <textarea className="starter-input" placeholder="Note content" rows={4} />
        <button className="button" type="button">
          Save note
        </button>
      </div>
    </section>
  );
}
