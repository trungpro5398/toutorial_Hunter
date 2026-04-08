import { Link } from "react-router-dom";
import { WeatherResult } from "./components/WeatherResult";
import { WeatherSearch } from "./components/WeatherSearch";
import { WeatherStateMessage } from "./components/WeatherStateMessage";

export function WeatherBoardPage() {
  return (
    <section className="exercise-page" aria-labelledby="weather-board-title">
      <Link className="back-link" to="/">
        Back to project list
      </Link>

      <div className="exercise-header">
        <div className="exercise-heading">
          <p className="eyebrow">Project 04 · async state</p>
          <h1 id="weather-board-title">Weather Board</h1>
          <p>
            Read the requirements in the README. Build this screen from search,
            result, and state message components.
          </p>
        </div>
      </div>

      <div className="starter-surface">
        <WeatherSearch />
        <WeatherStateMessage />
        <WeatherResult />
      </div>
    </section>
  );
}
