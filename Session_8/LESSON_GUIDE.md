# Session 8: React useEffect + Stack

## Lesson Purpose

This lesson teaches students two ideas that appear constantly in frontend work:

- how to run side effects safely with `useEffect`
- how to solve "last thing added should be handled first" problems with a stack

The goal is not only to "use `useEffect`" or "implement a stack."

The real goal is to train these habits:

- separate render logic from side effects
- read the dependency array as "when should this effect run?"
- always clean up intervals, timers, and subscriptions
- recognize when the newest item must be processed first
- trace push and pop operations clearly instead of guessing

This lesson should be taught in English.

## Final Learning Outcome

By the end of the session, students should be able to:

- explain `useEffect` as "code React runs after render"
- explain the difference between state and side effects
- describe what the dependency array means at a beginner level
- write an effect that updates `document.title`
- write an effect that starts and cleans up an interval
- explain why localStorage syncing belongs in an effect
- explain stack as Last In, First Out (LIFO)
- connect stack to browser history, undo, and nested tags
- solve one easy stack problem and one medium monotonic stack problem

## Why This Session Matters

Students now know `useState`. The next step is understanding what happens when the component needs to interact with something outside React state:

- browser tab title
- localStorage
- timers
- API requests
- event listeners

At the same time, stack is one of the most practical algorithm patterns because it models real product behavior:

- browser back history
- undo in text editors
- nested HTML tags
- waiting for the next warmer day, bigger price, or higher score

The message for students:

> State is what the UI remembers. Effects are how the UI talks to the outside world.

## Suggested Lesson Length

70 to 80 minutes

Recommended pacing:

- Opening mindset: 8 minutes
- `useEffect` mental model: 12 minutes
- Live coding the React demo: 25 minutes
- Stack mental model with real examples: 10 minutes
- Easy stack example: 10 minutes
- Medium stack example: 10 minutes
- Homework briefing: 5 minutes

## 1. Opening Mindset

Start with this:

> `useState` lets the component remember. `useEffect` lets the component do something after React renders.

Before showing the correct solution, ask two contrast questions:

- what happens if we use a normal variable instead of `useState`?
- what happens if we try to do side effects without `useEffect`?

Students should hear the failure mode first, not only the correct syntax.

Then ask:

- if the tab title should show the task count, where should that code live?
- if notes should auto-save to localStorage, where should that code live?
- if a timer starts when the component appears, where should that code live?

The answer for all three is: not directly in render, but inside an effect.

## 2. What Breaks Without useState

Show this small example:

```jsx
function CounterWrong() {
  let count = 0;

  function handleClick() {
    count += 1;
    console.log("count:", count);
  }

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

Ask students:

- does the variable change? -> yes
- does React re-render with the new value? -> no

Teaching line:

> A normal variable can change, but React does not remember it across renders in the way the UI needs.

Then contrast with:

```jsx
function CounterCorrect() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

Key message:

- without `useState`, the UI does not update correctly
- with `useState`, React stores the value and re-renders the UI

## 3. What Breaks Without useEffect

Show this bad example:

```jsx
function TitleWrong({ remaining }) {
  document.title = `Tasks left: ${remaining}`;

  return <div>{remaining}</div>;
}
```

Explain why this is wrong for beginners:

- render should stay pure and predictable
- this touches something outside the JSX tree
- React may render more than once while checking UI
- side effects mixed into render are harder to reason about

Then show the correct version:

```jsx
function TitleCorrect({ remaining }) {
  useEffect(() => {
    document.title = `Tasks left: ${remaining}`;
  }, [remaining]);

  return <div>{remaining}</div>;
}
```

Teaching line:

> Without `useEffect`, the code may still "do something," but it is in the wrong place. Hooks give that code a safe, readable home.

## 4. Beginner Mental Model for useEffect

Teach this sentence first:

> React renders first. Then `useEffect` runs.

### What belongs in render

- JSX
- derived values
- simple condition checks
- mapping lists to UI

### What belongs in `useEffect`

- updating `document.title`
- starting a timer
- saving to localStorage
- fetching data
- adding event listeners

### Teaching rule

If the code touches something outside the component's returned JSX, students should ask:

> Is this a side effect?

If yes, it probably belongs in `useEffect`.

## 5. Dependency Array Mental Model

Do not overload beginners with lifecycle language first.

Start with:

```jsx
useEffect(() => {
  // side effect
}, [value]);
```

Say:

> The dependency array tells React when this effect should run again.

### Beginner interpretation

