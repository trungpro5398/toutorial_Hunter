# Session 10 Study List Demo

This is the runnable Expo demo project for Session 10.

It shows:

- `useState`
- controlled `TextInput`
- validation with `trim()`
- immutable add / toggle / delete updates
- conditional rendering
- `FlatList`
- empty state
- `KeyboardAvoidingView`

## Run

```bash
cd "/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session_10/study_list_demo"
npm install
npm start
```

Then:

- scan the QR code with Expo Go
- or press `i` for iOS Simulator
- or press `a` for Android Emulator
- or press `w` for web

## Project Structure

```text
study_list_demo/
  App.tsx
  app.json
  babel.config.js
  package.json
  tsconfig.json
  README.md
```

## Teaching Note

This project intentionally stays simple.

It does not include:

- routing
- async fetching
- local storage
- custom hooks

The goal is to teach state, conditional rendering, and list rendering cleanly before moving to more complex mobile patterns.
