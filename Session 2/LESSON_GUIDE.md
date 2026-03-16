# Session 2: Snake Console (MVP to Homework)

## Lesson Purpose

This lesson teaches students how to think about a game as a state system that changes over time.

The goal is not just to "draw a snake."

The real goal is to help students understand:

- how a game loop works
- how to define state clearly
- how to update state in the correct order
- how to render a frame from state
- how to debug by observing changes across ticks

This lesson should be taught in English.

## Final Learning Outcome

By the end of the lesson, students should be able to:

- explain the `Input -> Update -> Render` loop
- describe the minimum state needed for Snake
- build the core helper functions
- run a basic Snake game in the terminal
- use tick logs to debug behavior
- understand what remains for homework

## Teacher Mindset

Teach this as a systems lesson, not a syntax lesson.

The main message for students:

> A game is a machine that updates state over time.

Students should leave the lesson with this mental model:

1. The state is the source of truth.
2. Every tick applies the same update pipeline.
3. Rendering is only a view of the state.
4. Bugs usually come from wrong state or wrong update order.

## Suggested Lesson Length

60 to 75 minutes

Recommended breakdown:

- Opening mindset: 2 minutes
- Problem framing: 5 minutes
- State design: 10 minutes
- Decomposition: 8 minutes
- Tick pipeline: 10 to 12 minutes
- Build checkpoints: 20 to 25 minutes
- Debugging: 8 to 10 minutes
- Homework briefing: 5 minutes

## 1. Opening (2 Minutes)

### What To Say

Start with this idea:

> Today we are not learning how to draw a snake. We are learning how to build a state-driven system that changes every tick.

Then explain:

- JavaScript is just the tool.
- The real solution is in the data model and the update rules.
- If the state is clear, coding becomes easier.
- If the update order is wrong, even correct syntax will still produce bugs.

### Teacher Goal

At this stage, students should stop thinking "Which code do I write first?" and start thinking "What is the state, and what changes each tick?"

## 2. Problem Framing (5 Minutes)

### What We Are Building

A console Snake game with:

- a fixed-size board
- a snake that moves automatically
- keyboard input to change direction
- food on the board
- score tracking
- frame-by-frame rendering in the terminal


### The Core Loop

The whole game runs in a loop:

```text
Input -> Update -> Render
```

### Explain Each Step

- `Input`: read what the player wants to do
- `Update`: compute the new state
- `Render`: show the current state as text in the terminal

### Why This Separation Matters

If these steps are mixed together:

- bugs become harder to trace
- code becomes harder to explain
- students will not know which part is responsible when something breaks

### Example: One Tick In Plain English

Suppose:

- the snake is moving right
- the player presses the down key

In one tick:

1. Input stores "down" as the next intended direction
2. Update applies that direction and computes the new head position
3. Render shows the new board

Important:

The input handler does not move the snake directly. It only stores intent.

## 3. Game Rules and Constraints (5 Minutes)

### Rules For This Lesson

- Board size is fixed
- Coordinates are zero-based
- Snake head is always `snake[0]`
- Wrap-around is enabled
- Reverse direction is blocked
- `tickMs` starts at `200`

### Coordinate System
a[0][0]
- `x` means column
- `y` means row
- `x` increases to the right
- `y` increases downward

### Example

On a `10 x 6` board:

- top-left is `(0, 0)`
- bottom-right is `(9, 5)`

### Visual Example

```text
(0,0) .................. (9,0)
  .                      .
  .                      .
(0,5) .................. (9,5)
```

### Character Mapping

Use these characters:

- empty: `.`
- food: `*`
- snake head: `@`
- snake body: `o`
- border: `#`

### Why `.` Is Better Than Blank Space In Class

For teaching, `.` is better because:

- students can see the full board
- empty cells are visible
- movement is easier to trace
- rendering bugs are easier to spot

## 4. State Design (10 Minutes)

### Teach State Before Code

Do not start by writing movement code.

First define the state object clearly.

### Minimum State

```js
{
  width,
  height,
  snake,
  dir,
  pendingDir,
  food,
  score,
  tickMs,
  tick,
  paused,
  gameOver,
  debug
}
```

### Explain Each Field

- `width`, `height`
  - board size
- `snake`
  - array of cells
  - each cell is `{ x, y }`
  - head is always at index `0`
- `dir`
  - the current direction used by the update logic
- `pendingDir`
  - the direction requested by the player
  - this keeps input separate from update
- `food`
  - the current target position
- `score`
  - increases when the snake eats food
- `tickMs`
  - how fast the loop runs
