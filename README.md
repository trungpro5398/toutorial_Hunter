# Tutorial Hunter

Programming tutorial sessions covering JavaScript, TypeScript, React, data structures, and algorithms.

## Sessions

| Session | Topic | Key Skills |
|---------|-------|------------|
| **Session 2** | Snake Console Game | JavaScript fundamentals, game loop, array manipulation, input handling |
| **Session 3** | TypeScript Foundations | `type`, `interface`, union types, generics, `Promise<T>`, strict mode |
| **Session 4** | Module System + Algorithms | `import`/`export`, project structure, prefix sums, two pointers |
| **Session 6** | React useState + Sliding Window | `useState`, controlled input, immutable updates, CRUD, sliding window algorithm |
| **Session 7** | Binary Search | `O(log n)` thinking, search invariants, classic binary search, answer-space binary search |
| **Session 8** | React useEffect + Stack | `useEffect`, dependency arrays, cleanup, localStorage sync, stack, monotonic stack |
| **Session 9** | React Native + Queue | Expo setup, View/Text/Pressable/TextInput, StyleSheet, Flexbox mobile, queue (FIFO) |
| **Session 10** | React Native State + Linked List | `useState`, controlled input, conditional rendering, lists, linked list |
| **Session 11** | Trees / Binary Trees | tree vocabulary, DFS, BFS, hierarchy thinking, common binary tree patterns |
| **Session 12** | Dynamic Programming | state design, memoization, tabulation, counting DP, optimization DP |
| **Session 13** | Advanced Dynamic Programming | pattern recognition, knapsack DP, string DP, interval DP, space optimization |
| **Session 14** | Backtracking Foundations | decision trees, choose/skip, loop expansion, permutations, duplicate handling |
| **Session 15** | Backtracking Pruning | pruning, string partitioning, grid search, constraints, N-Queens |

## New to Git?

If this is your first time using Git, read **[GIT_SETUP_GUIDE.md](GIT_SETUP_GUIDE.md)** first. It covers everything from installing Git on Windows, creating a GitHub account, cloning the project, to creating pull requests with branches.

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
cd "Session 2"   # or Session 3, Session 4, Session 6, Session 7, Session 8, Session_9, Session_10, Session_11, Session_12, Session_13, Session_14, Session_15
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

### Session 7 — Binary Search

#### Search Visualizer

```bash
cd "Session 7/search_demo"
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

#### Binary Search Examples

```bash
cd "Session 7"
node binary_search_examples.js
```

### Session 8 — React useEffect + Stack

#### React Effect Demo

```bash
cd "Session 8/effect_demo"
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

#### Stack Algorithm Examples

```bash
cd "Session 8"
node stack_examples.js
```

### Session 9 — React Native + Queue

#### Greeting App Demo

```bash
cd "Session_9/greeting_demo"
# Copy App.tsx into a new Expo project:
npx create-expo-app@latest GreetingApp --template blank-typescript
cp App.tsx GreetingApp/App.tsx
cd GreetingApp
npx expo start
```

Scan QR code with **Expo Go** app on your phone, or press `w` for web.

#### Queue Algorithm Examples

```bash
cd "Session_9"
node queue_examples.js
```

### Session 10 — React Native State + Linked List

#### Study List Demo

```bash
cd "Session_10/study_list_demo"
npm install
npm start
```

#### Linked List Examples

```bash
cd "Session_10"
node linked_list_examples.js
```

### Session 11 — Trees / Binary Trees

```bash
cd "Session_11"
node tree_examples.js
```

### Session 12 — Dynamic Programming

```bash
cd "Session_12"
node dp_examples.js
```

### Session 13 — Advanced Dynamic Programming

```bash
cd "Session_13"
node advanced_dp_examples.js
```

### Session 14 — Backtracking Foundations

```bash
cd "Session_14"
node backtracking_examples.js
```

### Session 15 — Backtracking Pruning

```bash
cd "Session_15"
node backtracking_advanced_examples.js
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
| **Session 7** | Create one `.js` file + README | Solve one binary search problem and explain the invariants |
| **Session 8** | Create a React app + one `.js` file | Build a `useEffect` app and solve one stack problem |
| **Session 9** | Create an Expo app + one `.js` file | Build a Greeting app with React Native and solve one queue problem |
| **Session 10** | Create an Expo app + one `.js` file | Build a study list app and solve one linked list problem |
| **Session 11** | Create 4 `.js` files + README | Solve 4 medium binary tree problems with traces |
| **Session 12** | Create 4 `.js` files + README | Solve 4 medium dynamic programming problems with traces |
| **Session 13** | Study guide + runnable examples | Learn stronger DP families before doing grouped practice |
| **Session 14** | Study guide + runnable examples | Learn the basic shapes of backtracking |
| **Session 15** | Study guide + runnable examples | Learn pruning, constraints, and stronger backtracking patterns |

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

# Session 7 — run the binary search examples
cd "Session 7"
node binary_search_examples.js

# Session 8 — run the stack examples
cd "Session 8"
node stack_examples.js

# Session 10 — run the linked list examples
cd "Session_10"
node linked_list_examples.js

# Session 11 — run the tree examples
cd "Session_11"
node tree_examples.js

# Session 12 — run the DP examples
cd "Session_12"
node dp_examples.js

# Session 13 — run the advanced DP examples
cd "Session_13"
node advanced_dp_examples.js

# Session 14 — run the backtracking foundation examples
cd "Session_14"
node backtracking_examples.js

# Session 15 — run the advanced backtracking examples
cd "Session_15"
node backtracking_advanced_examples.js
```

### Step 4: Write your README

Sessions 4, 6, 7, and 8 require a `README.md` in the homework submission. Sessions 6, 7, and 8 provide templates.

Your README should include:
- What the project does
- How to run it
- Manual test cases (Session 6: at least 3)
- A screenshot of the UI (Session 6)

### Step 5: Submit your homework with Git

After finishing your homework, you need to save and push your changes to GitHub.

#### First time setup (only once)

If you cloned the repo, Git is already set up. Skip to "Save and push."

If you started fresh, set up Git first:

```bash
git init
git remote add origin https://github.com/trungpro5398/toutorial_Hunter.git
```

#### Save and push your changes

Every time you finish working on homework or want to save progress:

```bash
# 1. Check what files you changed
git status

# 2. Stage your changes (add the files you want to save)
git add .

# 3. Create a commit with a message describing what you did
git commit -m "Session 6: finish todo app homework"

# 4. Push to GitHub
git push
```

#### Example: full workflow after finishing Session 6 homework

```bash
cd toutorial_Hunter

# Check what changed
git status

# Stage everything
git add .

# Commit with a clear message
git commit -m "Session 6: complete todo app with add, delete, validation"

# Push to GitHub
git push
```

#### Tips

- Run `git status` before committing to see exactly what will be saved
- Write clear commit messages so you can find your work later
- You can push multiple times — each push updates GitHub with your latest changes
- If you only want to stage specific files instead of everything:

```bash
# Stage specific files only
git add "Session 6/my-todo-app/src/App.jsx"
git add "Session 6/my-todo-app/README.md"
```

#### Common Git commands cheat sheet

| Command | What it does |
|---------|-------------|
| `git status` | Show which files changed |
| `git add .` | Stage all changes |
| `git add <file>` | Stage one specific file |
| `git commit -m "message"` | Save staged changes with a description |
| `git push` | Upload commits to GitHub |
| `git pull` | Download latest changes from GitHub |
| `git log --oneline` | See commit history |

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
