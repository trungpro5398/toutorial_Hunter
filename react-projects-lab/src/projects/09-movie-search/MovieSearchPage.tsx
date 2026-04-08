import { Link } from "react-router-dom";
import { MovieDetail } from "./components/MovieDetail";
import { MovieResults } from "./components/MovieResults";
import { MovieSearchForm } from "./components/MovieSearchForm";

export function MovieSearchPage() {
  return (
    <section className="exercise-page" aria-labelledby="movie-search-title">
      <Link className="back-link" to="/">
        Back to project list
      </Link>

      <div className="exercise-header">
        <div className="exercise-heading">
          <p className="eyebrow">Project 09 · async search</p>
          <h1 id="movie-search-title">Movie Search</h1>
          <p>
            Read the requirements in the README. Build this screen from search,
            result, and detail components.
          </p>
        </div>
      </div>

      <div className="starter-surface">
        <MovieSearchForm />
        <MovieResults />
        <MovieDetail />
      </div>
    </section>
  );
}
