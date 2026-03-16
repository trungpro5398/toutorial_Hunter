# Session 6: React useState - Todo CRUD + Controlled Input

## Lesson Purpose

This lesson teaches students how to manage UI state correctly in React with `useState`.

The goal is not only to "build a todo app."

The real goal is to train these habits:

- treat state as the source of truth
- update arrays immutably
- make form inputs controlled by React state
- validate before updating state
- render lists with stable keys
- debug state transitions instead of guessing

This lesson should be taught in English.

## Final Learning Outcome

By the end of the session, students should be able to:

- explain why Hooks were added to React at a beginner level
- explain why React state must be updated immutably
- build a controlled text input with `value` and `onChange`
- add a todo item with spread syntax
- delete a todo item with `filter`
- block empty or whitespace-only input
- submit a form by pressing `Enter`
- explain why `todo.id` is a better `key` than array index
- debug `before` and `after` state for each action

## Why This Session Matters

This is one of the most common UI patterns in frontend work:

- user types into a field
- the app stores that value in state
- the app validates the value
- the app adds it to a list
- the app removes an item from the list later

That pattern appears in:

- todo apps
- shopping carts
- tag inputs
- comments
- admin tables
- settings screens
- mobile `FlatList` screens

The message for students:

> Most screens are just state changing in response to user actions.

## Why Hooks Exist

Students should hear this before `useState` syntax starts.

### The Beginner-Level Story

Before Hooks:

- React often used class components for state
- function components were mostly used for simpler UI rendering
- stateful logic was harder to reuse cleanly

Hooks changed that.

Now function components can use:

- state
- effects
- reusable logic

without switching to class syntax.

### What `useState` Solves

`useState` gives a function component memory across renders.

That means the component can remember:

- the current input text
- the todo list
- whether there is an error message
- whether a modal is open
- whether a tab is active

### Teaching Line

Say:

> `useState` is what lets a function component remember data after each render.

### Simple Real Examples

Do not stay abstract. Show that the same hook idea appears in many screens:

- counter: current count
- todo input: current draft text
- modal: open or closed
- tabs: active tab id
- accordion: which section is expanded

### What Existed Before Hooks

At a beginner level, students only need to know:

- `this.state`
- `this.setState(...)`
- class components

They do not need deep history in this session.

One short contrast is enough:

```jsx
class Counter extends React.Component {
  state = { count: 0 };

  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        {this.state.count}
      </button>
    );
  }
}
```

Compared with:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

### Why This Context Helps

Without this explanation, students may treat `useState` like random syntax.

With this explanation, they can understand:

- what problem Hooks solved
- why function components became the normal default
- why state is now taught early in React

## Teacher Mindset

Teach this as a state transition lesson, not as a "button wiring" lesson.

Students should leave with this mental model:

1. UI reads from state.
2. User events request a state change.
3. Each action returns a new state value.
4. React re-renders from the new state.

If students only memorize syntax like `setTodos(...)`, they will still create bugs.

The real skill is:

> Think in `previous state -> next state`.

## Suggested Lesson Length

60 to 75 minutes

Recommended pacing:

- Opening mindset: 5 minutes
- Problem framing and state design: 10 minutes
- controlled input: 10 minutes
- immutable add flow: 12 minutes
- delete flow: 10 minutes
- list keys and validation: 8 minutes
- debugging state transitions: 10 minutes
- homework briefing: 5 minutes

## 1. Opening Mindset

Start with this:

> In React, the UI is not the source of truth. State is the source of truth.

Then explain:

- the input box should show whatever state says
- the list should show whatever state says
- clicking add or delete should create a new state
- React updates the screen after state changes

### Teacher Goal

Students should stop thinking:

> "How do I change the DOM?"

and start thinking:

> "What state should change, and what UI should that state produce?"

### Recommended Opening Sequence

Use this order:

1. explain why Hooks exist
2. explain what `useState` lets a function component remember
3. move into the Todo example

This gives students a reason before syntax.

## 2. Problem Framing

### What We Are Building

A small Todo app with:

- one text input
- one add button
- Enter-to-submit
- a todo list
- one delete button per item
- simple validation for empty input

### Minimum State

