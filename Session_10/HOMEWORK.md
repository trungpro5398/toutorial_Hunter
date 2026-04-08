# Session 10 — Homework: Study List App + Linked List

## Estimated Time: 10 hours

---

## Part 1: React Native — Study List App (7 hours)

### Goal

Build a small React Native app with Expo + TypeScript.

The app must include:

1. a `TextInput` for entering a study task
2. an `Add` button to create a new task
3. validation:
   - do not allow empty input
   - trim spaces before saving
4. a task list rendered with `FlatList`
5. tap a task to toggle `done / not done`
6. a `Delete` button for each task
7. an empty state when the list has no items

### Pass Criteria

| # | Requirement | Details |
|---|---|---|
| 1 | App runs | `npx expo start` works |
| 2 | Controlled input | `value` and `onChangeText` are used |
| 3 | Add works | new task appears in the list |
| 4 | Validation works | empty task is rejected |
| 5 | Toggle works | tapping a task changes its status |
| 6 | Delete works | the correct task is removed |
| 7 | Empty state works | message appears when no tasks exist |
| 8 | Use `FlatList` | do not use `ScrollView` for the main list |
| 9 | Immutable updates | do not mutate array state directly |
| 10 | TypeScript | use `.tsx` and keep it type-safe |

### Suggested State

```tsx
const [draft, setDraft] = useState("");
const [error, setError] = useState("");
const [tasks, setTasks] = useState<TaskItem[]>([]);
```

### Suggested Type

```tsx
type TaskItem = {
  id: string;
  title: string;
  done: boolean;
};
```

### Stretch Goals

- add filters: `All / Active / Done`
- add a `Clear completed` button
- show the number of remaining tasks
- use `KeyboardAvoidingView`

### How To Run Your Homework App

1. Create a new Expo TypeScript app:

```bash
npx create-expo-app@latest Session10Homework --template blank-typescript
```

2. Move into the project:

```bash
cd Session10Homework
```

3. Put your homework solution inside `App.tsx`.

4. Start the app:

```bash
npx expo start
```

5. Open it with one of these options:

- scan the QR code using Expo Go
- press `i` for iOS Simulator
- press `a` for Android Emulator
- press `w` for web

---

## Part 2: Algorithm — Linked List (3 hours)

Choose one of these three levels.

### Easy: Print Linked List

Implement:

```js
function printLinkedList(head) {
  // return an array of values in order
}
```

Example:

```text
1 -> 2 -> 3 -> null
=> [1, 2, 3]
```

### Easy-Medium: Middle of the Linked List

Implement:

```js
function middleNode(head) {
  // return the middle node
}
```

Hint:

- use a slow pointer and a fast pointer

### Medium: Reverse Linked List

Implement:

```js
function reverseList(head) {
  // return the new head
}
```

Hint:

- use `prev`, `current`, and `nextNode`

---

## Pass Criteria (Algorithm)

| # | Requirement |
|---|---|
| 1 | Uses linked list thinking |
| 2 | Includes at least one manual trace |
| 3 | Does not solve by converting the whole list into an array first |
| 4 | Explains `head`, `next`, and traversal clearly |

### How To Run The Algorithm File

Create a JavaScript file such as `linked_list_homework.js`, then run:

```bash
node linked_list_homework.js
```

You should print your test case results with `console.log`.

---

## Deliverables

1. your React Native app source code
2. one `.js` file for the linked list problem
3. `README.md` using the template
4. one screenshot of the app running

---

## What This Homework Trains

| Part | Skill |
|---|---|
| React Native app | state, input, list rendering, empty state, array updates |
| FlatList | correct list rendering on mobile |
| Validation | handling user input before updating UI |
| Linked List | node thinking, traversal, pointer updates |
