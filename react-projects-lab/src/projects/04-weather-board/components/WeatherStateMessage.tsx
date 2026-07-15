/*
    Displays current async state
*/

import type { RequestStatus } from "../types/weather";

type WeatherStateMessageProps = {
  status: RequestStatus;
  errorMessage: string | null;
};

export function WeatherStateMessage({
  status,
  errorMessage,
}: WeatherStateMessageProps) {
  let message = "";

  switch (status) {
    case "idle":
      message = "Search for a city to get started.";
      break;
    case "loading":
      message = "Loading weather...";
      break;
    case "success":
      message = "Weather loaded successfully.";
      break;
    case "empty":
      message = "No weather data found for that city.";
      break;
    case "error":
      message = errorMessage ?? "Something went wrong. Please try again.";
      break;
  }

  const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <section className="starter-panel" aria-labelledby="weather-state-title">
      <h2 id="weather-state-title">Search Status</h2>
      <p>Current state of the weather lookup.</p>

      <div className="weather-state-content">
        <div className={`starter-chip weather-status-chip weather-status-${status}`}>
          {formattedStatus}
        </div>
        <p>{message}</p>
      </div>
    </section>
  );
}
