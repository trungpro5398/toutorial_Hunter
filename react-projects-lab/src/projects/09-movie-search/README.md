# Project 09 - Movie Search

## Goal

Build a movie search app to practice async search, result lists, and detail panels.

## Requirements

- Include a clear search form and submit action.
- Move the API client out of the component.
- Use state for idle, loading, success, empty, and error.
- Render a result list with title, year, and poster when available.
- Click a movie to open a detail panel or detail route.
- Do not commit API keys; use `.env` when connecting a real API.

## Suggested Structure

```text
09-movie-search/
  components/     MovieSearchForm, MovieResults, MovieDetail
  constants/      API config keys, placeholder data
  hooks/          useMovieSearch
  types/          Movie, MovieDetail, RequestStatus
  utils/          movieClient, normalizeMovie
```