- `tick`
  - counts how many updates have happened
- `paused`
  - stops update while keeping render active
- `gameOver`
  - stops the game safely
- `debug`
  - enables trace logs

### Why `pendingDir` Is Important

This is one of the most important teaching points.

Without `pendingDir`, students often try to move the snake inside the keypress handler.

That creates:

- inconsistent updates
- race-condition-like behavior
- hard-to-explain bugs

### Example State

```js
{
  width: 10,
  height: 6,
  snake: [
    { x: 4, y: 2 }, [0]
    { x: 3, y: 2 }, [1]
    { x: 2, y: 2 }  [2]
  ],

  dir: { dx: 1, dy: 0 },
  pendingDir: { dx: 1, dy: 0 },
  food: { x: 7, y: 4 },
  score: 0,
  tickMs: 200,
  tick: 0,
  paused: false,
  gameOver: false,
  debug: false
}
```
a[4][2]

### Ask Students

Ask:

> If I remove the board array completely, can the game still work?

Expected answer:

Yes. The board does not need to be stored as state. The board can be generated from `snake` and `food` during rendering.


That is an important design lesson:

> Render output is derived data, not the source of truth.

## 5. Decomposition (8 Minutes)

### Teach Students To Split The Problem

Do not let students write one giant function.

Break the problem into focused functions:

- `getNextHead(head, dir, width, height, wrap)`
- `willHitBody(nextHead, snake, ateFood)`
- `moveSnake(snake, nextHead, ateFood)`
- `spawnFood(width, height, snake)`
- `renderBoard(width, height, snake, food)`
- `updateOneTick()`

### Why This Matters

Snake bugs are usually local:

- bad movement math
- bad collision logic
- bad grow logic
- bad rendering logic

If everything is in one function, students cannot isolate the bug.

If the logic is split, they can test one idea at a time.

### Teaching Line

Say:

> When we split code into small functions, we are not just organizing code. We are reducing the search area when debugging.

## 6. Core Functions With Input -> Output Examples (15 Minutes)

This section should be taught slowly.

Students should understand each function as a mini-problem.

### 6.1 `getNextHead(head, dir, width, height, wrap)`

#### Purpose

Compute the new head position after moving one step.

#### Inputs

- `head`: current head position
- `dir`: movement vector
- `width`, `height`: board size
- `wrap`: whether crossing a border moves to the opposite side

#### Output

A new `{ x, y }` object

#### Example 1: Basic Move

Input:

```js
head = { x: 4, y: 2 }
dir = { dx: 1, dy: 0 }
width = 10
height = 6
wrap = true
```

Output:

```js
{ x: 5, y: 2 }
```

#### Example 2: Horizontal Wrap

Input:

```js
head = { x: 9, y: 2 }
dir = { dx: 1, dy: 0 }
width = 10
height = 6
wrap = true
```

Output:

```js
{ x: 0, y: 2 }
```

#### Example 3: Vertical Wrap

Input:

```js
head = { x: 3, y: 0 }
dir = { dx: 0, dy: -1 }
width = 10
height = 6
wrap = true
```

Output:

```js
{ x: 3, y: 5 }
```

#### Teaching Note

This function should be pure.

It should:

- not modify the snake
- not modify the score
- not render anything

Its only job is to return the next head.

### 6.2 `willHitBody(nextHead, snake, ateFood)`

#### Purpose

Check whether the next head position will collide with the snake body.

#### Important Logic Detail

If the snake does not eat food, the tail will be removed this tick.

That means moving into the current tail cell can be legal.

This is a very common bug in Snake projects.

#### Example 1: Clear Body Collision

Input:

```js
snake = [
  { x: 2, y: 2 },
  { x: 1, y: 2 },
  { x: 1, y: 3 }
]
nextHead = { x: 1, y: 2 }
ateFood = true
```

Output:

```js
true
```

#### Example 2: Moving Into Tail Cell When Not Eating

Input:

```js
snake = [
  { x: 3, y: 2 },
  { x: 2, y: 2 },
  { x: 2, y: 3 }
]
nextHead = { x: 2, y: 3 }
ateFood = false
```

Output:

```js
false
```

Why?

Because the tail at `{ x: 2, y: 3 }` will be removed in the same tick.

#### Teaching Note

This is where update order really matters.

Students often get the collision result wrong because they forget that the tail may disappear.

### 6.3 `moveSnake(snake, nextHead, ateFood)`

#### Purpose

Return the new snake array after one move.

#### Rules

