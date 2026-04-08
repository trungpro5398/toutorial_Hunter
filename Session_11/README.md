# Session 11 — Trees / Binary Trees / BFS / DFS

## Main Topics

- Tree and binary tree fundamentals
- Parent, child, root, leaf, height, depth
- DFS traversal: preorder, inorder, postorder
- BFS traversal: level order
- Real-life tree thinking

## Why Session 11 Follows Session 10

Session 10 teaches linked lists:

- node-based thinking
- traversal with references
- step-by-step movement using `next`

The next natural step is a structure where one node can point to more than one next choice:

- left child
- right child

That structure is a tree.

If linked list is:

```text
A -> B -> C
```

then a tree is:

```text
        A
      /   \
     B     C
    / \     \
   D   E     F
```

This is the first major jump from linear data structures to hierarchical data structures.

## What This Session Teaches

Students will learn how to:

1. explain what a tree is and why it is useful
2. identify root, parent, child, leaf, height, and depth
3. traverse a tree with DFS
4. traverse a tree with BFS
5. connect tree problems to real product structures
6. prepare for common interview problems on binary trees

## Files In This Session

- `LESSON_GUIDE.md`: teaching guide for the session
- `HOMEWORK.md`: homework with 4 LeetCode medium problems
- `HOMEWORK_README_TEMPLATE.md`: submission template
- `TREE_GUIDE.md`: tree notes with real-life examples
- `tree_examples.js`: runnable examples with step-by-step traces

## How To Run The Examples

```bash
cd "/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session_11"
node tree_examples.js
```

The script is written to show:

- what the problem is asking
- the clearest solution idea
- why the answer is correct step by step
