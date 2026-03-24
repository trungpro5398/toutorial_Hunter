# Session 7 Homework

## Goal

Practice binary search on three increasingly difficult problems.

Pick one option. Implement it in JavaScript, write 3 manual test cases, and submit a README.

## What This Homework Trains

This homework trains the exact habit from class:

- name the three invariants (search space, condition, termination) before coding
- move the boundaries correctly — always past mid, never on mid
- recognize when the search space is not the input array

## Core Skills Being Trained

- `while (left <= right)` loop structure
- `mid = left + Math.floor((right - left) / 2)`
- moving boundaries with `left = mid + 1` or `right = mid - 1`
- writing a helper condition function for binary search on the answer
- identifying which half is sorted in a modified binary search

## Option A: First Bad Version (Beginner)

### Problem

You have `n` versions of software labeled `1` through `n`.

There is a bug in some version, and it caused all versions after it to also be bad.

You are given an API function `isBadVersion(version)` that returns `true` or `false`.

Find the first bad version using the minimum number of API calls.

### Why This Is A Good Fit

This is pure binary search on a range of integers.

The array of feasibility looks like:

```text
versions: [ 1,  2,  3, ... , n ]
bad?:     [ F,  F,  T, ... , T ]
                   ^
               first T = answer
```

Once a version is bad, all later versions are bad. This monotone structure is exactly what makes binary search work.

### What To Implement

Since we cannot call a real API, define `isBadVersion` at the top of your file:

```js
const FIRST_BAD = 4; // change this to test different cases

function isBadVersion(version) {
  return version >= FIRST_BAD;
}
```

Then implement:

```js
function firstBadVersion(n) {
  // your code here
}
```

### Required Test Cases

1. `n = 5`, first bad = 4 → expected output: `4`
2. `n = 1`, first bad = 1 → expected output: `1`
3. `n = 10`, first bad = 7 → expected output: `7`

---

## Option B: Koko Eating Bananas (Intermediate)

### Problem

Koko has piles of bananas. The guard will be back in `h` hours.

Each hour, Koko picks one pile and eats up to `k` bananas from it. If the pile has fewer than `k` bananas, she eats the whole pile and does not eat from another pile that hour.

Find the minimum integer `k` such that she can eat all bananas within `h` hours.

### Why This Is A Good Fit

This is the same pattern as the ship example from class.

The answer space is:

```text
k:         [ 1,  2,  3, ... , max(piles) ]
finishes?:  [ N,  N,  T, ... ,          T ]
                       ^
                   first T = answer
```

Write a helper `hoursNeeded(piles, k)` — how many hours does it take to eat everything at speed `k`?

Then binary search over `k` to find the smallest that works.

### What To Implement

```js
function hoursNeeded(piles, k) {
  // your code here
}

function minEatingSpeed(piles, h) {
  // your code here
}
```

Boundaries:
- `left = 1` (minimum possible speed)
- `right = Math.max(...piles)` (eating the biggest pile in one hour is always enough)

### Required Test Cases

1. `piles = [3, 6, 7, 11]`, `h = 8` → expected: `4`
2. `piles = [30, 11, 23, 4, 20]`, `h = 5` → expected: `30`
3. `piles = [30, 11, 23, 4, 20]`, `h = 6` → expected: `23`

---

## Option C: Find Peak Element (Stretch)

### Problem

A peak element is one that is greater than its neighbors.

Given an array where `nums[i] !== nums[i + 1]`, find any peak element and return its index.

You may assume `nums[-1] = -Infinity` and `nums[n] = -Infinity` (the edges are always valleys).

Solve in `O(log n)` time.

### Why This Is A Good Fit

There is no target. The condition to move the boundary is based on slope direction, not a value comparison.

Key insight:

```text
If nums[mid] < nums[mid + 1]  → the peak is on the right side
If nums[mid] > nums[mid + 1]  → the peak is on the left side (or mid is the peak)
```

This is because the array must go up then come down somewhere. Whichever direction nums[mid] slopes, the peak must exist in that direction.

### What To Implement

```js
function findPeakElement(nums) {
  // your code here
}
```

### Required Test Cases

1. `nums = [1, 2, 3, 1]` → expected: `2` (value 3 at index 2)
2. `nums = [1, 2, 1, 3, 5, 6, 4]` → expected: `1` or `5` (either peak is valid)
3. `nums = [1]` → expected: `0`

---

## Required Implementation Rules

- use `while (left <= right)` loop structure
- compute mid with `left + Math.floor((right - left) / 2)`
- move boundaries with `left = mid + 1` or `right = mid - 1` — never `left = mid` or `right = mid`
- do not solve with a linear scan (no `for` loop from 0 to n checking every value)
- no brute force where O(log n) is expected

## Required Deliverables

- source code in JavaScript (one `.js` file)
- `README.md`

## README Must Include

- what the problem does
- the three invariants in your own words:
  - what is your search space?
  - what is your condition (how do you test mid)?
  - when does the loop terminate and what does it return?
- 3 manual test cases with input, expected output, actual output
- one short note on how you avoided an off-by-one or infinite loop

Students may use `HOMEWORK_README_TEMPLATE.md` as a starting point.

## Pass Criteria

- the solution runs correctly
- the loop structure is `while (left <= right)`
- boundaries move with `mid + 1` and `mid - 1` (not `mid`)
- mid is calculated with the safe form
- no brute force O(n) scan where O(log n) is required
- the README is complete with all three invariants explained

## Optional Stretch Goals

- after completing your chosen option, solve one of the other two options
- for Option B: verify your answer by also writing the brute force O(n * max) solution and confirming both agree
- for Option C: draw the slope direction logic on paper for the trace in your README

## Common Failure Cases

### Failure 1: Linear Scan

A `for` loop from 0 to n that checks every value is not binary search. This is O(n) and not acceptable for these problems.

### Failure 2: Off-By-One on Boundaries

Example:

```js
right = mid;   // wrong — can cause infinite loop
right = mid - 1; // correct — always shrinks the search space
```

### Failure 3: Wrong Boundaries for Option B

Example:

```js
left = 0;   // wrong — speed 0 means Koko never eats
left = 1;   // correct
```

### Failure 4: Missing Invariant Explanation in README

The three invariants must be written in the student's own words. Copying the problem statement is not enough.

## Why This Homework Matters

Binary search on the answer is one of the most reusable algorithm ideas in competitive programming and technical interviews.

Students who internalize the three-invariant framework will be able to recognize and solve a wide range of problems that do not look like "binary search" at first — but are.