- always add `nextHead` to the front
- if `ateFood` is `false`, remove the tail
- if `ateFood` is `true`, keep the tail so the snake grows

#### Example 1: Normal Move

Input:

```js
snake = [
  { x: 2, y: 2 },
  { x: 1, y: 2 },
  { x: 0, y: 2 }
]
nextHead = { x: 3, y: 2 }
ateFood = false
```

Output:

```js
[
  { x: 3, y: 2 },
  { x: 2, y: 2 },
  { x: 1, y: 2 }
]
```

#### Example 2: Grow

Input:

```js
snake = [
  { x: 2, y: 2 },
  { x: 1, y: 2 },
  { x: 0, y: 2 }
]
nextHead = { x: 3, y: 2 }
ateFood = true
```

Output:

```js
[
  { x: 3, y: 2 },
  { x: 2, y: 2 },
  { x: 1, y: 2 },
  { x: 0, y: 2 }
]
```

### 6.4 `spawnFood(width, height, snake)`

#### Purpose

Create a new food cell that is not on the snake.

#### Simple MVP Strategy

Use a random retry loop:

1. generate random `{ x, y }`
2. check whether that cell is inside `snake`
3. if yes, retry
4. if no, return it

#### Example

Input:

```js
width = 5
height = 4
snake occupies:
(2,1), (2,2)
```

Valid outputs:

```js
{ x: 0, y: 0 }
{ x: 4, y: 3 }
{ x: 1, y: 2 }
```

Invalid outputs:

```js
{ x: 2, y: 1 }
{ x: 2, y: 2 }
```

### 6.5 `renderBoard(width, height, snake, food)`

#### Purpose

Build a multi-line string for the terminal.

#### Process

1. create a 2D grid filled with `.`
2. place `*` at the food position
3. place `o` for the body
4. place `@` for the head
5. add a border
6. join everything into one string

#### Example

Input:

```js
width = 10
height = 6
snake = [
  { x: 4, y: 2 },
  { x: 3, y: 2 },
  { x: 2, y: 2 }
]
food = { x: 7, y: 4 }
```

Output:

```text
############
#..........#
#..........#
#..oo@.....#
#..........#
#.......*..#
#..........#
############
```

## 7. The Tick Pipeline (Most Important Part) (10 to 12 Minutes)

This is the main teaching target of the whole session.

Students must understand that every tick follows the same fixed order.

### Standard Tick Order

1. Apply `pendingDir` to `dir`
2. Read the current head
3. Compute `nextHead`
4. Check whether the snake will eat food
5. Check whether the snake will hit its body
6. If it hits the body, set `gameOver = true`
7. Otherwise move the snake
8. If it ate food, increase score and spawn new food
9. Update speed (homework extension)
10. Render the board
11. Optionally print debug trace

### Why This Order Is Correct

- Direction must be applied before movement.
- Food must be checked before collision logic finishes, because it changes whether the tail moves.
- Movement must happen before rendering, or the frame will be behind the actual state.

### Common Wrong Orders

#### Wrong Order 1

Move first, then check food.

Problem:

- growth logic becomes harder to reason about
- the code may need awkward corrections after movement

#### Wrong Order 2

Render before updating.

Problem:

- students see the previous state instead of the current state
- the game feels one tick behind

#### Wrong Order 3

Move inside the keypress handler.

Problem:

- update order breaks
- game behavior becomes inconsistent
- debugging becomes much harder

### Full Tick Example Across 3 Ticks

Initial state:

```js
snake = [
  { x: 4, y: 2 },
  { x: 3, y: 2 },
  { x: 2, y: 2 }
]
dir = { dx: 1, dy: 0 } // right
pendingDir = { dx: 1, dy: 0 }
food = { x: 7, y: 4 }
score = 0
```

#### Tick 1 (No Input)

1. `dir` stays right
2. `head = { x: 4, y: 2 }`
3. `nextHead = { x: 5, y: 2 }`
4. `ateFood = false`
5. `hitBody = false`
6. move snake

New snake:

```js
[
  { x: 5, y: 2 },
  { x: 4, y: 2 },
  { x: 3, y: 2 }
]
```

#### Tick 2 (Input: Down)

Input handler sets:

```js
pendingDir = { dx: 0, dy: 1 }
```

Then the tick runs:

1. apply `pendingDir`
2. `dir = down`
3. `head = { x: 5, y: 2 }`
4. `nextHead = { x: 5, y: 3 }`
5. `ateFood = false`
6. `hitBody = false`
7. move snake

New snake:

