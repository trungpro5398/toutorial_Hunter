import { MemoryCard } from "./MemoryCard";

export function CardGrid() {
  return (
    <section className="starter-panel" aria-labelledby="card-grid-title">
      <h2 id="card-grid-title">CardGrid</h2>
      <p>Render the memory cards here.</p>

      <div className="starter-card-grid">
        <MemoryCard label="?" />
        <MemoryCard label="?" />
        <MemoryCard label="?" />
        <MemoryCard label="?" />
      </div>
    </section>
  );
}
