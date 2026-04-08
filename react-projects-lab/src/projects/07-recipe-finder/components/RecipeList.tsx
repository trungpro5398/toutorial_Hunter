import { RecipeItem } from "./RecipeItem";

export function RecipeList() {
  return (
    <section className="starter-panel" aria-labelledby="recipe-list-title">
      <h2 id="recipe-list-title">RecipeList</h2>
      <p>Render matching recipes here.</p>

      <ul className="starter-list">
        <RecipeItem meta="20 min" title="Example recipe" />
        <RecipeItem meta="Easy" title="Another recipe" />
      </ul>
    </section>
  );
}
