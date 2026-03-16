# Tutorial Hunter

Programming tutorial sessions covering JavaScript, TypeScript, React, data structures, and algorithms.

## Sessions

| Session | Topic | Key Skills |
|---------|-------|------------|
| **Session 2** | Snake Console Game | JavaScript fundamentals, game loop, array manipulation, input handling |
| **Session 3** | TypeScript Foundations | `type`, `interface`, union types, generics, `Promise<T>`, strict mode |
| **Session 4** | Module System + Algorithms | `import`/`export`, project structure, prefix sums, two pointers |
| **Session 6** | React useState + Sliding Window | `useState`, controlled input, immutable updates, CRUD, sliding window algorithm |

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/trungpro5398/toutorial_Hunter.git
```

### 2. Navigate into the project

```bash
cd toutorial_Hunter
```

### 3. Choose a session to work on

```bash
cd "Session 2"   # or Session 3, Session 4, Session 6
```

## How to Run Each Session

### Session 2 — Snake Console Game

No install needed. Just run with Node.js:

```bash
cd "Session 2"

# Play the full reference game
node snake_full.js

# Run homework tests
node snake_homework_test.js

# Play the homework game (with fallbacks for unfinished parts)
node snake_homework_game.js
```

**Controls:** `W/A/S/D` or arrow keys to move, `P` pause, `R` restart, `Q` quit.

### Session 3 — TypeScript Foundations

Requires TypeScript installed globally:

```bash
# Install TypeScript (one time)
npm install -g typescript

cd "Session 3"

# Typecheck your homework
tsc --noEmit -p tsconfig.json

# Compile to JavaScript
tsc -p tsconfig.json
```

### Session 4 — Module System + Algorithms

```bash
cd "Session 4"

# Run the module demo
cd module_demo
npm install
npm run dev

# Run algorithm examples (no install needed)
cd ..
node prefix_sums_examples.js
node two_pointers_examples.js
```

### Session 6 — React useState + Sliding Window

#### React Todo Demo

```bash
cd "Session 6/todo_demo"
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

#### Sliding Window Algorithm Examples

```bash
cd "Session 6"
node sliding_window_examples.js
```

## How to Do Homework

### Step 1: Read the homework brief

Each session has a `HOMEWORK.md` file. Read it carefully — it lists all requirements and pass criteria.

### Step 2: Find the right file to work on

| Session | Homework File | What to Do |
|---------|--------------|------------|
| **Session 2** | `snake_homework.js` | Fill in the `TODO` functions |
| **Session 3** | `hw1_migration_template.ts` | Convert 4 JS functions to TypeScript without using `any` |
| **Session 4** | Create your own project | Refactor existing code into multiple files with `import`/`export` |
| **Session 6** | Create a new React app | Build a Todo app from scratch with `useState` |

### Step 3: Check your work

```bash
# Session 2 — run the test suite
cd "Session 2"
node snake_homework_test.js

# Session 3 — typecheck (0 errors = pass)
cd "Session 3"
tsc --noEmit -p tsconfig.json

# Session 4 — run your project
cd "Session 4"
# your project should run with one command, e.g.:
npm run dev

# Session 6 — run your React app
cd your-todo-app
npm install
npm run dev
# then open http://localhost:5173
```

### Step 4: Write your README

Sessions 4 and 6 require a `README.md` in your homework submission. Session 6 provides a template at `HOMEWORK_README_TEMPLATE.md`.

Your README should include:
- What the project does
- How to run it
- Manual test cases (Session 6: at least 3)
- A screenshot of the UI (Session 6)

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [TypeScript](https://www.typescriptlang.org/) (for Session 3: `npm install -g typescript`)
- A code editor (VS Code recommended)
- Terminal / Command Line

## Project Structure

```
toutorial_Hunter/
├── README.md
├── .gitignore
├── Session 2/          # Snake Console Game + JS fundamentals
│   ├── LESSON_GUIDE.md
│   ├── snake_full.js           # Full reference solution
│   ├── snake_guided.js         # Live-coding skeleton for class
│   ├── snake_homework.js       # Student exercise file
│   ├── snake_homework_test.js  # Test runner for homework
│   ├── snake_homework_game.js  # Playable homework game
│   └── dsa_examples.js         # DSA examples
├── Session 3/          # TypeScript Foundations
│   ├── LESSON_GUIDE.md
│   ├── HOMEWORK.md
│   ├── typescript_examples.ts
│   ├── hw1_migration_template.ts
│   └── tsconfig.json
├── Session 4/          # Module System + Algorithms
│   ├── LESSON_GUIDE.md
│   ├── HOMEWORK.md
│   ├── module_demo/            # import/export demo project
│   ├── prefix_sums_examples.js
│   ├── PREFIX_SUMS_GUIDE.md
│   ├── two_pointers_examples.js
│   └── TWO_POINTERS_GUIDE.md
└── Session 6/          # React useState + Sliding Window
    ├── LESSON_GUIDE.md
    ├── HOMEWORK.md
    ├── HOMEWORK_README_TEMPLATE.md
    ├── todo_demo/              # React reference app
    ├── sliding_window_examples.js
    └── SLIDING_WINDOW_GUIDE.md
```
