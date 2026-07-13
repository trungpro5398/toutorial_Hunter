/*
 * Serves as connector between game logic from useMemoryCards and visual components
 * e.g. CardGrid, GameSummary
 *
 * Gives data to rendering
 */

import { Link } from "react-router-dom";
import { CardGrid } from "./components/CardGrid";
import { GameSummary } from "./components/GameSummary";
import { useMemoryCards } from "./hooks/useMemoryCards";

export function MemoryCardsPage() {
  const {
    cards,
    selectedIds,
    matchedIds,
    moves,
    status,
    handleCardClick,
    resetGame,
  } = useMemoryCards();

  return (
    <section className="exercise-page" aria-labelledby="memory-cards-title">
      <Link className="back-link" to="/">
        Back to project list
      </Link>

      <div className="exercise-header">
        <div className="exercise-heading">
          <p className="eyebrow">Project 02 · array state</p>
          <h1 id="memory-cards-title">Memory Cards</h1>
          <p>
            Read the requirements in the README. Build this screen by combining
            small card components.
          </p>
        </div>
      </div>

      <div className="starter-surface">
        <CardGrid
          cards={cards}
          selectedIds={selectedIds}
          matchedIds={matchedIds}
          onCardClick={handleCardClick}
        />
        <GameSummary
          moves={moves}
          status={status}
          onReset={resetGame}
        />
      </div>
    </section>
  );
}
