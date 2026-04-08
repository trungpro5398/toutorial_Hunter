# Session 11 — Homework: Trees / Binary Trees

## Estimated Time: 8-10 hours

This homework focuses only on algorithm practice.

Students should solve 4 LeetCode medium problems about trees.

---

## Goal

Train the most common binary tree patterns:

- DFS recursion
- BFS with queue
- path thinking
- ancestor thinking
- BST validation logic

---

## Required Problems

Solve all 4 problems below.

### 1. Binary Tree Level Order Traversal

- LeetCode 102
- Difficulty: Medium
- Main idea: BFS with queue

Requirement:

- return values level by level
- explain why queue is the right tool

### 2. Validate Binary Search Tree

- LeetCode 98
- Difficulty: Medium
- Main idea: recursion with valid range or inorder property

Requirement:

- explain why checking only parent and child is not enough
- explain the valid min/max range idea

### 3. Lowest Common Ancestor of a Binary Tree

- LeetCode 236
- Difficulty: Medium
- Main idea: recursion from subtrees upward

Requirement:

- explain what each recursive call returns
- include one manual trace

### 4. Path Sum II

- LeetCode 113
- Difficulty: Medium
- Main idea: DFS + backtracking

Requirement:

- return all valid root-to-leaf paths
- explain why backtracking is needed

---

## Submission Rules

Create 4 JavaScript files:

- `lc102_level_order.js`
- `lc98_validate_bst.js`
- `lc236_lca_binary_tree.js`
- `lc113_path_sum_ii.js`

Each file must include:

1. the solution
2. at least 3 manual test cases with `console.log`
3. a short comment or section explaining the main idea

---

## Pass Criteria

| # | Requirement | Details |
|---|---|---|
| 1 | All 4 problems attempted | do not skip any |
| 2 | Correct algorithm pattern | BFS for level order, DFS/recursion where appropriate |
| 3 | Manual trace included | at least 1 trace per problem |
| 4 | Time complexity explained | short but correct |
| 5 | Edge cases covered | null root, single node, missing children where relevant |
| 6 | Clean code | readable names, no unnecessary hacks |

---

## Real-Life Connection

Students should connect each problem to a real structure:

| Problem | Real-life analogy |
|---|---|
| Level Order Traversal | company org chart level by level |
| Validate BST | checking whether a sorted decision hierarchy is still valid |
| Lowest Common Ancestor | finding nearest shared manager in org chart |
| Path Sum II | checking all valid routes that meet a target budget / score |

---

## Suggested Workflow

For each problem:

1. draw a small tree by hand
2. decide if the problem is BFS or DFS
3. state what the function should return
4. write the base case first
5. run manual test cases
6. write one short trace

---

## How To Run

Example:

```bash
cd "/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session_11"
node lc102_level_order.js
node lc98_validate_bst.js
node lc236_lca_binary_tree.js
node lc113_path_sum_ii.js
```

---

## Deliverables

1. 4 JavaScript solution files
2. one `README.md` using the template
3. short manual traces for all 4 problems

---

## Stretch Goals

- solve `Binary Tree Right Side View` (LeetCode 199)
- solve `Kth Smallest Element in a BST` (LeetCode 230)
- write iterative DFS for one problem instead of recursive DFS
