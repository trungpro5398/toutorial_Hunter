import type { BoardCell } from "../types/snake";

type SnakeBoardProps = {
  boardCells: BoardCell[];
  boardSize: number;
};

export function SnakeBoard({ boardCells, boardSize }: SnakeBoardProps) {
  return (
    <section className="starter-panel" aria-labelledby="snake-board-title">
      <h2 id="snake-board-title">Board</h2>

      <div
        className="snake-board"
        aria-label="Snake game board"
        style={{
          gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
        }}
      >
        {boardCells.map((cell) => (
          <span
            key={cell.id}
            className={`snake-cell is-${cell.state}`}
          />
        ))}
      </div>
    </section>
  );
}
