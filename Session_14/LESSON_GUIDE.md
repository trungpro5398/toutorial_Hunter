# Session 14 — Backtracking Foundations / Decision Trees / Choose-Skip

## Start With The Core Idea

Backtracking is not “random recursion”.

Backtracking means:

- make a choice
- go deeper
- come back
- try the next choice

That is all.

If dynamic programming is about:

- saving smaller answers

then backtracking is about:

- exploring smaller choices

So the heart of backtracking is not a formula.

It is a tree of decisions.

---

## A Very Small Picture

Suppose the choices are:

```text
[A, B]
```

For each item, there are two choices:

- take it
- skip it

That creates a little tree:

```text
start
├── take A
│   ├── take B
│   └── skip B
└── skip A
    ├── take B
    └── skip B
```

That is backtracking.

Not mysterious.

Just exploring branches.

---

## What “Backtrack” Means

Suppose a current path is:

```text
[1, 2]
```

Then one more choice is tried:

```text
[1, 2, 3]
```

After that branch is finished, go back to:

```text
[1, 2]
```

Then try something else.

That “go back” move is backtracking.

In code, that often means:

```js
path.push(choice);
dfs(...);
path.pop();
```

That last `pop()` is the “backtrack” step.

---

## The Four Questions Every Backtracking Problem Needs

Before writing code, answer these:

1. What is the current state?
2. What choices can be made next?
3. When is the state complete enough to record an answer?
4. When should a branch stop early?

That fourth question becomes pruning later.

For now, the first three are the most important.

---

## Pattern 1 — Choose / Skip

This is the easiest backtracking pattern.

For each item:

- choose it
- or skip it

That is why it is the best place to start.

### Tiny example first

Take:

```text
[1, 2]
```

All subsets are:

```text
[]
[1]
[2]
[1, 2]
```

How do they appear?

At each item:

- take it
- or skip it

That is the whole pattern.

### What the state means

The state usually includes:

- current index
- current path

For example:

```text
dfs(index, path)
```

means:

- items before `index` are already decided
- `path` stores what has been chosen so far

### Why this pattern is useful

It teaches the most basic backtracking rhythm:

1. make a choice
2. recurse
3. undo the choice

### Simple family template

```js
function chooseSkip(nums) {
  const result = [];

  function dfs(index, path) {
    // If all items have been decided, record the current path.
    if (index === nums.length) {
      result.push([...path]);
      return;
    }

    // Choice 1: skip nums[index]
    dfs(index + 1, path);

    // Choice 2: take nums[index]
    path.push(nums[index]);
    dfs(index + 1, path);
    path.pop(); // backtrack
  }

  dfs(0, []);
  return result;
}
```

### Example — LeetCode 78: Subsets

This is the cleanest starter problem for choose / skip.

#### Problem idea

Return all subsets of an array.

#### How to think

At each number:

- include it
- or do not include it

That is exactly choose / skip.

#### Code

```js
function subsets(nums) {
  const result = [];

  function dfs(index, path) {
    if (index === nums.length) {
      result.push([...path]);
      return;
    }

    dfs(index + 1, path);

    path.push(nums[index]);
    dfs(index + 1, path);
    path.pop();
  }

  dfs(0, []);
  return result;
}
```

#### Tiny trace

For:

```text
[1, 2]
```

The recursion tree explores:

- skip 1, skip 2 -> `[]`
- skip 1, take 2 -> `[2]`
- take 1, skip 2 -> `[1]`
- take 1, take 2 -> `[1, 2]`

#### Common mistake

Forgetting to copy `path` when saving:

```js
result.push([...path]);
```

Without copying, later changes break old answers.

---

## Pattern 2 — For-Loop Expansion

This pattern feels different from choose / skip.

Instead of deciding yes/no on every item, it says:

> From this starting point, try every possible next choice.

That is a very important shift.

### Tiny example first

Suppose the candidates are:

```text
[2, 3, 6]
```

If the target is `6`, then from the current position you may try:

- pick `2`
- or pick `3`
- or pick `6`

This is no longer a simple yes/no branch for one item.

It is:

- loop through all possible next candidates

### What the state means

The state usually includes:

- current `startIndex`
- current path
- remaining target or remaining capacity

This pattern often looks like:

```text
dfs(startIndex, path, remain)
```

### Why `startIndex` matters

It prevents going backward and rebuilding the same combination in a different order.

That is how combinations differ from permutations.

### Simple family template

```js
function loopExpansion(nums, target) {
  const result = [];

  function dfs(startIndex, remain, path) {
    if (remain === 0) {
      result.push([...path]);
      return;
    }

    if (remain < 0) {
      return;
    }

    for (let i = startIndex; i < nums.length; i += 1) {
      path.push(nums[i]);
      dfs(i, remain - nums[i], path); // reuse allowed
      path.pop(); // backtrack
    }
  }

  dfs(0, target, []);
  return result;
}
```

### Example — LeetCode 39: Combination Sum

#### Problem idea