- no dependency array: run after every render
- empty array `[]`: run once after first render
- `[count]`: run after first render and whenever `count` changes

### Simple example

```jsx
useEffect(() => {
  document.title = `Tasks left: ${remaining}`;
}, [remaining]);
```

If `remaining` changes, the title should change too.

## 6. Cleanup Mental Model

Show this pattern clearly:

```jsx
useEffect(() => {
  const timerId = setInterval(() => {
    console.log("tick");
  }, 1000);

  return () => {
    clearInterval(timerId);
  };
}, []);
```

Teach this line:

> If an effect starts something, cleanup should stop it.

Real examples:

- `setInterval` -> `clearInterval`
- event listener -> `removeEventListener`
- subscription -> unsubscribe

## 7. Live Demo Plan

Use the `effect_demo` app in this folder.

### Demo story

A study planner screen needs to:

- store draft text in state
- add study tasks immutably
- filter tasks by status
- auto-save to localStorage
- show the number of unfinished tasks in the tab title
- show a live clock

This is perfect because students can see:

- `useState` handles UI memory
- `useEffect` handles outside-world synchronization

### Contrast section to show in class

The demo should explicitly show:

- without `useState`: typing or clicking changes a variable, but the UI is not reliably driven by React state
- without `useEffect`: title sync, localStorage sync, and timers either do not happen correctly or are written in the wrong place

Do not only say this. Show it in the UI.

Recommended interaction:

1. open the state comparison panel
2. click the fake variable button and show that the visible count does not really move through React state
3. click the real state button and show that the visible count updates immediately
4. open the effect comparison panel
5. toggle the render-written title example and explain that render is touching the outside world directly
6. click the effect-driven counter and show the effect log update after render
7. connect it back to the live title, storage, and timer in the main app

Important teaching rule:

> Show different output first. Show code second.

Beginners usually understand hooks faster when the "wrong output" and the "correct output" are separated into different panels instead of sharing one code example area.

### Effects to highlight

1. `document.title` sync
2. `localStorage` sync
3. interval with cleanup

## 8. Stack Mental Model

Introduce stack with a physical example:

> Imagine a stack of plates. You only add to the top and remove from the top.

That is LIFO:

- Last In
- First Out

### Real examples to say out loud

- browser history: the latest page is the first one you go back to
- undo: the last edit is the first edit you undo
- nested tags: the last opened tag must be closed first

## 9. Algorithm Example 1: Easy

Use `isValidParentheses`.

Real connection:

- nested HTML tags
- nested function calls
- checking whether brackets are balanced in an editor

Teaching flow:

1. when we see an opening bracket, push it
2. when we see a closing bracket, the top of stack must match
3. if it does not match, return `false`
4. at the end, stack must be empty

## 10. Algorithm Example 2: Medium

Use `dailyTemperatures`.

Real connection:

- "For each day, how long until something bigger happens?"
- similar product thinking:
  - how many minutes until traffic gets heavier
  - how many days until price goes higher
  - how many scores later until we beat this score

The pattern is a monotonic decreasing stack of indexes.

Teach the invariant:

> The stack keeps indexes whose warmer day has not been found yet.

When a hotter temperature appears, pop smaller temperatures and fill their answers.

## 11. Homework Briefing

Students should build a small React app using both `useState` and `useEffect`, then choose one stack problem.

Minimum React requirements:

- controlled input
- one array in state
- one derived filter
- one effect that syncs outside React
- one effect with cleanup

Minimum algorithm requirements:

- one easy or medium stack problem in JavaScript
- 3 manual test cases
- short explanation of why stack fits

## 12. Common Mistakes To Watch

### Mistake 1: Putting side effects directly in render

Bad example:

```jsx
document.title = "Wrong place";
return <div>Hello</div>;
```

Explain that render should stay predictable and effect code should move into `useEffect`.

### Mistake 2: Missing cleanup

If students start an interval and never clear it, they will create duplicated timers.

### Mistake 3: Wrong dependency array

If the effect uses `remainingTasks` but the dependency array is empty, the tab title will become stale.

### Mistake 4: Using stack when queue logic is needed

Remind students:

- stack = latest first
- queue = oldest first

## Teaching Close

End the lesson with this summary:

> `useState` answers: what data should the UI remember?
>
> `useEffect` answers: what should happen after render when that data changes?
>
> Stack answers: when does the most recent unfinished thing need to be handled first?

Add one final contrast sentence:

> Without hooks, beginners often put the right code in the wrong place. Hooks are useful because they make the correct place obvious.
