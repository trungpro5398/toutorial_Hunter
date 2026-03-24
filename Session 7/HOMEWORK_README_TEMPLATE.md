# Binary Search Homework README Template

## Project Overview

Briefly explain what your solution does.

Example:

> This JavaScript solution implements the First Bad Version problem using binary search. Given n versions and an `isBadVersion` API, it finds the first bad version in O(log n) time by halving the search range at each step.

## How To Run

```bash
node your_file_name.js
```

## The Three Invariants

Explain the three invariants for your solution in your own words.

### Search Space

What range of values or indexes are you still considering at any point in the loop?

Example:

> My search space is the range of version numbers from `left` to `right`. At the start, this is `[1, n]`. After each step, one half is eliminated.

### Condition

How do you test the mid point to decide which half to eliminate?

Example:

> I call `isBadVersion(mid)`. If it returns true, the first bad version could be mid or earlier, so I record mid and search left. If false, the first bad version is later, so I search right.

### Termination

When does the loop stop and what does it return?

Example:

> The loop stops when `left > right`, meaning the search space is empty. By that point, `answer` holds the smallest version where `isBadVersion` returned true.

## Manual Test Cases

### Test Case 1

- Input: (describe your input)
- Expected output: (describe what you expect)
- Actual output: (run your code and paste the result)

### Test Case 2

- Input: (describe your input)
- Expected output: (describe what you expect)
- Actual output: (run your code and paste the result)

### Test Case 3

- Input: (describe your input)
- Expected output: (describe what you expect)
- Actual output: (run your code and paste the result)

## Off-By-One Note

Briefly explain one place where an off-by-one could happen in your solution and how you avoided it.

Example:

> In the boundary check, I used `left <= right` instead of `left < right` so that the loop still runs when only one element remains. With `left < right`, a single-element input would exit the loop before checking that element, returning the wrong answer.
