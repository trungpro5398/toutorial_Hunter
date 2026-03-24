# Todo Demo

This is a small React reference project for Session 6.

It shows:

- `useState`
- controlled input
- add with spread syntax
- delete with `filter`
- validation with `trim()`
- stable keys with `todo.id`
- debug logging for `before` and `after` state

## Run

```bash
cd "/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session 6/todo_demo"
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Structure

```text
todo_demo/
  index.html
  package.json
  vite.config.js
  src/
    App.css
    App.jsx
    main.jsx
```

## Teaching Note

`StrictMode` is intentionally not used in `main.jsx` so the state transition logs stay one-to-one during class demo.
