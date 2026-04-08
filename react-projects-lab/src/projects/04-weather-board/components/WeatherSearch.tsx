export function WeatherSearch() {
  return (
    <section className="starter-panel" aria-labelledby="weather-search-title">
      <h2 id="weather-search-title">WeatherSearch</h2>
      <p>Build the city search form here.</p>

      <div className="starter-stack">
        <input className="starter-input" placeholder="City name" type="text" />
        <button className="button" type="button">
          Search
        </button>
      </div>
    </section>
  );
}
