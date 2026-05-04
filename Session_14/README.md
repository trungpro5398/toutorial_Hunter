# Session 14 — Backtracking Foundations / Decision Trees / Choose-Skip

## Main Topics

- What backtracking really is
- Decision tree thinking
- Choose / skip pattern
- For-loop expansion pattern
- Permutation pattern
- Duplicate handling basics

## Why Session 14 Comes After Session 13

After dynamic programming, the next very useful step is backtracking.

These two topics work well together:

- backtracking teaches how to explore choices
- DP teaches how to reuse repeated sub-results

Many harder problems are first understood as:

- brute force decision trees

and only later optimized into:

- memoization
- dynamic programming

So learning backtracking now gives a stronger understanding of:

- recursion
- decision trees
- pruning
- when brute force becomes DP

## What This Session Teaches

Students will learn how to:

1. think of a problem as a decision tree
2. understand choose / skip recursion
3. understand loop-based backtracking
4. understand permutation-style recursion with `used`
5. recognize when duplicates require special handling

## Files In This Session

- `LESSON_GUIDE.md`: teaching guide for the session
- `backtracking_examples.js`: optional runnable companion examples

## How To Run The Examples

```bash
cd "/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session_14"
node backtracking_examples.js
```

For teaching, the main file to open is:

- `LESSON_GUIDE.md`
