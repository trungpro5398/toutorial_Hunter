/*
    Displays the current successful weather result (if done so)
*/

import type { WeatherResult } from "../types/weather";

type WeatherResultProps = {
    weather: WeatherResult | null;
    clearWeather: () => void;
};

export function WeatherResult({ weather, clearWeather }: WeatherResultProps) {
  const formattedCity = weather?.city
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const conditionClass = weather?.condition.toLowerCase().replace(/\s+/g, "-");

  return (
    <section
      className={`starter-panel weather-result-panel ${
        conditionClass ? `weather-condition-${conditionClass}` : ""
      }`}
      aria-labelledby="weather-result-title"
    >
      <h2 id="weather-result-title">Current Weather</h2>
      <p>Latest successful city result.</p>

      {weather === null ? (
        <p>Search for a city to see the current weather.</p>
      ) : (
        <>
          <div className="starter-metrics">
            <span><strong>City:</strong> {formattedCity}</span>
            <span><strong>Temperature:</strong> {weather.temperature}°C</span>
            <span><strong>Condition:</strong> {weather.condition}</span>
            <span><strong>Humidity:</strong> {weather.humidity}%</span>
          </div>
          <div className="starter-actions">
            <button className="button secondary-button" type="button" onClick={clearWeather}>
              Clear Result
            </button>
          </div>
        </>
      )}
    </section>
  );
}