For this lesson, keep the state small and explicit:

```js
const [draft, setDraft] = useState("");
const [todos, setTodos] = useState([
  { id: 1, text: "Review immutable updates" },
  { id: 2, text: "Build add/delete flow" },
]);
const [error, setError] = useState("");
```

### Explain Each State Field

- `draft`
  - the current value inside the input box
- `todos`
  - the rendered list
- `error`
  - a validation message shown to the user

### Important Separation

Do not store things that can be derived easily.

For example:

- `todos.length` can be derived from `todos`
- `isEmpty` can be derived from `draft.trim() === ""`

This keeps state smaller and easier to trust.

## 3. Controlled Input

### Core Idea

A controlled input means:

- React state holds the value
- the input reads from that state
- typing calls `onChange`
- `onChange` updates the state

### Standard Pattern

```jsx
<input
  value={draft}
  onChange={(event) => setDraft(event.target.value)}
/>
```

### Why This Matters

Because then:

- the input value is always visible in state
- validation becomes easier
- clearing the input becomes easy
- debugging becomes easier

### What Not To Teach

Do not teach beginners to read input text with:

```js
document.querySelector("input").value
```

That bypasses the React mental model.

The correct mental model is:

> The input shows state, not the other way around.

## 4. Immutable State

### The Rule

Never mutate React state directly.

For arrays, avoid mutating methods such as:

- `push`
- `pop`
- `splice`
- `sort` on the original array

### Wrong Example

```js
todos.push(newTodo);
setTodos(todos);
```

Why this is wrong:

- the old array was changed directly
- React may not detect the change correctly
- debugging becomes harder because `before` was destroyed

### Correct Example

```js
setTodos((prevTodos) => [...prevTodos, newTodo]);
```

This is better because:

- `prevTodos` stays untouched
- a new array is returned
- `before` and `after` are easy to compare

### Teaching Line

Say:

> Mutation destroys your evidence. Immutable updates preserve the old state so you can reason about the change.

## 5. Add Flow

### Teaching Goal

Students should see that "add todo" is not one line of magic.

It is a sequence:

1. read the current draft
2. trim whitespace
3. validate
4. create a new todo object
5. create a new array with spread
6. clear the input
7. clear the error

### Recommended Form Pattern

Use a real `<form>`:

```jsx
<form onSubmit={handleSubmit}>
  <input value={draft} onChange={handleDraftChange} />
  <button type="submit">Add</button>
</form>
```

Why this is better than manually catching Enter on keydown:

- Enter submit works naturally
- button click and Enter go through the same handler
- accessibility is better

### Validation

```js
const trimmed = draft.trim();

if (!trimmed) {
  setError("Please enter a todo before submitting.");
  return;
}
```

Important:

- `"   "` should count as empty
- students must learn to validate `trimmed`, not the raw string

### Add Handler Example

```jsx
function handleSubmit(event) {
  event.preventDefault();

  const trimmed = draft.trim();

  if (!trimmed) {
    setError("Please enter a todo before submitting.");
    return;
  }

  const newTodo = {
    id: nextTodoId,
    text: trimmed,
  };
  nextTodoId += 1;

  setTodos((prevTodos) => [...prevTodos, newTodo]);
  setDraft("");
  setError("");
}
```

### Why Generate An `id`

Students need a stable identifier for:

- React `key`
- delete logic
- future edit or toggle features

For a beginner lesson, a simple incrementing `nextTodoId` is enough.

## 6. Delete Flow

### Problem

When the user clicks delete, that todo should disappear from the list.

### Correct Pattern

Use `filter`:

```js
setTodos((prevTodos) =>
  prevTodos.filter((todo) => todo.id !== todoId)
);
```

### Why `filter` Is Correct

Because it:

- creates a new array
- keeps the items that should remain
- does not mutate the original state

### What Not To Do

Do not teach:

```js
todos.splice(index, 1);
setTodos(todos);
```

This mutates the existing array and trains the wrong habit.

## 7. Rendering Lists And Keys

### Standard Rendering

```jsx
{todos.map((todo) => (
  <li key={todo.id}>{todo.text}</li>
))}
```

### Why `key` Matters

React uses the key to match old items with new items during re-render.