Find all combinations of numbers that add up to the target.

Each number may be used more than once.

#### How to think

At each step, choose what next number to try.

So the right shape is:

- loop through next candidates

not choose/skip for only one fixed item.

#### Code

```js
function combinationSum(candidates, target) {
  const result = [];

  function dfs(startIndex, remain, path) {
    if (remain === 0) {
      result.push([...path]);
      return;
    }

    if (remain < 0) {
      return;
    }

    for (let i = startIndex; i < candidates.length; i += 1) {
      path.push(candidates[i]);
      dfs(i, remain - candidates[i], path);
      path.pop();
    }
  }

  dfs(0, target, []);
  return result;
}
```

#### Tiny trace

For:

```text
candidates = [2, 3, 6, 7]
target = 7
```

One successful path is:

```text
[] -> [2] -> [2, 2] -> [2, 2, 2] -> too big, backtrack
[] -> [2] -> [2, 2] -> [2, 2, 3] -> success
[] -> [7] -> success
```

#### Common mistake

Using `dfs(i + 1, ...)` by accident.

That would disallow reusing the same value, which changes the problem.

---

## Pattern 3 — Permutation Style

This pattern is different again.

Now the order matters.

That changes the thinking a lot.

### Tiny example first

For:

```text
[1, 2]
```

The permutations are:

```text
[1, 2]
[2, 1]
```

Notice:

- same values
- different order
- different answer

That is why permutation backtracking needs a different control mechanism.

### What the state means

The state usually includes:

- current path
- a `used[]` array or set

because the question becomes:

> Which values are already used in this ordering?

### Simple family template

```js
function permutationStyle(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);

  function dfs(path) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i += 1) {
      if (used[i]) continue;

      used[i] = true;
      path.push(nums[i]);
      dfs(path);
      path.pop();
      used[i] = false; // backtrack
    }
  }

  dfs([]);
  return result;
}
```

### Example — LeetCode 46: Permutations

#### Problem idea

Return all possible orderings of the array.

#### How to think

At each step:

- choose one unused number
- place it next

That is why `used[]` is needed.

#### Code

```js
function permute(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);

  function dfs(path) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i += 1) {
      if (used[i]) continue;

      used[i] = true;
      path.push(nums[i]);
      dfs(path);
      path.pop();
      used[i] = false;
    }
  }

  dfs([]);
  return result;
}
```

#### Tiny trace

For:

```text
[1, 2, 3]
```

One branch is:

```text
[] -> [1] -> [1, 2] -> [1, 2, 3]
```

After that branch finishes, backtrack to:

```text
[1, 2]
```

then try:

```text
[1, 3]
```

and continue.

#### Common mistake

Forgetting to reset:

```js
used[i] = false;
```

That blocks valid later branches.

---

## Pattern 4 — Duplicate Handling Basics

Some backtracking problems have duplicate values.

That creates a new problem:

- duplicate branches can produce duplicate answers

So now the task is not only:

- explore choices

It is also:

- avoid generating the same answer more than once

### Tiny example first

Take:

```text
[1, 2, 2]
```

If duplicate handling is ignored, subsets like:

```text
[2]
```

may appear more than once.

That is why extra care is needed.

### The usual fix

Sort the array first.

Then, during a loop, skip duplicate values at the same decision level.

Common idea:

```js
if (i > startIndex && nums[i] === nums[i - 1]) continue;
```

This says:

- if the same value was already tried at this level
- do not try it again

### Example — LeetCode 90: Subsets II

#### Problem idea

Return all unique subsets when duplicates exist.

#### How to think

This is still a subset-style backtracking problem.

But now one more rule is needed:

- skip same-value choices at the same depth

#### Code

```js
function subsetsWithDup(nums) {
  nums.sort((a, b) => a - b);
  const result = [];

  function dfs(startIndex, path) {
    result.push([...path]);

    for (let i = startIndex; i < nums.length; i += 1) {
      if (i > startIndex && nums[i] === nums[i - 1]) continue;

      path.push(nums[i]);
      dfs(i + 1, path);
      path.pop();
    }
  }

  dfs(0, []);
  return result;
}
```

#### Common mistake

Skipping duplicates too aggressively.

The skip rule is only for:

- the same depth / same loop level

not for all future levels.

---

## What Session 14 Should Leave Clear

By the end of this session, these four ideas should feel natural:

1. **Choose / Skip**
- one item, two choices

2. **For-loop expansion**
- from here, try every next candidate

3. **Permutation style**
- pick one unused item next

4. **Duplicate handling**
- same value at the same level should often be skipped

These four ideas are enough to make Backtracking start feeling organized instead of random.

---

## What Should Come Next

The next session should move into stronger forms of backtracking:

- pruning
- string partitioning
- grid search
- constraint backtracking

That is where backtracking becomes powerful, not just understandable.

---

## Final Message

> Backtracking is just exploring a decision tree carefully.  
> The hard part is not recursion.  
> The hard part is knowing what the next choices really are.
