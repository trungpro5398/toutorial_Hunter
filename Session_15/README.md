# Session 15 — Backtracking Pruning / Grid Search / String Partition / Constraints

## Main Topics

- When to stop early
- Pruning
- String partition backtracking
- Grid backtracking
- Constraint backtracking

## Why Session 15 Follows Session 14

Session 14 teaches the basic backtracking shapes:

- choose / skip
- loop expansion
- permutations
- duplicates

The next useful step is stronger control:

- stop bad branches early
- search on boards and strings
- handle constraints directly

This is where backtracking starts to feel powerful.

## What This Session Teaches

Students will learn how to:

1. understand pruning
2. backtrack on strings by cutting partitions
3. backtrack on grids by marking and restoring
4. handle strong constraints like columns and diagonals
5. see why some brute-force trees can be reduced dramatically

## Files In This Session

- `LESSON_GUIDE.md`: teaching guide for the session
- `backtracking_advanced_examples.js`: optional runnable companion examples

## How To Run The Examples

```bash
cd "/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session_15"
node backtracking_advanced_examples.js
```

For teaching, the main file to open is:

- `LESSON_GUIDE.md`
