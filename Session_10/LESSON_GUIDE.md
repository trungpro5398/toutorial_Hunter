# Session 10 — React Native State + Conditional Rendering + Lists + Linked List

## Lesson Goal (70-80 minutes)

| # | Topic | Time |
|---|---|---|
| 1 | Mindset: from primitives to stateful UI | 10 min |
| 2 | `useState` + controlled input | 15 min |
| 3 | Conditional rendering on mobile | 10 min |
| 4 | Array state + rendering lists | 20 min |
| 5 | `ScrollView` vs `FlatList` | 10 min |
| 6 | Algorithm: basic Linked List | 15 min |

---

## Why This Session Comes Right After Session 9

Session 9 teaches the building blocks:

- `View`
- `Text`
- `Pressable`
- `TextInput`

But students still need the next step:

- how the screen remembers values
- how input changes UI
- how a list appears and updates
- how to render empty state vs real data

This matches `tet-student-app` well, because that codebase uses these patterns constantly:

- `useState`
- `TextInput`
- `Pressable`
- `ScrollView`
- `FlatList`
- `FlashList`
- empty state, modal state, filter state, loading state

Teaching line:

> Primitives are the bricks. State is what makes the app react.

---

## Final Learning Outcome

By the end of the session, students should be able to:

- explain `useState` as component memory
- build a controlled `TextInput` with `value` and `onChangeText`
- add, delete, and toggle items in array state
- use conditional rendering with `if`, ternary, and `&&`
- explain when `ScrollView` is enough and when `FlatList` is better
- avoid direct mutation when updating state
- explain a linked list as nodes connected with `next`
- trace traversal, prepend, and remove-head operations

---

## Part 1 — Opening Mindset

Start with this sentence:

> Last session students learned the UI pieces. This session they learn how the UI changes when data changes.

Ask these three questions:

1. If the user types into an input, where does the app remember that text?
2. If the user adds a new item, where does the list update?
3. If the list is empty, what should the user see instead?

These naturally lead into:

- `useState`
- data-driven UI
- conditional rendering

---

## Part 2 — `useState` As Component Memory

Example:

```tsx
const [name, setName] = useState("");
```

Explain:

- `name` is the current value
- `setName` tells React to update the value and re-render

### Contrast: Why A Normal Variable Is Not Enough

```tsx
let name = "";

function handleChange(text: string) {
  name = text;
}
```

Why this is wrong:

- the variable changes
- but React is not managing it as component state

Teaching line:

> React does not only care that data changed. React needs state so it knows the UI must update.

---

## Part 3 — Controlled Input On Mobile

```tsx
const [task, setTask] = useState("");

<TextInput
  value={task}
  onChangeText={setTask}
  placeholder="Enter a study task"
/>
```

Key points:

- this is a controlled input
- state is the single source of truth
- clearing the input is just `setTask("")`

### Common Mistake

```tsx
// Wrong: listens for changes, but the value is not controlled
<TextInput onChangeText={setTask} />
```

---

## Part 4 — Conditional Rendering

This pattern appears everywhere in real mobile apps:

- no data yet
- error exists
- loading
- data is ready

Example:

```tsx
{error ? <Text style={styles.error}>{error}</Text> : null}

{items.length === 0 ? (
  <Text style={styles.emptyText}>No items yet</Text>
) : (
  <FlatList ... />
)}
```

Teaching line:

> The UI should not ask, "What do I want to render?" It should ask, "Given this state, what should the user see?"

---

## Part 5 — Array State And Immutable Updates

### Add an item

```tsx
setItems((prev) => [
  ...prev,
  { id: String(Date.now()), title: task.trim(), done: false },
]);
```

### Toggle an item

```tsx
setItems((prev) =>
  prev.map((item) =>
    item.id === id ? { ...item, done: !item.done } : item
  )
);
```

### Delete an item

```tsx
setItems((prev) => prev.filter((item) => item.id !== id));
```

### Mistake To Stop Immediately

```tsx
// Wrong
items.push(newItem);
setItems(items);
```

Explain:

- `push` mutates the old array
- React works better when state updates return a new array

Teaching line:

