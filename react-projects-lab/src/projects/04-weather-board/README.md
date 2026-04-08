# Project 04 - Weather Board

## Goal

Build a weather lookup screen to practice async state, loading state, and error state.

## Requirements

- Include a search form for entering a city name.
- Do not submit when the query is empty.
- Move the API client into `utils/` or `services/` when connecting a real API.
- Use clear states for idle, loading, success, empty, and error.
- Display the main weather fields: city, temperature, condition, and humidity.
- Do not hard-code API keys inside components.

## Suggested Structure

```text
04-weather-board/
  components/     WeatherSearch, WeatherResult, WeatherStateMessage
  constants/      default city, UI labels
  hooks/          useWeatherSearch
  types/          WeatherResult, RequestStatus
  utils/          weatherClient, normalizeWeather
```
