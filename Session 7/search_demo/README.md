# Binary Search Demo

This is a small React reference project for Session 7.

It shows:

- binary search step-by-step on a sorted array
- `left`, `right`, and `mid` pointer states visualized as colored boxes
- `useState` for search state (review from Session 6)
- controlled input for the target value (review from Session 6)
- state inspector panel showing live JSON after each step
- `before` and `after` state logged to the console on every action

## Run

```bash
cd "Session 7/search_demo"
npm install
npm run dev
```

Then open `http://localhost:5174` in your browser.

## How To Use The Demo

### Step through a search

1. Type a number in the **Target** field (must exist in the array to see a found result)
2. Click **Start** — the first mid is highlighted in yellow
3. Click **Next Step** repeatedly — watch the search space shrink after each click
4. The search ends with either:
   - Green highlight + "Found X at index Y" message
   - All grayed out + "Target X not found in array" message

### Reset

Click **Reset** to restore the full search space and try a new target.

### Watch the state inspector

The right panel shows the exact values of `left`, `right`, `mid`, `step`, and `status` after each click.

The browser console shows every state transition in a `before` / `after` format — same pattern as the todo demo from Session 6.

## Array Used

```js
[-3, 0, 1, 4, 7, 9, 14, 18, 21]
```

Try these targets in class:

| Target | Expected result |
|--------|----------------|
| `7`    | Found at index 4 in 1 step |
| `-3`   | Found at index 0 in 3–4 steps |
| `21`   | Found at index 8 in 3–4 steps |
| `5`    | Not found in 4 steps |
| `0`    | Found at index 1 in 2–3 steps |

## Box Color Legend

| Color | Meaning |
|-------|---------|
| White | Still inside the search space `[left, right]` |
| Yellow | Current `mid` being tested |
| Green | Target found |
| Gray | Eliminated — outside current `[left, right]` |

## Structure

```text
search_demo/
  index.html
  package.json
  vite.config.js
  src/
    App.css
    App.jsx
    SearchPanel.jsx
    main.jsx
```

## Teaching Note

`StrictMode` is intentionally not used in `main.jsx` so the state transition logs stay one-to-one during the class demo.

The demo advances exactly one binary search iteration per button click — no animation timers, no `useEffect`. This keeps the React complexity at Session 6 level and keeps the focus on binary search logic.
