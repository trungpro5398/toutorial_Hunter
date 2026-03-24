# Todo Homework README Template

## Project Overview

Briefly explain what your app does.

Example:

> This React app lets users add and delete todo items. The input is controlled by `useState`, blank input is rejected, and each todo row uses a stable `id` key.

## How To Run

```bash
cd "/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session 6/todo_demo"
npm install
npm run dev
```

## Manual Test Cases

### Test Case 1: Add A Valid Todo

- Input: `Buy milk`
- Action: click Add
- Expected result: a new row with `Buy milk` appears

### Test Case 2: Reject Empty Input

- Input: `   `
- Action: press Enter
- Expected result: no new todo is added and an error message appears

### Test Case 3: Delete A Todo

- Input: existing todo row
- Action: click Delete
- Expected result: the correct row disappears

## UI Screenshot

Add one screenshot here.

Example:

```md
![Todo UI](./screenshot.png)
```

## Immutable State Note

Briefly explain how state is updated.

Example:

> I used `setTodos((prevTodos) => [...prevTodos, newTodo])` for add and `filter` for delete so the original array is never mutated.
