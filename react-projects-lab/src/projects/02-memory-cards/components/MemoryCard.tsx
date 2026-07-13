// Renders one actual card button

type MemoryCardProps = {
  emoji: string;
  isFaceUp: boolean;
  isMatched: boolean;
  onClick: () => void;
};

export function MemoryCard({ onClick, isMatched, isFaceUp, emoji }: MemoryCardProps) {
  return (
    <button
        className={isMatched ? "starter-tile matched" : "starter-tile"}
        type="button"
        onClick={onClick}
        disabled={isMatched}
    >
      {isFaceUp ? emoji : "?"}
    </button>
  );
}
