# Session 11 — Trees / Binary Trees / BFS / DFS

## Lesson Goal (75-90 minutes)

| # | Topic | Time |
|---|---|---|
| 1 | Mindset: from linear data to hierarchical data | 10 minutes |
| 2 | Tree vocabulary through real-world examples | 15 minutes |
| 3 | Binary tree structure | 10 minutes |
| 4 | DFS: preorder, inorder, postorder | 20 minutes |
| 5 | BFS: level order with a queue | 15 minutes |
| 6 | 3 easy example problems in class | 15 minutes |
| 7 | Connect to the medium LeetCode homework | 5 minutes |

---

## Three Things Students Must Remember After This Session

> 1. **A tree is hierarchical data**: one node can have multiple child branches.
> 2. **DFS goes deep first, BFS goes level first**.
> 3. **Many real-world problems are secretly tree problems**: folders, org charts, menus, and comment replies.

---

## Why Session 11 Comes Right After Session 10

Session 10 teaches linked lists:

- node thinking
- references
- step-by-step traversal

Trees reuse that same foundation, but increase the difficulty:

- linked list: each node points to at most 1 next node
- tree: each node can branch into multiple directions

Teaching line:

> A linked list is one straight road.  
> A tree is a road with branches, then more branches after that.

This is an important transition because real systems are rarely just one flat line.

Examples:

- folders containing subfolders
- managers with multiple reports
- comments with replies and replies to replies
- menus with submenus
- tournament brackets

---

## Final Learning Outcome

By the end of the session, students should be able to:

- explain what a tree is using real-world examples
- distinguish `root`, `parent`, `child`, `leaf`, `depth`, and `height`
- explain what a binary tree is
- write `preorder`, `inorder`, and `postorder`
- write `level order traversal`
- look at a problem and recognize when tree thinking is the right mental model

---

## Part 1 — Opening Mindset: What Is A Tree In Real Life? (10 minutes)

### Opening Questions To Ask

Ask students:

1. In a computer, what can a folder contain?
2. In a company, how many people can one manager supervise?
3. On Facebook or Reddit, can one comment have replies?

Then summarize:

- if one item can contain child items
- and those child items can contain more child items

then tree thinking is usually involved.

### Real-World Example 1: Folder Structure

```text
Tutorial
├── Session_9
├── Session_10
└── Session_11
    ├── LESSON_GUIDE.md
    ├── HOMEWORK.md
    └── tree_examples.js
```

Explanation:

- `Tutorial` is the root
- `Session_11` is a child of `Tutorial`
- `LESSON_GUIDE.md` is a leaf if we treat files as end nodes

### Real-World Example 2: Company Org Chart

```text
CEO
├── CTO
│   ├── Frontend Lead
│   └── Backend Lead
└── Product Manager
```

Explanation:

- `CEO` is the root
- `CTO` and `Product Manager` are on the same level
- `Frontend Lead` is a leaf if nobody reports below that role

### Real-World Example 3: Comment Reply Tree

```text
Comment A
├── Reply A1
│   ├── Reply A1.1
│   └── Reply A1.2
└── Reply A2
```

Explanation:

- this is not a flat array
- this is nested data
- if you want to visit all replies, tree traversal is the natural tool

### Closing Line For The Opening

> Arrays are for flat lists.  
> Trees are for nested, hierarchical data.

---

## Part 2 — Vocabulary: Teach Tree Terms With A Picture (15 minutes)

Draw this tree:

```text
        A
      /   \
     B     C
    / \     \
   D   E     F
```

### Terms Students Must Know

- `A` is the `root`
- `B` and `C` are children of `A`
- `A` is the parent of `B` and `C`
- `D`, `E`, and `F` are leaves
- `B` and `C` are siblings

### Very Simple Definitions

#### Root

The top node. The starting point of the whole tree.

#### Parent

The node above another node.

#### Child

The node below a parent.

#### Leaf

A node with no children.

#### Depth

How far a node is from the root.

Examples:

- depth of `A` = 0
- depth of `B` = 1
- depth of `E` = 2

#### Height

How far a node is from its deepest leaf below it.

Examples:

- height of `E` = 0
- height of `B` = 1
- height of `A` = 2

### Quick Check Questions

1. Which node is the root?
2. Which nodes are leaves?
3. What is the depth of `E`?
4. What is the height of `B`?

Students should answer these quickly before moving on.

---

## Part 3 — What Is A Binary Tree? (10 minutes)

### Definition

A binary tree is a tree where each node has at most:

- 1 left child
- 1 right child

It does not have to use both.

### Node Structure

```js
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
```

### Build A Small Tree By Hand

```js
const root = new TreeNode(10);
root.left = new TreeNode(5);
root.right = new TreeNode(15);
root.left.left = new TreeNode(3);
root.left.right = new TreeNode(7);
```

Visual:

```text
        10
       /  \
      5    15
     / \
    3   7
```

### How To Explain It Clearly

- `10` has two possible directions: left or right
- `5` also has two possible directions
- `15` currently has no children, so right now it is a leaf

### Quick Comparison With Linked List

| Structure | What does each node know? | Shape |
|---|---|---|
| Linked List | `next` | a straight line |
| Tree | `left`, `right`, or children | branching |

---

## Part 4 — DFS: Go Deep First (20 minutes)

### Intuition

Imagine you are exploring a building:

- DFS = fully explore one hallway before trying another hallway
- BFS = fully explore one floor before going to the next floor

DFS asks:

> Can I go deeper from here?

### Tree Used Throughout This Section

```text
        8
      /   \
     4     12
    / \    / \
   2   6  10  14
```

---

### 4.1 — Preorder = node -> left -> right

### Meaning

Process the current node first, then go down into its children.

### Real-World Connection

