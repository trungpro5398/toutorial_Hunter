# Linked List Guide

## What A Linked List Is

A linked list is a data structure made of nodes connected one by one.

Each node usually stores:

- a `value`
- a `next` reference to the next node

```text
[5 | next] -> [8 | next] -> [13 | null]
```

The last node points to `null`, which means the list ends there.

## Why Students Should Learn It

Linked lists are useful because they train a different kind of thinking from arrays.

With arrays, students think in terms of:

- index
- position
- direct access like `arr[3]`

With linked lists, students must think in terms of:

- node
- reference
- moving step by step with `next`

That pointer-style thinking becomes useful later in:

- trees
- graphs
- recursion-heavy problems
- fast/slow pointer problems

## Real-Work Mental Model

Students should know that linked lists are not the most common structure in day-to-day product code, but the mental model still matters.

Real-world analogies:

- browser history: each page can conceptually point to another page
- undo/redo chains: one state can link to the next or previous state
- music playlist queue internals: a sequence of items can be connected node by node
- low-level systems and caches: linked structures are often used when cheap insert/remove operations matter

Teaching point:

> Even when you do not manually code linked lists in product work, linked list thinking improves your control over references, traversal, and pointer updates.

## Linked List vs Array

| Topic | Array | Linked List |
|---|---|---|
| Memory layout | usually contiguous | nodes can live separately |
| Access item at index `i` | fast | slow, must traverse |
| Add at front | often expensive | cheap |
| Remove at front | often expensive | cheap |
| Easy for beginners | easier | harder |

## Basic Node Structure

```js
class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
```

## Build A Small List By Hand

```js
const a = new ListNode(10);
const b = new ListNode(20);
const c = new ListNode(30);

a.next = b;
b.next = c;

const head = a;
```

The list now looks like:

```text
10 -> 20 -> 30 -> null
```

## Traversal

To read every value, start from `head` and keep moving with `next`.

```js
function printValues(head) {
  let current = head;

  while (current !== null) {
    console.log(current.value);
    current = current.next;
  }
}
```

Teaching line:

> A linked list has no random access. If you want to reach a node, you walk there.

## Prepend

Prepend means adding a new node at the front.

```js
function prepend(head, value) {
  const newNode = new ListNode(value);
  newNode.next = head;
  return newNode;
}
```

Why it is nice:

- no shifting like arrays
- just one new node and one pointer update

## Remove Head

```js
function removeHead(head) {
  if (head === null) return null;
  return head.next;
}
```

This works because removing the first node just means:

- forget the current head
- move head to the next node

## Reverse Linked List Mental Model

Start with:

```text
prev = null
current = 1 -> 2 -> 3 -> null
```

At each step:

1. save `nextNode = current.next`
2. reverse the pointer: `current.next = prev`
3. move `prev = current`
4. move `current = nextNode`

When `current === null`, `prev` is the new head.

## Step-By-Step Reverse Example

Original list:

```text
1 -> 2 -> 3 -> null
```
3 -> 2 -> 1 -> null

After step 1:

```text
prev = 1 -> null
current = 2 -> 3 -> null
```

After step 2:

```text
prev = 2 -> 1 -> null
current = 3 -> null
```

After step 3:

```text
prev = 3 -> 2 -> 1 -> null
current = null
```

Answer:

```text
3 -> 2 -> 1 -> null
```

## Three Example Problems

These are good teaching examples because they scale well from beginner to intermediate.

### Example 1: Print Linked List Values

Problem:

Return an array containing all node values from left to right.

```js
function printLinkedList(head) {
  const result = [];
  let current = head;

  while (current !== null) {
    result.push(current.value);
    current = current.next;
  }

  return result;
}
```

Why it matters:

- teaches traversal
- teaches `current = current.next`
- teaches the idea that there is no indexing

Real-work connection:

- reading a chain of states or entries one by one
- walking through a sequence where each item only knows the next one

### Example 2: Middle of the Linked List

Problem:

Return the middle node.

```js
function middleNode(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}
```

Why it matters:

- introduces the fast/slow pointer pattern
- builds toward cycle detection and more advanced linked list problems

Real-work connection:

- reasoning about two processes that move at different speeds
- useful mental prep for polling, stream consumption, and two-rate traversal ideas

### Example 3: Reverse Linked List

Problem:

Return the list in reverse order by changing pointers, not by copying into an array.

```js
function reverseList(head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    const nextNode = current.next;
    current.next = prev;
    prev = current;
    current = nextNode;
  }

  return prev;
}
```

Why it matters:

- trains careful pointer updates
- punishes sloppy order of operations
- is one of the clearest “reference manipulation” problems

Real-work connection:

- reversing a chain of ownership or navigation references
- understanding how linked structures can be rewired without rebuilding from scratch

## Common Mistakes

### Forgetting To Save `nextNode`

If you change `current.next` before saving the original next node, you can lose the rest of the list.

### Forgetting To Move The Pointer

If `current` never moves to `current.next`, the loop gets stuck forever.

### Confusing It With An Array

Linked lists do not support direct access like `list[2]`.
To reach the third node, you must walk through the first two.

### Solving By Converting To An Array

That often avoids the actual linked list skill the problem is trying to teach.

## Teaching Notes

What to emphasize:

- `head` is the entry point
- each node only knows its own value and the next node
- traversal is step-by-step, not index-based
- pointer order matters more than syntax

What not to overcomplicate yet:

- doubly linked lists
- cycle detection proofs
- dummy nodes
- recursive reverse

Those can come later after students are comfortable with single linked list basics.
