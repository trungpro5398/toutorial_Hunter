# Snake Split

## What this project does
This project is a Snake game written in Javascript->TypeScript.
The code was split from a single-file JavaScript version into a small multi-file project in Typescript.

## How to run it
1. Install dependencies:
   npm install

2. Start the game:
   npm run dev

## Folder structure
src/
  config/     -> game constants such as board size, speed, and directions
  types/      -> shared TypeScript type definitions
  utils/      -> helper functions
  game/       -> core game logic 
  render/     -> board rendering
  state/      -> initial game state creation
  input/      -> keyboard controls
  runner.ts   -> main entry point and game loop

## Main file responsibilities
- constants.ts: stores game configuration values
- game.ts: stores shared types like Position, Direction, and GameState
- helpers.ts: stores helper functions
- movement.ts: computes next head position and updates snake movement
- collision.ts: checks whether snake hits its body
- food.ts: spawns food in a valid random location
- speed.ts: computes the game speed from the score
- board.ts: renders the board as text
- initialState.ts: creates the initial game state
- controls.ts: handles keyboard input
- runner.ts: coordinates the game loop, rendering, and state updates