- copy a folder structure
- render a menu from top to bottom
- serialize a tree while keeping the original parent-first structure

### Code

```js
function preorder(root, result = []) {
  if (root === null) return result;

  result.push(root.value);
  preorder(root.left, result);
  preorder(root.right, result);
  return result;
}
```

### Manual Trace

```text
Start at 8
1. take 8
2. go left to 4
3. take 4
4. go left to 2
5. take 2
6. no left, no right -> return
7. go to 6
8. take 6
9. return to 8
10. go to 12
11. take 12
12. go to 10, then 14
```

Result:

```text
[8, 4, 2, 6, 12, 10, 14]
```

---

### 4.2 — Inorder = left -> node -> right

### Meaning

Go left first, process the current node in the middle, then go right.

### Real-World Connection

- if the tree is a BST, inorder gives increasing sorted order
- useful when you want to read data in sorted form

### Code

```js
function inorder(root, result = []) {
  if (root === null) return result;

  inorder(root.left, result);
  result.push(root.value);
  inorder(root.right, result);
  return result;
}
```

### Short Trace

```text
For this BST:
go as far left as possible first -> 2
then return to 4
then move to 6
then return to 8
then do the same on the right side
```

Result:

```text
[2, 4, 6, 8, 10, 12, 14]
```

### Teaching Line

> Inorder is easy to remember because in a BST, it turns the tree into sorted output.

---

### 4.3 — Postorder = left -> right -> node

### Meaning

Process children first, then process the parent last.

### Real-World Connection

- compute folder size after you already know all child file sizes
- delete child folders before deleting the parent folder
- compute a game branch score before finalizing the current node

### Code

```js
function postorder(root, result = []) {
  if (root === null) return result;

  postorder(root.left, result);
  postorder(root.right, result);
  result.push(root.value);
  return result;
}
```

Result:

```text
[2, 6, 4, 10, 14, 12, 8]
```

### Teaching Line

> If the parent needs information from its children first, think about postorder.

---

## Part 5 — BFS: Go By Level (15 minutes)

### Intuition

Imagine a company wants to send an announcement:

1. first to the CEO
2. then to all first-level managers
3. then to all people under them

That is level-by-level processing.

### Queue Connection

BFS uses a queue because:

- first in, first out
- nodes discovered earlier should be processed earlier

### Code

```js
function levelOrder(root) {
  if (root === null) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];

    for (let i = 0; i < levelSize; i += 1) {
      const node = queue.shift();
      level.push(node.value);

      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}
```

### Manual Trace

```text
Initial queue: [8]

Level 1:
pop 8
push 4, 12
result = [[8]]

Queue: [4, 12]

Level 2:
pop 4 -> push 2, 6
pop 12 -> push 10, 14
result = [[8], [4, 12]]

Queue: [2, 6, 10, 14]

Level 3:
pop all 4 nodes
push nothing else
result = [[8], [4, 12], [2, 6, 10, 14]]
```

### Real-World Connection

- org chart by management level
- game map by distance from the starting point
- find the nearest match to the root first

### Teaching Line

> DFS cares about depth. BFS cares about the current level.

---

## Part 6 — 3 Easy Example Problems To Teach In Class (15 minutes)

Students should do these 3 easy problems before touching the medium homework.

### Example Easy 1: Maximum Depth of Binary Tree

- LeetCode 104
- Main idea: recursive DFS

```js
function maxDepth(root) {
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```

Real-world mapping:

- what is the deepest folder nesting?
- what is the longest management chain in a company?

Teaching points:

- base case is `null -> 0`
- each node asks both child branches for their depth and keeps the larger one

---

### Example Easy 2: Same Tree

- LeetCode 100
- Main idea: compare structure and value at the same time

```js
function isSameTree(p, q) {
  if (p === null && q === null) return true;
  if (p === null || q === null) return false;
  if (p.value !== q.value) return false;

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
```

Real-world mapping:

- compare whether 2 menu trees are exactly the same
- compare whether 2 folder trees have the same structure and data

Teaching points:

- value alone is not enough
- the tree shape must also match

---

### Example Easy 3: Invert Binary Tree

- LeetCode 226
- Main idea: swap left and right at every node

```js
function invertTree(root) {
  if (root === null) return null;

  const left = invertTree(root.left);
  const right = invertTree(root.right);

  root.left = right;
  root.right = left;
  return root;
}
```

Real-world mapping:

- mirror a left-right layout
- mirror a tree-based UI or menu

Teaching points:

- recursion goes down first
- when the function returns, swap the two branches

---

## Part 7 — When Should Students Think “This Is A Tree Problem”?

Students should suspect tree algorithms when the prompt includes signals like:

- parent / child
- root / leaf
- nested / hierarchy
- subtree
- level order
- path from root
- ancestor

If a problem says:

- "each node has children"
- "go from top to bottom"
- "traverse level by level"
- "path from root to leaf"

then the problem is very likely in tree territory.

---

## Most Common Student Mistakes

### Mistake 1: Forgetting the base case

```js
if (root === null) return ...
```

Without this line, recursion usually breaks quickly.

### Mistake 2: Memorizing traversal names without understanding them

Make students say them out loud:

- preorder = node-left-right
- inorder = left-node-right
- postorder = left-right-node

### Mistake 3: Doing BFS without a queue mental model

If you want level order, a queue is the clearest mental model.

### Mistake 4: Treating a tree like an array

Trees do not mainly care about indexes.

Trees mainly care about:

- parent-child relationships
- structure
- paths

---

## How To Close The Lesson

Say this at the end:

> Linked lists teach us to move along one path.  
> Trees teach us to handle hierarchical data with many branches.

Then connect it to homework:

- easy examples build recursion and BFS confidence
- medium homework builds real interview patterns
