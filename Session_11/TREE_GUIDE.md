# Tree Guide

## What A Tree Is

A tree is a hierarchical data structure made of connected nodes.

Each node can point to child nodes.

Unlike a linked list:

- linked list is linear
- tree is branching

Small example:

```text
        A
      /   \
     B     C
    / \     \
   D   E     F
```

## Why Students Should Learn Trees

Trees train an important mental model:

- structure matters
- relationships matter
- position inside hierarchy matters

This appears everywhere in software:

- folders and files
- menu systems
- nested comments
- DOM structure
- company org charts
- game AI decision trees

Teaching point:

> When one thing contains smaller things, tree thinking often appears.

## Tree Vocabulary

### Root

The top node of the tree.

### Parent / Child

If node `A` points to node `B`, then:

- `A` is parent
- `B` is child

### Leaf

A node with no children.

### Depth

How many edges from the root to the node.

### Height

How many edges on the longest path downward from that node.

## Binary Tree

A binary tree is a tree where each node has at most:

- one left child
- one right child

Example:

```js
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
```

## Real-Life Mental Models

### 1. Folder Structure

```text
Projects
├── Mobile
│   ├── Screens
│   └── Components
└── Backend
    ├── Routes
    └── Services
```

Why this is a tree:

- one folder can contain many children
- every child belongs under a parent folder

### 2. Company Org Chart

```text
CEO
├── CTO
│   ├── Frontend Lead
│   └── Backend Lead
└── COO
```

Why this matters:

- level-by-level reporting is BFS thinking
- exploring one department deeply is DFS thinking

### 3. Tournament Bracket

Each winner moves upward toward a final winner.

This forms a tree of decisions and outcomes.

## DFS vs BFS

## DFS

Depth First Search goes deep before exploring siblings.

There are 3 classic traversal orders.

### Preorder

```text
node -> left -> right
```

Good when:

- you want to copy the structure
- you want to process parent before children

### Inorder

```text
left -> node -> right
```

Special property:

- in a BST, inorder gives sorted order

### Postorder

```text
left -> right -> node
```

Good when:

- children must be processed before parent
- deleting folders from deepest level upward

## BFS

Breadth First Search visits nodes level by level.

Usually uses a queue.

Good when:

- shortest steps in an unweighted tree
- level order output
- nearest match by depth

## Example Tree

```text
        8
      /   \
     4     12
    / \    / \
   2   6  10  14
```

### Preorder

```text
[8, 4, 2, 6, 12, 10, 14]
```

### Inorder

```text
[2, 4, 6, 8, 10, 12, 14]
```

### Postorder

```text
[2, 6, 4, 10, 14, 12, 8]
```

### Level Order

```text
[[8], [4, 12], [2, 6, 10, 14]]
```

## Binary Search Tree (BST)

A BST is a binary tree with this rule:

- left subtree values are smaller
- right subtree values are larger

Example:

```text
        8
      /   \
     4     12
    / \    / \
   2   6  10  14
```

Why BST matters:

- search can be faster than scanning everything
- inorder traversal becomes sorted

## Common Interview Patterns

### Pattern 1: Traversal

Questions ask you to visit all nodes in a required order.

### Pattern 2: Path Problems

Questions ask about:

- root-to-leaf path
- sum along a path
- best path

### Pattern 3: Level Problems

Questions ask for:

- nodes per level
- averages per level
- zigzag level order

### Pattern 4: Ancestor Problems

Questions ask:

- what node is common above two nodes?

This leads to Lowest Common Ancestor.

## Three Easy Starter Problems

These are the best first problems before medium-level tree homework.

### 1. Maximum Depth of Binary Tree (LC 104)

Why it is good:

- teaches base case
- teaches recursive return values
- easy to connect with real depth

Real-life analogy:

- deepest folder nesting
- deepest management chain

### 2. Same Tree (LC 100)

Why it is good:

- teaches structure comparison
- teaches that equal value is not enough without equal shape

Real-life analogy:

- checking whether two menu trees are exactly the same

### 3. Invert Binary Tree (LC 226)

Why it is good:

- teaches left/right manipulation
- simple recursive transform problem

Real-life analogy:

- mirroring a left-right layout

## Common Mistakes

### Mistake 1: No base case

Always handle:

```js
if (root === null) return ...
```

### Mistake 2: Solving tree problems like array problems

Trees are about recursion, children, and structure.

### Mistake 3: Forgetting what each recursive call returns

Students should answer:

> What does this function return for one subtree?

## Summary Sentence

> A tree is the right structure when data is naturally nested and hierarchical.
