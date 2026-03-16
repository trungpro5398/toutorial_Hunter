# Session 4: Prefix Sums

## Lesson Purpose

This lesson introduces **prefix sums**, one of the first important precomputation techniques in competitive programming.

The main idea is simple:

> Precompute once, answer many queries faster.

This is an important step because it helps students see how we can improve a solution from:

- `O(n^2)` by recomputing work again and again

to:

- `O(n)` preprocessing
- `O(1)` per range query

That shift in thinking is a key competitive programming habit.

## Core Mindset

Do not ask:

> "How do I calculate this range every time?"

Ask:

> "What can I prepare once so each query becomes cheap?"

That is the real idea of prefix sums.

## What Is A Prefix Sum?

For an array:

```text
nums = [2, 4, 1, 7, 3]
```

A prefix sum array stores the sum from the beginning up to each position.

We usually build it with one extra slot:

```text
prefix[0] = 0
prefix[1] = 2
prefix[2] = 6
prefix[3] = 7
prefix[4] = 14
prefix[5] = 17
```

Meaning:

- `prefix[1]` = sum of first 1 element
- `prefix[2]` = sum of first 2 elements
- `prefix[5]` = sum of all 5 elements

## Why Use One Extra Slot?

Using `prefix[0] = 0` makes range formulas cleaner.

Then the sum of a range `[l..r]` is:

```text
prefix[r + 1] - prefix[l]
```

This avoids messy edge cases when `l = 0`.

## Example 1: Range Sum [l..r]

### Problem

Given:

```text
nums = [2, 4, 1, 7, 3]
```

Find the sum from index `0` to index `2`.

That means:

```text
4 + 1 + 7 = 12
```

### Naive Way

Loop from `l` to `r` every time:

```js
let sum = 0;
for (let i = l; i <= r; i += 1) {
  sum += nums[i];
}
```

If there are many queries, this becomes slow.

### Better Way With Prefix Sums

Build:

```text
prefix = [0, 2, 6, 7, 14, 17]
```

Then:

```text
sum(1..3) = prefix[4] - prefix[1]
          = 14 - 2
          = 12
```

### Why This Is Better

After preprocessing:

- each range sum query becomes `O(1)`

This is the first big optimization students should feel clearly.

## Example 2: Count Values That Match A Condition In [l..r]

Prefix sums are not only for sums.

They also work for **counts**.

### Problem

Given:

```text
nums = [2, 5, 8, 1, 6, 3]
```

Count how many even numbers are in the range `[1..4]`.

The range is:

```text
[5, 8, 1, 6]
```

Even numbers are:

- `8`
- `6`

So the answer is:

```text
2
```

### Trick

Convert the array into a binary marker array:

```text
isEven = [1, 0, 1, 0, 1, 0]
```

Now build prefix sums on `isEven`:

```text
prefixEven = [0, 1, 1, 2, 2, 3, 3]
```

Then:

```text
countEven(1..4) = prefixEven[5] - prefixEven[1]
                = 3 - 1
                = 2
```

### Teaching Point

This is a very important idea:

> Prefix sums can answer "how many?" if we convert the condition into 0/1 values.

This appears often in competitive programming.

## Complexity Comparison

### Without Prefix Sums

For each query `[l..r]`, if you loop through the range:

- one query costs `O(n)` in the worst case
- `q` queries cost `O(q * n)`

### With Prefix Sums

Build prefix once:

- preprocessing costs `O(n)`

Then each query:

- costs `O(1)`

Total for `q` queries:

- `O(n + q)`

### Why This Matters

If:

- `n = 100000`
- `q = 100000`

Then recomputing every range is much too slow.

Prefix sums are one of the first tools that make large input sizes manageable.

## Building A Prefix Sum Array

### Standard Pattern

```js
const prefix = new Array(nums.length + 1).fill(0);

for (let i = 0; i < nums.length; i += 1) {
  prefix[i + 1] = prefix[i] + nums[i];
}
```

### Why This Works

At each step:

- `prefix[i]` already stores the sum of everything before `nums[i]`
- so `prefix[i + 1]` becomes that old sum plus `nums[i]`

## Standard Query Formula

For inclusive range `[l..r]`:

```js
const rangeSum = prefix[r + 1] - prefix[l];
```

That is the most important formula in this lesson.

Students should memorize and understand it.

