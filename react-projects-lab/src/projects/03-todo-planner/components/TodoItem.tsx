type TodoItemProps = {
  title: string;
  status: string;
};

export function TodoItem({ title, status }: TodoItemProps) {
  return (
    <li className="starter-item">
      <span>{title}</span>
      <span className="starter-chip">{status}</span>
    </li>
  );
}