```js
[
  { x: 5, y: 3 },
  { x: 5, y: 2 },
  { x: 4, y: 2 }
]
```

#### Tick 3 (Input: Left)

Input handler sets:

```js
pendingDir = { dx: -1, dy: 0 }
```

Then the tick runs:

1. apply `pendingDir`
2. `dir = left`
3. `head = { x: 5, y: 3 }`
4. `nextHead = { x: 4, y: 3 }`
5. `ateFood = false`
6. `hitBody = false`
7. move snake

New snake:

```js
[
  { x: 4, y: 3 },
  { x: 5, y: 3 },
  { x: 5, y: 2 }
]
```

## 8. Input Handling (8 Minutes)

### Rule: Input Should Only Set Intent

The keypress handler should only change `pendingDir`.

It should not:

- move the snake
- update the score
- render the frame
- modify multiple game systems at once

### Direction Mapping

- `W` or `Up`: `{ dx: 0, dy: -1 }`
- `S` or `Down`: `{ dx: 0, dy: 1 }`
- `A` or `Left`: `{ dx: -1, dy: 0 }`
- `D` or `Right`: `{ dx: 1, dy: 0 }`

### Reverse Direction Blocking

Students must understand this rule:

The snake cannot reverse directly into itself.

#### Example

Current direction:

```js
{ dx: 1, dy: 0 } // right
```

Input:

```js
{ dx: -1, dy: 0 } // left
```

Result:

Ignore the input and keep moving right.

### Why Compare Against `pendingDir`

This is a subtle but useful teaching detail.

If the player presses keys quickly inside one tick, comparing against `pendingDir` helps preserve valid quick turns more cleanly.

## 9. Build Sequence: Checkpoints (20 to 25 Minutes)

This is the recommended coding order.

The rule is simple:

> Every checkpoint must run before moving to the next one.

### Checkpoint 1: Render Empty Board

Goal:

- print a header
- print a bordered board filled with `.`

Expected result:

```text
Score: 0 | Speed: 200ms
############
#..........#
#..........#
#..........#
#..........#
############
```

Teaching point:

Before we animate anything, we first prove that rendering works.

### Checkpoint 2: Render Static Snake And Food

Goal:

- show one snake
- show one food cell

Expected result:

```text
############
#..........#
#..oo@.....#
#..........#
#.....*....#
############
```

Teaching point:

Students should see that the board is generated from state, not stored permanently.

### Checkpoint 3: Auto-Move With No Input

Goal:

- move the snake right every tick
- render each frame

Expected observation:

- the snake moves one cell each tick
- the body follows the head
- the board re-renders repeatedly

Teaching point:

This is the first time students truly see the game loop.

### Checkpoint 4: Add Input

Goal:

- use keypress input
- update `pendingDir`
- block reverse direction

Expected observation:

- pressing keys changes direction on the next tick
- pressing the opposite direction is ignored

Teaching point:

This shows why the input handler must be simple and safe.

### Checkpoint 5: Add Food And Score

Goal:

- detect when the head lands on food
- increase score
- spawn new food

Expected observation:

- score increases by `1`
- new food appears in a different valid cell

Teaching point:

Show students that game features are just more state updates in the same pipeline.

### Checkpoint 6: Debug Pass

Goal:

- toggle debug trace
- run for 30 to 60 seconds without crashing

Expected observation:

- trace logs describe each tick clearly
- the board and the trace agree with each other

Teaching point:

A working game is good. A debuggable game is better.

## 10. Debugging: How To Think Like A Developer (8 to 10 Minutes)

### Teach Debugging As Observation Over Time

Snake is perfect for showing time-based debugging.

Students should not guess.

Students should inspect what happens on each tick.

### Tick Trace Format

Use a trace like this:

```text
tick=12 dir=R head=(4,2) next=(5,2) ate=false len=3 score=0 ms=200
```

### Explain Each Part

- `tick=12`
  - which update cycle this is
- `dir=R`
  - direction used for this tick
- `head=(4,2)`
  - current head before movement
- `next=(5,2)`
  - computed next head
- `ate=false`
  - whether food will be eaten
- `len=3`
  - snake length after the move
- `score=0`
  - score after update
- `ms=200`
  - next tick speed

### Example Trace Across 3 Ticks

```text
tick=1 dir=R head=(4,2) next=(5,2) ate=false len=3 score=0 ms=200
tick=2 dir=D head=(5,2) next=(5,3) ate=false len=3 score=0 ms=200
tick=3 dir=L head=(5,3) next=(4,3) ate=false len=3 score=0 ms=200
```

### Dry-Run Table

