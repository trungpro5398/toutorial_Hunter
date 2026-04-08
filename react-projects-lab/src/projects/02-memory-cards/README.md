# Project 02 - Memory Cards

## Goal

Build a memory card game to practice array state, derived state, and locking interactions while the UI compares two cards.

## Requirements

- Create card seed data in `constants/`, then shuffle it when a new game starts.
- Use `useState` to manage cards, selected card ids, matched card ids, move count, and game status.
- Allow a maximum of two selected cards per turn.
- If two cards do not match, flip them back after a short delay.
- When all cards are matched, show the completed state.
- Include a Reset button to start a new game.

## Suggested Structure

```text
02-memory-cards/
  components/     CardGrid, MemoryCard, GameSummary
  constants/      card seed data
  hooks/          useMemoryCards
  types/          Card, GameStatus
  utils/          shuffleCards, buildDeck
```
