# Session 13 — Advanced Dynamic Programming / Pattern Recognition / Space Optimization

## Main Topics

- Why doing more random DP problems is not enough
- The next DP patterns after Session 12
- Knapsack-style DP
- Subsequence and string DP
- Space optimization
- How to think in patterns instead of isolated formulas

## Why Session 13 Follows Session 12

Session 12 teaches the foundation:

- what DP is
- how to define a state
- how to write transitions
- memoization and tabulation
- beginner-to-intermediate DP examples

After that point, the best next step is **not**:

- just assigning more random DP problems

The best next step is:

- organizing DP into major reusable patterns
- teaching students how to recognize which pattern a new problem belongs to

This is what starts turning “I can solve some DP problems” into:

> I know how to approach new DP problems without guessing.

## What This Session Teaches

Students will learn how to:

1. recognize major DP families
2. tell the difference between subset DP, sequence DP, and string DP
3. understand when 2D DP is necessary
4. apply space optimization safely
5. build a stronger path toward DP mastery

## Files In This Session

- `LESSON_GUIDE.md`: teaching guide for the session
- `advanced_dp_examples.js`: optional runnable companion for the examples already taught in `LESSON_GUIDE.md`

## How To Run The Examples

```bash
cd "/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session_13"
node advanced_dp_examples.js
```

The script is written to show:

- what DP pattern the problem belongs to
- how to discover the right state
- why that pattern is useful beyond one problem

For teaching, the main file to open is:

- `LESSON_GUIDE.md`
