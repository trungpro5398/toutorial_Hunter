type NoteItemProps = {
  title: string;
  updatedAt: string;
};

export function NoteItem({ title, updatedAt }: NoteItemProps) {
  return (
    <li className="starter-item">
      <span>{title}</span>
      <span className="starter-chip">{updatedAt}</span>
    </li>
  );
}
