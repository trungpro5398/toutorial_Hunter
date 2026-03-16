# Session 6: React useState - Todo CRUD + Controlled Input

This folder contains the teaching package for Session 6.

## Main Topic

The main lesson for this session is:

- `useState`
- controlled input
- immutable state updates
- add with spread syntax
- delete with `filter`
- simple validation with `trim()`
- correct `key` usage for dynamic lists

## Recommended Prerequisite

Students should already know:

- how to run a React app
- basic JSX
- event handlers such as `onClick` and `onChange`
- what a component is

## Files

- `LESSON_GUIDE.md`
  - Full lesson guide for teaching the session in English.

- `HOMEWORK.md`
  - Homework brief, requirements, and pass criteria.

- `HOMEWORK_README_TEMPLATE.md`
  - Starter structure for the required homework README.

- `SLIDING_WINDOW_GUIDE.md`
  - Recommended next algorithm lesson after this session.

- `sliding_window_examples.js`
  - Runnable examples for the next algorithm lesson.

- `todo_demo/`
  - Small React reference app for class demo and homework reference.

## Commands

Run the React demo:

```bash
cd "/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session 6/todo_demo"
npm install
npm run dev
```

Build the React demo:

```bash
cd "/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session 6/todo_demo"
npm run build
```

Run the sliding window examples:

```bash
cd "/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session 6"
node sliding_window_examples.js
```

## Suggested Teaching Flow

1. Start with `LESSON_GUIDE.md`
2. Live-code or walk through `todo_demo/`
3. Assign `HOMEWORK.md`
4. Give students `HOMEWORK_README_TEMPLATE.md`
5. Preview the next algorithm with `SLIDING_WINDOW_GUIDE.md`

## Why Sliding Window Should Be Next

The best next algorithm after the current sequence is **Sliding Window**.

Why:

- it is the natural follow-up to Two Pointers
- it teaches students to maintain a running range instead of recomputing from scratch
- it is used constantly in substring and subarray problems
- it keeps the difficulty moderate before moving to heavier topics like stacks, binary search, or graphs

In other words:

> Prefix sums teaches precompute once. Two pointers teaches move positions smartly. Sliding window teaches maintain a changing range efficiently.
