# Session 2: Snake Console Package

This folder contains the teaching materials and code files for Session 2.

## Files

- `LESSON_GUIDE.md`
  - Lecture-ready teaching notes in English.
  - Use this while teaching the session.

- `snake_full.js`
  - Full reference solution.
  - Includes: input, update, render, wrap-around, grow, self-collision, score, speed increase, pause, restart, and debug trace.

- `snake_taught_so_far.js`
  - The "covered in class" checkpoint version.
  - Includes the MVP flow that students should understand before homework.
  - Deliberately keeps homework upgrades out of the main logic.

- `snake_guided.js`
  - Live-coding skeleton for class.
  - Students fill the `TODO` functions step by step during the lesson.

- `snake_homework.js`
  - Homework worksheet with function-only skeletons.
  - This file is the student exercise file.
  - It keeps helper code visible and hides only the target function logic.

- `snake_homework_test.js`
  - Test runner for `snake_homework.js`.
  - Students can run this immediately, even if some functions still have `TODO` errors.
  - The test runner reports `PASS`, `FAIL`, and `TODO` separately.

- `snake_homework_game.js`
  - Playable game runner for `snake_homework.js`.
  - If a homework function is still `TODO`, the game uses a temporary fallback only for that function.
  - This lets students keep seeing the game while they complete the missing parts one by one.

- `snake_homeworks.js`
  - Progressive exercise game in one file.
  - The board, snake, food, input handling, and rendering are already complete.
  - Only the student logic functions are `TODO`.
  - If a function is still `TODO`, that feature is skipped instead of using hidden fallback code.
  - This is the clearest option when you want students to see exactly which features they have implemented.

## How To Run In The Console

Open Terminal and run:

```bash
cd "/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session 2"
```

Run the full reference:

```bash
node snake_full.js
```

Run the "taught so far" MVP checkpoint:

```bash
node snake_taught_so_far.js
```

Run the guided teaching skeleton:

```bash
node snake_guided.js
```

Notes:

- `snake_guided.js` will only work after the `TODO` functions are filled in.
- `snake_homework.js` is a function worksheet, not a runnable game by itself.
- `snake_homework_test.js` is the correct way to test the homework file.

Run the homework tests:

```bash
node snake_homework_test.js
```

Run the playable homework game:

```bash
node snake_homework_game.js
```

Run the progressive single-file homework game:

```bash
node snake_homeworks.js
```

## Controls For Runnable Files

- `W`, `A`, `S`, `D` or arrow keys: move
- `P`: pause / resume
- `T`: toggle debug trace
- `R`: restart
- `Q`: quit

## Teaching Recommendation

1. Teach with `LESSON_GUIDE.md`.
2. Live-code in `snake_guided.js`.
3. Show the checkpoint result in `snake_taught_so_far.js`.
4. Share `snake_homework.js` for homework.
5. Use `snake_full.js` as the final reference after review.
