# Session 8 Homework

## Goal

Build one small React app with `useState` and `useEffect`, and solve one stack problem in JavaScript.

This homework has two parts because both skills were taught in class:

- React side effects
- stack / monotonic stack thinking

## Part A: React Homework

Build a small app of your choice. Good options:

- study planner
- notes app
- reading tracker
- workout list

### Required React Features

- use at least 2 `useState` values
- one controlled input
- one array in state
- add one item immutably
- delete or toggle one item immutably
- one `useEffect` that syncs something outside React
- one `useEffect` with cleanup

### Acceptable `useEffect` ideas

- update `document.title`
- save array data to localStorage
- run a live clock with `setInterval`
- attach and clean up an event listener

### Important Rules

- do not put side effects directly in render
- if you start an interval, clean it up
- if the effect uses a value, make sure the dependency array matches

## Part B: Stack Homework

Choose one option.

## Option A: Valid Parentheses (Beginner)

### Problem

Implement:

```js
function isValidParentheses(s) {
  // your code here
}
```

Return `true` if brackets are balanced and correctly nested.

### Required Test Cases

1. `"()"` -> `true`
2. `"()[]{}"` -> `true`
3. `"(]"` -> `false`

## Option B: Remove Adjacent Duplicates (Beginner+)

### Problem

Given a string, remove adjacent duplicate characters repeatedly until no duplicates remain.

Implement:

```js
function removeDuplicates(s) {
  // your code here
}
```

Example:

```text
"abbaca" -> "ca"
```

### Why Stack Fits

If the current character matches the top of the stack, remove the top instead of keeping both.

### Required Test Cases

1. `"abbaca"` -> `"ca"`
2. `"azxxzy"` -> `"ay"`
3. `"a"` -> `"a"`

## Option C: Daily Temperatures (Intermediate)

### Problem

Implement:

```js
function dailyTemperatures(temperatures) {
  // your code here
}
```

Return an array where each position tells how many days until a warmer temperature.

### Required Test Cases

1. `[73, 74, 75, 71, 69, 72, 76, 73]` -> `[1, 1, 4, 2, 1, 1, 0, 0]`
2. `[30, 40, 50, 60]` -> `[1, 1, 1, 0]`
3. `[30, 60, 90]` -> `[1, 1, 0]`

## Required Deliverables

- your React app source code
- one `.js` file for the stack problem
- `README.md`

## README Must Include

- what your React app does
- which state values you used
- which effects you used and why
- where cleanup happens
- which stack problem you chose
- why stack fits that problem
- 3 manual test cases with expected and actual output

Students may use `HOMEWORK_README_TEMPLATE.md`.

## Pass Criteria

- React app runs
- input is controlled
- state updates are immutable
- at least one effect syncs something outside React
- at least one effect includes cleanup when needed
- stack solution works correctly
- README is complete and clear

## Common Failure Cases

### Failure 1: Side effect inside render

Bad:

```jsx
localStorage.setItem("notes", JSON.stringify(notes));
return <main>...</main>;
```

This should move into `useEffect`.

### Failure 2: Interval without cleanup

If an interval is started, it must be cleared.

### Failure 3: Mutating state directly

Bad:

```js
tasks.push(newTask);
setTasks(tasks);
```

Good:

```js
setTasks((prevTasks) => [...prevTasks, newTask]);
```

### Failure 4: Using a loop but not stack logic

If the chosen algorithm is a stack problem, the solution should actually use stack operations.
