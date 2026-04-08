import { Link } from "react-router-dom";
import { RecipeFilters } from "./components/RecipeFilters";
import { RecipeList } from "./components/RecipeList";
import { RecipeSearch } from "./components/RecipeSearch";

export function RecipeFinderPage() {
  return (
    <section className="exercise-page" aria-labelledby="recipe-finder-title">
      <Link className="back-link" to="/">
        Back to project list
      </Link>

      <div className="exercise-header">
        <div className="exercise-heading">
          <p className="eyebrow">Project 07 · search + filters</p>
          <h1 id="recipe-finder-title">Recipe Finder</h1>
          <p>
            Read the requirements in the README. Build this screen from search,
            filter, and recipe list components.
          </p>
        </div>
      </div>

      <div className="starter-surface">
        <RecipeSearch />
        <RecipeFilters />
        <RecipeList />
      </div>
    </section>
  );
}
