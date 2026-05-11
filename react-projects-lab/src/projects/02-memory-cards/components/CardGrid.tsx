// Uses states given by useMemoryCards and work out state of each card
// Then render a MemoryCard for each card

import { MemoryCard } from "./MemoryCard";
import type { Card } from "../types/memoryCards";

type CardGridProps = {
  cards: Card[];
  selectedIds: string[];
  matchedIds: string[];
  onCardClick: (cardId: string) => void; // Click handler function
};

export function CardGrid({
  cards,
  selectedIds,
  matchedIds,
  onCardClick,
}: CardGridProps) {
  return (
    <section className="starter-panel" aria-labelledby="card-grid-title">
      <h2 id="card-grid-title">CardGrid</h2>
      <p>Render the memory cards here.</p>

      <div className="starter-card-grid">
        {cards.map((card) => { // converts each card object into JSX
          const isSelected = selectedIds.includes(card.id);
          const isMatched = matchedIds.includes(card.id);
          const isFaceUp = isSelected || isMatched;

          return (
            <MemoryCard
                key={card.id}
                emoji={card.emoji}
                isFaceUp={isFaceUp}
                isMatched={isMatched}
                onClick={() => onCardClick(card.id)} // when clicked, call onCardClick
            />
          );
        })}
      </div>
    </section>
  );
}
