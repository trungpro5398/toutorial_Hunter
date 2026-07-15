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

## What This Code Demonstrates

### Async state

The app demonstrates async state through the weather search flow in `hooks/useWeatherSearch.ts`.

When the user submits a city, the app does not immediately assume the lookup has finished. Instead, it moves through clear request states:

```text
idle -> loading -> success / empty / error
```

This is demonstrated by setting `status` to `loading` before calling the async weather client, then waiting for the result with `await`. Once the lookup finishes, the hook updates the state to `success`, `empty`, or `error`.

This is useful because real API calls do not return instantly. The UI can show feedback while the request is running, keep the previous successful result visible, and clearly explain whether the search worked, returned no data, or failed.

Compared with synchronous code, this is more realistic for weather data. A synchronous lookup would return immediately and would not need a loading state. Async state is better here because it matches how real network requests behave.

### Merge sort

The raw weather data in `data/weatherData.ts` is intentionally unsorted. Before binary search can be used, the city list needs to be sorted.

That sorting happens in `data/sortedWeatherData.ts` using merge sort. The file imports the raw data, creates a sorted copy, and exports `sortedWeatherData`.

Merge sort is used because it has predictable `O(n log n)` performance and is easier to reason about than quicksort for this learning project. Quicksort can be fast, but a poor pivot strategy can degrade to `O(n²)`. Merge sort avoids that worst-case surprise.

The sorting is also done only once when the sorted data module is imported. It is not repeated every time the user searches.

### Binary search

The search logic in `services/weatherClient.ts` uses binary search on `sortedWeatherData`.

Binary search works by checking the middle item in the sorted array, then discarding half of the remaining search space each time. This is much faster than scanning every city one by one.

For 1000 cities:

```text
linear search: may check up to 1000 cities
binary search: checks about 10 cities
```

Binary search is used here because the app may perform many searches after the data has already been sorted once. That makes the flow efficient:

```text
raw unsorted data -> merge sort once -> binary search many times
```