## Simple Code Example 1: Range Sum Queries

```js
function buildPrefixSum(nums) {
  const prefix = new Array(nums.length + 1).fill(0);

  // prefix[i + 1] stores the sum of nums[0..i]
  for (let i = 0; i < nums.length; i += 1) {
    prefix[i + 1] = prefix[i] + nums[i];
  }

  return prefix;
}

function queryRangeSum(prefix, left, right) {
  // Using the standard inclusive range formula:
  // sum(left..right) = prefix[right + 1] - prefix[left]
  return prefix[right + 1] - prefix[left];
}

const nums = [2, 4, 1, 7, 3];
const prefix = buildPrefixSum(nums);

console.log(queryRangeSum(prefix, 1, 3)); // 12
```

## Simple Code Example 2: Count Even Numbers In A Range

```js
function buildEvenPrefix(nums) {
  const prefix = new Array(nums.length + 1).fill(0);

  for (let i = 0; i < nums.length; i += 1) {
    const isEven = nums[i] % 2 === 0 ? 1 : 0;
    prefix[i + 1] = prefix[i] + isEven;
  }

  return prefix;
}

function countEvenInRange(prefixEven, left, right) {
  // The same formula works because the prefix array stores counts.
  return prefixEven[right + 1] - prefixEven[left];
}

const nums = [2, 5, 8, 1, 6, 3];
const prefixEven = buildEvenPrefix(nums);

console.log(countEvenInRange(prefixEven, 1, 4)); // 2
```

## Common Mistakes

### Mistake 1: Off-By-One Errors

Students often write:

```js
prefix[right] - prefix[left]
```

This is usually wrong for an inclusive range.

The correct formula is:

```js
prefix[right + 1] - prefix[left]
```

### Mistake 2: Forgetting `prefix[0] = 0`

Without the extra slot, code becomes harder to reason about.

For beginners, always teach the `n + 1` version first.

### Mistake 3: Rebuilding Prefix For Every Query

That defeats the purpose.

The idea is:

- build once
- answer many queries

## LeetCode Example: 303. Range Sum Query - Immutable

This is one of the best beginner LeetCode problems for prefix sums.

Why this problem is good:

- the idea is simple
- it directly trains precomputation
- it clearly shows "prepare once, answer many times"

### Problem Idea

You are given an integer array.

You need to answer many queries:

- what is the sum of `nums[left..right]`?

Instead of recalculating each range every time, precompute prefix sums in the constructor.

### Why Prefix Sum Is The Right Solution

If the array does not change:

- recomputing each query is repeated work
- prefix sums let us reuse previous computation

That is exactly what precomputation is for.

### JavaScript Solution

```js
class NumArray {
  constructor(nums) {
    // Create a prefix array with one extra slot.
    // prefix[0] = 0 makes the query formula easier.
    this.prefix = new Array(nums.length + 1).fill(0);

    for (let i = 0; i < nums.length; i += 1) {
      // prefix[i + 1] stores the sum of nums[0..i]
      this.prefix[i + 1] = this.prefix[i] + nums[i];
    }
  }

  sumRange(left, right) {
    // Return the inclusive sum from left to right.
    return this.prefix[right + 1] - this.prefix[left];
  }
}
```

### Walkthrough

Input:

```text
nums = [-2, 0, 3, -5, 2, -1]
```

Build:

```text
prefix = [0, -2, -2, 1, -4, -2, -3]
```

Now:

```text
sumRange(0, 2) = prefix[3] - prefix[0] = 1 - 0 = 1
sumRange(2, 5) = prefix[6] - prefix[2] = -3 - (-2) = -1
sumRange(0, 5) = prefix[6] - prefix[0] = -3
```

### Complexity

- Constructor preprocessing: `O(n)`
- Each `sumRange` query: `O(1)`
- Extra space: `O(n)`

### Why We Solve It This Way

We solve it this way because:

- the array is immutable
- queries happen multiple times
- repeated recalculation would waste time

Prefix sums are the cleanest way to trade a small amount of memory for much faster repeated queries.

## Teaching Summary

If students remember only three things from this lesson, they should be:

1. Prefix sums are for **precompute first, answer later**.
2. Range `[l..r]` uses: `prefix[r + 1] - prefix[l]`.
3. Prefix sums can solve both **sum** problems and **count** problems.

That is the foundation.