When a bug appears, ask students to fill this table:

| Tick | Dir | Head | Next Head | Ate Food | Len Before | Len After | Note |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | R | (4,2) | (5,2) | false | 3 | 3 | normal move |
| 2 | D | (5,2) | (5,3) | false | 3 | 3 | turned down |
| 3 | L | (5,3) | (4,3) | false | 3 | 3 | turned left |

### Assertions To Recommend

In development mode, check these:

- food is not on the snake
- snake cells are unique
- head is still inside bounds after wrapping

### Why Assertions Matter

Some bugs do not show visually at first.

Assertions catch invalid state at the exact tick where it first appears.

That makes debugging much faster.

## 11. Common Bugs And How To Teach Students To Find Them

### Bug 1: Snake "Teleports" Incorrectly

Likely cause:

- wrap logic is wrong

What to inspect:

- `getNextHead`
- border-crossing examples

### Bug 2: Snake Does Not Grow After Eating

Likely cause:

- `moveSnake` still removes the tail
- `ateFood` is computed too late

What to inspect:

- whether `ateFood` becomes `true` before movement
- whether `pop()` still runs on food ticks

### Bug 3: Snake Dies When Entering The Current Tail Cell

Likely cause:

- body collision checks the whole snake even when not eating

What to inspect:

- `willHitBody`
- whether the last tail cell is excluded when `ateFood` is `false`

### Bug 4: Food Spawns On The Snake

Likely cause:

- no validation in `spawnFood`

What to inspect:

- random candidate check
- collision against all snake cells

### Bug 5: Direction Feels Random Or Too Fast

Likely cause:

- snake is moved inside the input handler

What to inspect:

- keypress handler
- whether it only updates `pendingDir`

## 12. What The Student Should Understand By The End Of Class

Before homework, students should already understand:

- the state object
- the tick pipeline
- rendering from state
- direction handling with `pendingDir`
- why update order matters
- how to read trace logs

They do not need to finish every final feature during the live lesson.

The key success metric is:

> They understand the system and can explain the update flow.

## 13. Homework Briefing (5 Minutes)

### Homework Goal

Upgrade the classroom MVP into a more complete Snake game.

### Must-Have Features

- grow when the snake eats food
- lose when the snake hits its body
- wrap-around on all four sides
- increase speed based on score
- explain the tick pipeline in the README
- include manual test cases in the README

### Suggested Speed Rule

- start at `200ms`
- every `2` points, reduce by `15ms`
- minimum `80ms`

### Required Deliverables

Inside `session-02-homework/`:

- `snake.js`
- `README.md`

### README Must Include

- controls
- state definition
- ordered tick pipeline
- edge cases handled
- one debug trace example
- manual test cases in `Action -> Expected Result` format

### Manual Test Examples

#### Test 1: Eat And Grow

Action:

Guide the snake to eat food two times.

Expected result:

- length increases by `1` each time
- score increases correctly
- new food does not spawn on the snake

#### Test 2: Self-Collision

Action:

Turn the snake into its own body.

Expected result:

- game ends
- loop stops updating
- the terminal shows `Game Over: hit body`

#### Test 3: Wrap-Around

Action:

Move past the right edge.

Expected result:

- head goes from `(width - 1, y)` to `(0, y)`

Action:

Move past the top edge.

Expected result:

- head goes from `(x, 0)` to `(x, height - 1)`

#### Test 4: Speed Increase

Action:

Eat enough food to reach `4` points.

Expected result:

- `tickMs` decreases based on the rule
- the header shows the updated speed

## 14. How To Use The Files In This Folder

### Teaching Order

Use the files in this order:

1. `snake_guided.js`
   - live coding during class
2. `snake_taught_so_far.js`
   - show the checkpoint result
3. `snake_homework.js`
   - give students the homework worksheet
4. `snake_full.js`
   - reveal after students attempt the homework

### Why This Order Works

- students first build the mental model
- then they see the structured implementation
- then they practice by filling missing logic
- only after that do they compare with the full reference

## 15. Console Commands

Move into the folder:

```bash
cd "/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session 2"
```

Run the guided teaching file:

```bash
node snake_guided.js
```

Run the classroom checkpoint version:

```bash
node snake_taught_so_far.js
```

Run the full reference solution:

```bash
node snake_full.js
```

## 16. Final Teaching Summary

If students only remember three ideas from this session, they should be these:

1. The state is the source of truth.
2. Every tick must follow the correct update order.
3. Debugging means observing state changes over time.

That is the real lesson.

The Snake game is just the vehicle.
