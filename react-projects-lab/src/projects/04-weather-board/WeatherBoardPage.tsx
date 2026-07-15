/*
    Connects custom hook to the three UI components.
    Acts as bridge between WeatherSearch (rendering) and useWeatherSearch (actual code)
*/

import { Link } from "react-router-dom";
import { WeatherResult } from "./components/WeatherResult";
import { WeatherSearch } from "./components/WeatherSearch";
import { WeatherStateMessage } from "./components/WeatherStateMessage";
import { useWeatherSearch } from "./hooks/useWeatherSearch";

export function WeatherBoardPage() {
  const {
    query,
    setQuery,
    status,
    weather,
    errorMessage,
    validationMessage,
    searchWeather,
    clearWeather,
  } = useWeatherSearch();

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
        <WeatherSearch
          query={query}
          setQuery={setQuery}
          searchWeather={searchWeather}
          status={status}
          validationMessage={validationMessage}
        />
        <WeatherStateMessage status={status} errorMessage={errorMessage} />
        <WeatherResult weather={weather} clearWeather={clearWeather} />
      </div>
    </section>
  );
}