### Why `index` Is A Bad Default

Do not teach:

```jsx
key={index}
```

for dynamic lists that can change.

Why this is risky:

- deleting an item shifts indexes
- React may match the wrong row
- future features like editing, checkbox state, or animations break more easily

### Better Teaching Line

Say:

> If the item itself has an identity, the key should come from that identity.

For this lesson:

- good: `key={todo.id}`
- bad: `key={index}`

## 8. Debugging State Before And After Each Action

This is one of the most important habits in the lesson.

### The Habit

For every action, ask:

- what was the old state?
- what is the new state?
- what exact rule transformed it?

### Good Debug Pattern

```js
setTodos((prevTodos) => {
  const nextTodos = [...prevTodos, newTodo];
  console.log("add before:", prevTodos);
  console.log("add after :", nextTodos);
  return nextTodos;
});
```

This is better than:

```js
setTodos([...todos, newTodo]);
console.log(todos);
```

because `todos` after `setTodos(...)` may still print the old value in the same event.

### Teaching Point

State updates are scheduled.

So students should not assume:

> "I called `setTodos`, so the next line must already have the new state."

Instead, teach them to log:

- inside the functional updater
- or later with another effect in a more advanced session

For this lesson, the functional updater is enough.

## 9. Recommended Live-Coding Sequence

### Checkpoint 1: Static UI

Render:

- title
- input
- add button
- two hardcoded todo items

Goal:

- students see the final shape before state logic starts

### Checkpoint 2: Controlled Input

Add:

- `draft`
- `setDraft`
- `value={draft}`
- `onChange`

Goal:

- students see typing reflected in state

### Checkpoint 3: Add Todo

Add:

- `todos`
- `setTodos`
- `handleSubmit`
- spread syntax

Goal:

- students see an immutable append flow

### Checkpoint 4: Validation

Add:

- `trim()`
- `error`
- early return when empty

Goal:

- students see that UI logic must reject bad state transitions

### Checkpoint 5: Delete Todo

Add:

- delete button per row
- `filter`

Goal:

- students see how remove operations also follow immutable state rules

### Checkpoint 6: Debug Logs

Add:

- `before` and `after` logs for add
- `before` and `after` logs for delete

Goal:

- students build a repeatable debugging workflow

## 10. Common Mistakes

### Mistake 1: Mutating State

Examples:

- `todos.push(newTodo)`
- `todos.splice(...)`

Fix:

- use spread for add
- use `filter` for delete

### Mistake 2: Uncontrolled Input Thinking

Example:

- reading input from the DOM directly

Fix:

- bind `value`
- update with `onChange`

### Mistake 3: Forgetting To Trim

Example:

- `"   "` gets added as a todo

Fix:

- validate `draft.trim()`

### Mistake 4: Using `index` As `key`

Fix:

- create an `id` when the todo is created

### Mistake 5: Logging In The Wrong Place

Example:

- expecting the next line after `setTodos(...)` to show the new value

Fix:

- log inside the updater callback

## 11. Homework Briefing

Homework should reinforce the exact habits from class.

Students build a Todo web app with:

- add
- delete
- Enter-to-submit
- empty input blocking
- README with 3 manual test cases
- UI screenshot

### What This Homework Is Really Training

This homework is not just:

- input
- button
- delete

It is training these deeper habits:

- update state without mutation
- keep inputs controlled by React state
- validate before changing the list
- use one submit path for both button and Enter
- think of the list as rendered data, not manual DOM updates

### Why This Homework Matters

This is one of the first frontend homeworks that maps directly to real work.

The same pattern appears in:

- comment forms
- add-member screens
- product tags
- cart item lists
- note-taking UIs
- mobile list screens

So the real value of the homework is:

> Students learn one reusable state pattern that appears in many products.

Point students to:

- `HOMEWORK.md`
- `HOMEWORK_README_TEMPLATE.md`
- `todo_demo/` as reference

## Teaching Summary

If students remember only four things, they should be:

1. React UI should come from state.
2. Controlled inputs make form state visible and predictable.
3. Array state updates should return a new array, not mutate the old one.
4. Debugging is easier when you compare `before` and `after` state explicitly.
