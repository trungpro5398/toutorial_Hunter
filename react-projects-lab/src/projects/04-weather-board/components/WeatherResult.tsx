export function WeatherResult() {
  return (
    <section className="starter-panel" aria-labelledby="weather-result-title">
      <h2 id="weather-result-title">WeatherResult</h2>
      <p>Show weather data here.</p>

      <div className="starter-metrics">
        <span>City: Melbourne</span>
        <span>Temperature: --</span>
        <span>Condition: --</span>
      </div>
    </section>
  );
}
