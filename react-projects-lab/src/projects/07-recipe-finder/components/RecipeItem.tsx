type RecipeItemProps = {
  title: string;
  meta: string;
};

export function RecipeItem({ title, meta }: RecipeItemProps) {
  return (
    <li className="starter-item">
      <span>{title}</span>
      <span className="starter-chip">{meta}</span>
    </li>
  );
}
