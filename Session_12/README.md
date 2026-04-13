# Session 12 — Dynamic Programming / Memoization / Tabulation

## Main Topics

- What dynamic programming is
- Overlapping subproblems
- Recursion to memoization
- Memoization to tabulation
- 1D DP, 2D DP, and state design

## Why Session 12 Follows Session 11

Session 11 teaches recursion-heavy tree thinking:

- divide the problem into smaller parts
- trust recursive sub-results
- combine answers from child states

Dynamic programming is the next major step because it teaches students how to:

- notice repeated work
- save previous answers
- define a state clearly
- build from small subproblems to larger answers

If recursion says:

> solve smaller versions of the same problem

then dynamic programming says:

> solve each important smaller version once, then reuse it

## What This Session Teaches

Students will learn how to:

1. explain dynamic programming in plain English
2. identify overlapping subproblems
3. move from brute force recursion to memoization
4. convert memoization into tabulation
5. design DP states and transitions
6. recognize common DP patterns

## Files In This Session

- `LESSON_GUIDE.md`: teaching guide for the session
- `DP_GUIDE.md`: DP notes with real-world examples
- `HOMEWORK.md`: homework with 4 medium DP problems
- `HOMEWORK_README_TEMPLATE.md`: submission template
- `dp_examples.js`: runnable examples with step-by-step traces and detailed “how to discover the DP idea” explanations

## How To Run The Examples

```bash
cd "/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session_12"
node dp_examples.js
```

The script is written to show:

- what each problem is asking
- how to think toward the DP state
- the clearest DP idea
- why the state transition works
- why this solution is the right one
