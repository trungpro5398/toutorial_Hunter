/*
    Controls UI for searching
*/

import type { RequestStatus } from "../types/weather";

// What is expected output from WeatherBoardPage
type WeatherSearchProps = {
  query: string;
  setQuery: (value: string) => void;
  searchWeather: () => void;
  status: RequestStatus;
  validationMessage: string | null;
};

// Lets rendering use values passed by WeatherBoardPage
export function WeatherSearch({
  query,
  setQuery,
  searchWeather,
  status,
  validationMessage,
}: WeatherSearchProps) {

  // When input query submits, stops browser from refreshing page and calls async search function
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    searchWeather();
  }

  // Boolean so that button can react when async request is running
  const isLoading = status === "loading";

  // Handles how text is displayed based on whether query is being processed or not
  return (
    <section className="starter-panel" aria-labelledby="weather-search-title">
      <h2 id="weather-search-title">Search City</h2>
      <p>Enter a city name to look up its weather.</p>

      <form className="starter-stack" onSubmit={handleSubmit}>
        <input
          className="starter-input"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="City name"
          type="text"
          value={query}
        />
        <button className="button" disabled={isLoading} type="submit">
          {isLoading ? "Searching..." : "Search"}
        </button>
        {validationMessage !== null && (
          <p className="weather-validation">{validationMessage}</p>
        )}
      </form>
    </section>
  );
}
