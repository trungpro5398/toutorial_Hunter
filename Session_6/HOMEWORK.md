# Session 6 Homework

## Goal

Build a Todo web app in React that supports:

- add todo
- delete todo
- Enter-to-submit
- blocking empty input

The purpose is to train clean `useState` habits:

- immutable array updates
- controlled input
- simple validation
- stable list keys

## What This Homework Trains

This homework trains a very common frontend pattern:

- user enters data
- UI state stores that data
- the app validates the input
- the app updates a list immutably
- the UI re-renders from the new state

This matters because the same pattern appears in many real products:

- comments
- tasks
- tags
- cart items
- settings lists
- mobile `FlatList` screens

## Core Skills Being Trained

- `useState`
- controlled forms
- immutable updates with spread
- delete with `filter`
- basic validation with `trim()`
- debugging state transitions

## Required Features

- one controlled text input
- one add button
- pressing `Enter` submits the form
- empty or whitespace-only input is rejected
- a visible validation message for invalid submit
- a rendered todo list
- one delete button per todo item
- stable key for each row using todo `id`

## Required Implementation Rules

- use React function components
- use `useState`
- add todos with spread syntax
- delete todos with `filter`
- do not mutate state arrays
- do not use `index` as the React `key`
- do not read the input with `document.querySelector`

## Recommended State Shape

```js
const [draft, setDraft] = useState("");
const [todos, setTodos] = useState([]);
const [error, setError] = useState("");
```

Students may add more state if the reason is clear.

## Required Deliverables

- source code for the React app
- `README.md`
- one screenshot of the UI

## README Must Include

- what the project does
- how to run it
- 3 manual test cases
- one UI screenshot
- one short note explaining how immutable state was handled

Students may use `HOMEWORK_README_TEMPLATE.md` as a starting point.

## Suggested Manual Test Cases

Students should write their own wording, but the README must cover cases like:

1. Add a normal todo such as `"Buy milk"` and confirm it appears in the list.
2. Press Enter with empty or whitespace-only input and confirm the todo is not added.
3. Delete one todo from the list and confirm the correct row disappears.

## Pass Criteria

- the app runs
- add works
- delete works
- Enter submit works
- whitespace-only input is blocked
- the input is controlled by state
- the list uses stable keys
- array state updates are immutable
- the README is complete

## Optional Stretch Goals

- show an empty-state message when there are no todos
- show a total count
- disable the button when the trimmed input is empty
- seed the app with 2 or 3 starter todos
- add a clear-all button with immutable update logic

## Common Failure Cases

### Failure 1: Mutating The Existing Array

Example:

```js
todos.push(newTodo);
setTodos(todos);
```

This is not acceptable.

### Failure 2: Allowing Blank Todos

Example:

- `"   "` is added to the list

This is not acceptable.

### Failure 3: Using `index` As `key`

This is not acceptable for a dynamic list homework.

### Failure 4: Separate Enter Logic And Click Logic

If Enter and button click use different logic paths, bugs become more likely.

Preferred solution:

- use one `<form onSubmit={...}>`

## Why This Homework Matters

This homework trains one of the most common UI patterns in frontend development.

Students who can do this cleanly will make fewer bugs later when building:

- React forms
- admin tables
- comment lists
- mobile `FlatList` screens
