# Session 7: Binary Search

## Lesson Purpose

This lesson introduces **binary search**, the most important search technique in programming.

The core idea is:

> Instead of checking every element one by one, eliminate half the remaining possibilities at each step.

This matters because it turns a problem that looks like O(n) into O(log n).

For 1,000,000 elements:

- Linear scan: up to 1,000,000 comparisons
- Binary search: at most 20 comparisons

That difference is not academic. It is the difference between code that feels instant and code that lags.

## Why This Should Be The Next Algorithm

This should come after:

- two pointers
- prefix sums
- sliding window

Because binary search uses the same left/right pointer discipline as two pointers and sliding window — but adds a different movement rule: always eliminate exactly half the remaining space.

It is also one of the most common algorithm patterns in technical interviews.

## Core Mindset

Do not ask:

> "How do I scan through every value to find the answer?"

Ask:

> "Can I test whether the middle value is too small, too large, or correct — and then cut my search space in half?"

That is the real skill.

## Three Invariants to Name Before Coding

Every binary search problem has three things students must be able to state clearly before writing any code:

1. **Search space** — what range of indexes or values are still under consideration?
2. **Condition** — how do we test the mid point to decide which half to eliminate?
3. **Termination** — when do we stop, and what do we return?

If any of these are unclear, do not start coding yet.

## The Guessing Game Analogy

Before looking at any code, think about this:

I am thinking of a number between 1 and 100. You must guess it. I will only say: higher, lower, or correct.

What is your first guess?

Most people say 50. Why not 1?

Because 50 eliminates half the range with a single guess, no matter what I say.

Now: what if the range was 1 to 1,000,000? How many guesses would you need?

At most 20. Because 2 to the power of 20 is 1,048,576. Every guess cuts the problem in half.

That is O(log n) in action.

## What Is Binary Search?

Binary search works on any sorted or monotone structure where one half can be eliminated based on a test.

The pattern:

```text
left = start of search space
right = end of search space

while left <= right:
  mid = left + floor((right - left) / 2)

  if mid is the answer:
    return mid

  if mid is too small:
    left = mid + 1      ← eliminate left half

  if mid is too large:
    right = mid - 1     ← eliminate right half

return not found
```

## Three Pattern Types

### 1. Classic: Search in a Sorted Array

The search space is the array indexes.

The condition is a direct comparison: `nums[mid]` vs `target`.

### 2. Binary Search on the Answer

The search space is a range of possible answer values, not the array itself.

The condition is a helper function that checks: "does this answer value work?"

This works whenever the feasibility function is monotone:

- if value X works → all values larger than X also work
- if value X fails → all values smaller than X also fail

Then we binary search to find the smallest (or largest) X that works.

### 3. Modified: Find the Insertion Position

The search space is the same as classic binary search.

The difference: when the target is not found, instead of returning -1 we return `left` — the position where the target would be inserted to keep the array sorted.

## Example 1: Classic Binary Search

### Problem

Given a sorted array and a target, return the index of the target. Return -1 if not found.

### Key Idea

Because the array is sorted, each comparison eliminates half the remaining elements.

### Walkthrough

```text
nums = [-3, 0, 1, 4, 7, 9, 14], target = 7

Step 1: left=0, right=6, mid=3  → nums[3]=4  → 4 < 7  → left = 4
Step 2: left=4, right=6, mid=5  → nums[5]=9  → 9 > 7  → right = 4
Step 3: left=4, right=4, mid=4  → nums[4]=7  → found! → return 4

Total: 3 comparisons for 7 elements
```

### JavaScript Solution

```js
function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}
```

### Complexity

- Time: `O(log n)`
- Space: `O(1)`

## Example 2: Binary Search on the Answer — Square Root

### Problem

LeetCode 69 — Sqrt(x).

Given a non-negative integer `x`, return the floor of its square root. Do not use `Math.sqrt()`.

```text
x=8  → 2  (sqrt(8) ≈ 2.82, floor = 2)
x=9  → 3  (sqrt(9) = 3 exactly)
```

n
10 _ 10
n _ n = 4 \* 4 = 16

### Key Idea

We are not searching inside an array. We are searching over all possible answers: the integers `0, 1, 2, ..., x`.

The answer space looks like this for `x = 8`:

```text
answer:   [  0,  1,  2,  3,  4, ...  ]
mid*mid:  [  0,  1,  4,  9, 16, ...  ]
≤ 8?:     [  Y,  Y,  Y,  N,  N, ...  ]
                        ^
               last YES = our answer (2)
```

Key property: once `mid * mid > x`, every larger number also fails. This monotone structure lets us binary search over the answer space.

We want the **last YES** (largest valid answer), so:

- if `mid * mid <= x` → record `mid`, try larger (`left = mid + 1`)
- if `mid * mid > x` → too big, try smaller (`right = mid - 1`)

### Three Invariants

1. **Search space:** `[1, x/2]` — all possible integer answers (sqrt(x) ≤ x/2 for x ≥ 4)
2. **Condition:** `mid * mid <= x` — this mid is still a valid candidate
3. **Termination:** when `left > right`, `answer` holds the last valid mid

