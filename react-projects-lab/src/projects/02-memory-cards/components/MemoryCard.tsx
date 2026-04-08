type MemoryCardProps = {
  label: string;
};

export function MemoryCard({ label }: MemoryCardProps) {
  return (
    <button className="starter-tile" type="button">
      {label}
    </button>
  );
}