> Treat previous state as read-only.

---

## Part 6 — Rendering Many Items On Mobile

### Start With `.map`

```tsx
<View>
  {items.map((item) => (
    <Text key={item.id}>{item.title}</Text>
  ))}
</View>
```

Good for teaching:

- students can clearly see how data becomes UI
- useful for very small lists

### Then Move To `FlatList`

```tsx
<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <TaskRow item={item} />}
/>
```

### `ScrollView` vs `FlatList`

| Component | Use when | Strength | Limitation |
|---|---|---|---|
| `ScrollView` | short, simple content | easy to write | renders everything at once |
| `FlatList` | medium or long lists | more efficient | slightly more API to learn |

### Relation To `tet-student-app`

That project uses `ScrollView`, `FlatList`, and `FlashList` heavily.

So the message for students is:

- learn `.map` to understand list rendering
- learn `FlatList` to build real app screens
- do not jump to `FlashList` yet

---

## Part 7 — Live Coding Demo

Live-code a small `Study List` app.

Required features:

- one `TextInput`
- one `Add` button
- one list of tasks
- tap a task to toggle done
- one `Delete` button per task
- empty state when there are no tasks
- validation for empty input

Suggested order:

1. build the layout with `View` and `Text`
2. add `TextInput`
3. add `draft` state
4. add `tasks` state
5. write `handleAdd`
6. render empty state
7. render the `FlatList`
8. write `handleToggle`
9. write `handleDelete`

The demo code is in `study_list_demo/App.tsx`.

---

## Part 8 — Algorithm: Linked List

### Mental Model

An array is like boxes stored side by side.

A linked list is like train cars:

- each car is a node
- each node stores a `value`
- each node points to the next one using `next`

```text
[10 | next] -> [20 | next] -> [30 | null]
```

### Why Teach Linked List Here

- it trains reference / pointer thinking
- it helps students understand why some operations are cheap at the head
- it prepares them for more advanced data structures later

### Important Distinction

Students must not confuse:

- a UI list in React Native
- a linked list in data structures

They share the word "list," but they are different ideas:

- UI list = how you render many items
- linked list = how data is stored

---

## Part 9 — Minimum Linked List Topics To Teach

### What a node is

```js
class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
```

### Build a 3-node list

```js
const a = new ListNode(10);
const b = new ListNode(20);
const c = new ListNode(30);

a.next = b;
b.next = c;
```

### Traverse

```js
function printList(head) {
  let current = head;

  while (current !== null) {
    console.log(current.value);
    current = current.next;
  }
}
```

### Add at head

```js
function prepend(head, value) {
  const newNode = new ListNode(value);
  newNode.next = head;
  return newNode;
}
```

### Remove head

```js
function removeHead(head) {
  if (head === null) return null;
  return head.next;
}
```

---

## Part 10 — Algorithm Problems For Class

### Easy: Convert array to linked list

Useful for understanding nodes and `next`.

### Easy: Print linked list values

Useful for traversal with `while`.

### Easy-Medium: Reverse linked list

Only introduce if time allows.
It is excellent for pointer updates and step-by-step tracing.

---

## Homework Briefing

The homework should have two parts:

- React Native: a small study list app
- Algorithm: one linked list problem

The goal is not a beautiful app.

The goal is:

- correct controlled input
- correct state updates
- correct list rendering
- real understanding of linked list through tracing

---

## Run Instructions For The Demo

This session now includes a full Expo demo project at:

`/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session_10/study_list_demo`

Run it like this:

```bash
cd "/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session_10/study_list_demo"
npm install
npm start
```

Then open the app:

- scan the QR code in Expo Go
- or press `i` for iOS Simulator
- or press `a` for Android Emulator
- or press `w` for web

---

## Notes For The Instructor

### Emphasize

- real mobile apps are state-driven
- mutation is a common beginner bug
- list rendering needs stable keys
- `FlatList` is directly relevant to the real codebase

### Do Not Overload This Session With

- `useEffect`
- async fetching
- Expo Router navigation
- custom hooks
- form libraries
- animation

Those exist in `tet-student-app`, but they are not the focus of Session 10.