### Walkthrough

```text
x = 8, left=1, right=4

Step 1: mid=2 → 2*2=4 ≤ 8 ✓ → answer=2, left=3
Step 2: mid=3 → 3*3=9 > 8 ✗ → right=2
Step 3: left=3 > right=2 → stop

Answer: 2
```

### JavaScript Solution

```js
function mySqrt(x) {
  if (x < 2) return x;

  let left = 1;
  let right = Math.floor(x / 2);
  let answer = 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (mid * mid <= x) {
      answer = mid; // valid — record it, try larger
      left = mid + 1;
    } else {
      right = mid - 1; // too big — try smaller
    }
  }

  return answer;
}
```

### Complexity

- Time: `O(log x)`
- Space: `O(1)`

## Example 3: Search Insert Position

### Problem

LeetCode 35 — Search Insert Position.

Given a sorted array and a target, return the index of the target. If not found, return the index where it would be inserted to keep the array sorted.

```text
nums = [1, 3, 5, 6] put 2 in inside nums
nums = [1, 3, 5, 6]

searchInsert(5) → 2   (found at index 2)
searchInsert(2) → 1   (2 would go between 1 and 3)
searchInsert(7) → 4   (7 would go at the end)
searchInsert(0) → 0   (0 would go at the start)
```

### Key Idea

The code is almost identical to classic binary search. The only change: instead of returning -1 when not found, return `left`.

Why does `left` equal the insertion position?

When the loop exits, `left > right`. At that exact point, `left` is the smallest index where `nums[left] > target`. Inserting the target at index `left` keeps the array sorted.

### Three Invariants

1. **Search space:** `[left, right]` — same as classic
2. **Condition:** same comparison, `nums[mid]` vs `target`
3. **Termination:** if found return `mid`; if not found return `left` (the insertion point)

### Walkthrough

```text
nums = [1, 3, 5, 6], target = 2

Step 1: left=0, right=3, mid=1 → nums[1]=3 > 2 → right=0
Step 2: left=0, right=0, mid=0 → nums[0]=1 < 2 → left=1
Step 3: left=1 > right=0 → stop

Return left = 1  ← insert 2 at index 1 → [1, 2, 3, 5, 6] ✓
```

### JavaScript Solution

```js
function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid; // found — same as classic binary search
    }

    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  // Not found. left is now the insertion position.
  return left;
}
```

### Complexity

- Time: `O(log n)`
- Space: `O(1)`

## Standard Questions Students Should Ask

When a problem mentions:

- sorted array, find element
- minimum or maximum value that satisfies a condition
- monotone function over a range

students should ask:

1. Is the structure sorted or monotone?
2. Can I test the mid point and decide which half to eliminate?
3. What are my search space boundaries?
4. What does my termination condition return?

## Common Mistakes

### Mistake 1: Wrong Loop Condition (`left < right` instead of `left <= right`)

When `left === right`, there is still one element to check.

Using `left < right` causes the loop to exit before checking it.

This produces silent wrong answers, not crashes — the hardest kind of bug.

Test case to catch it:

```js
binarySearch([5], 5); // should return 0, but returns -1 with the wrong condition
```

### Mistake 2: Infinite Loop (`right = mid` instead of `right = mid - 1`)

When `left = 0` and `right = 1`:

- `mid = 0`
- If the condition says go left and you write `right = mid`, then `right` stays 0
- `left` stays 0, `mid` stays 0 — the loop never shrinks

Always move past mid when it is wrong:

- wrong half is right → `left = mid + 1`
- wrong half is left → `right = mid - 1`

### Mistake 3: Integer Overflow Habit

In JavaScript, integer overflow is not a practical issue for normal array sizes.

But `(left + right) / 2` is the wrong habit to build before learning Java or C, where both values can be close to the 32-bit integer max and their sum overflows to a negative number.

Always write:

```js
const mid = left + Math.floor((right - left) / 2);
```

### Mistake 4: Wrong Boundaries for Binary Search on the Answer

Students almost always set one boundary incorrectly.

For ship capacity: setting `left = 0` is wrong — a ship with zero capacity is not a valid answer. The correct minimum is `max(weights)`, because the ship must be able to carry at least the heaviest package alone.

Rule: ask the two questions before writing the boundaries:

- What is the smallest value that could possibly work?
- What is the largest value that could possibly work?

### Mistake 5: Returning -1 Instead of `left` for Insert Position

Students who solve Example 1 first often copy the template and forget to change the final return:

```js
// Classic binary search
return -1; // wrong for search insert position

// Search insert position
return left; // correct — left is where target would go
```

The loop exit condition guarantees this: when `left > right`, `left` is sitting at the first index that is greater than the target — exactly where the target belongs.

## Teaching Summary

If students remember only three things, they should be:

1. Binary search works by eliminating half the remaining search space at each step.
2. The search space does not have to be the input array — it can be a range of possible answer values.
3. Before coding, always name the three invariants: search space, condition, and termination.
