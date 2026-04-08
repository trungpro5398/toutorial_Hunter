# Project 01 - Snake Game

## Goal

This is a blank student exercise. The folder already has structure and function placeholders, but it does not include game logic.

## Requirements

- Use `useState` to manage snake positions, food position, direction, queued direction, score, best score, and game status.
- Use `useEffect` to listen for keyboard events and clean up the listener when the component unmounts.
- Use `useEffect` to run the interval-based game loop, and clean up the interval when the game is paused, lost, or unmounted.
- Grow the snake when it eats food.
- End the game when the snake hits a wall or its own body.
- Include Start, Pause, Resume, Reset, and keyboard shortcuts.
- Display score, best score, status, and play instructions.

## Student Rules

- Do not write the entire game inside `SnakeGamePage.tsx`.
- Put the main state and effects in `hooks/useSnakeGame.ts`.
- Put calculation helpers in `utils/snake.ts`.
- Put the board and controls UI in `components/`.

## Structure

```text
01-snake-game/
  components/     SnakeBoard and SnakeControls
  constants/      Board size, speed, and initial snake data
  hooks/          useSnakeGame placeholder for students to implement
  styles/         Project-specific Snake CSS
  types/          TypeScript types for the game
  utils/          Helper placeholders for collisions, food, and board cells
  SnakeGamePage.tsx
```

## CSS Placement

- Put Snake-only styles in `styles/snakeGame.css`.
- Keep shared tokens, app shell styles, project grid styles, and reusable requirement panel styles in `src/styles/global.css`.
- If a selector starts with `snake-`, `game-`, `control-`, `metric-`, or belongs only to this exercise page, it should stay inside the Project 01 folder.
