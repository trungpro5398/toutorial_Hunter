# Session 7: Binary Search

## Lesson Purpose

This lesson teaches students how to eliminate half the remaining search space at each step instead of scanning every element.

The goal is not only to "implement binary search."

The real goal is to train these habits:

- name the three invariants before writing any code
- move boundaries past mid, never on mid
- recognize when the search space is a range of answer values, not the input array
- read a monotone condition and know that binary search applies
- debug by tracing the search space after each step

This lesson should be taught in English.

## Final Learning Outcome

By the end of the session, students should be able to:

- explain the O(log n) mental model using the guessing game analogy
- name the three invariants of any binary search problem before coding
- implement classic binary search on a sorted array
- explain why `left <= right` is the correct loop condition
- explain why mid must be calculated as `left + floor((right - left) / 2)`
- identify a monotone feasibility function and apply binary search on the answer space
- implement the two-boundary pattern for finding the minimum valid answer
- explain why at least one half is always sorted in a rotated array
- implement binary search on a rotated sorted array using the sorted-half check
- debug a binary search by tracing `left`, `right`, and `mid` after each iteration

## Why This Session Matters

Binary search appears in many real problems that do not announce themselves as "search" problems:

- minimum capacity for shipping or scheduling
- minimum speed to finish a task within a deadline
- finding version boundaries in release history
- searching in sorted databases, sorted logs, sorted timestamps

The underlying idea — eliminate half the space using a condition — is one of the most portable algorithmic skills.

The message for students:

> If you can test whether a value is too small, too large, or correct — and the answers follow a monotone pattern — you can binary search.

## The Guessing Game Opening

Start every session with this. Do not skip it.

Tell students:

> I am thinking of a number between 1 and 100. You must guess it. I will only say: higher, lower, or correct. What is your first guess?

Students will say 50. Ask them:

> Why not 1?

After the demo plays out through a few guesses, draw this on the whiteboard:

```text
Guess 50 → "higher" → eliminate 1–50    (50 numbers gone in one step)
Guess 75 → "lower"  → eliminate 75–100  (25 numbers gone)
Guess 62 → "higher" → eliminate 50–62   (12 numbers gone)
...
```

Then ask:

> If the range is 1 to 1,000,000 instead of 1 to 100 — how many guesses do you need?

Give students 20 seconds to think. Then reveal: at most 20.

Because 2 to the power of 20 is 1,048,576. Every guess halves the problem.

Write on the board:

```text
Linear scan of 1,000,000 elements:   up to 1,000,000 steps  →  O(n)
Binary search of 1,000,000 elements: at most 20 steps        →  O(log n)
```

Do not rush past this. Give students time to absorb the number 20.

## Suggested Lesson Length

65 to 75 minutes

Recommended pacing:

- Opening mindset + guessing game demo: 8 minutes
- O(log n) mental model and whiteboard: 7 minutes
- Three invariants framework: 5 minutes
- Example 1 — classic binary search: 15 minutes
- Example 2 — binary search on the answer: 18 minutes
- Example 3 — rotated sorted array: 12 minutes
- Homework briefing: 5 minutes

## 1. Opening Mindset

Start with this:

> The key insight in binary search is not the code. It is the habit of asking: can I eliminate half the remaining space right now?

Then explain:

- a linear scan asks "is this the one?" about each element, one at a time
- binary search asks "is the answer in this half or that half?" and then discards one entire half
- the difference is not just speed — it is a completely different way of thinking about the problem

### Teacher Goal

Students should stop thinking:

> "How do I find the element by looking at each one?"

and start thinking:

> "How do I reduce the search space by half at each step?"

## 2. The Three Invariants

Before any code, teach students to answer three questions about every binary search problem.

Write these on the board and leave them visible for the entire session:

### Invariant 1: Search Space

What range is still under consideration?

Example:
- Classic: indexes from `left` to `right` in the array
- Square root: all integers from `1` to `x/2` (possible answers)

### Invariant 2: Condition

How do we test the mid point?

Example:
- Classic: compare `nums[mid]` to `target`
- Square root: check if `mid * mid <= x`

### Invariant 3: Termination

When does the loop stop, and what do we return?

Example:
- Classic: return `mid` if found, return `-1` if loop exits
- Square root: loop exits when `left > right`, return `answer` (last valid mid)

Tell students:

> If you cannot answer all three before writing the while loop, stop and think. The code is not the hard part. The invariants are.

## 3. Example 1: Classic Binary Search

### What We Are Solving

Given a sorted array and a target, return the index of the target. Return -1 if not found.

### Live-Coding Sequence

#### Checkpoint 1: Name the invariants

Ask the students before touching the keyboard:

1. What is the search space? → indexes `[left..right]`, initially `[0..n-1]`
2. What is the condition? → compare `nums[mid]` to `target`
3. What does termination return? → the index if found, -1 if not

#### Checkpoint 2: Write the loop skeleton first

```js
function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    // condition logic here
  }

  return -1;
}
```

Pause here and explain:

- `left <= right` means there is still at least one element to check
- `mid` is computed this way to avoid integer overflow in languages like Java — this is the habit to build now
- the function defaults to -1 at the bottom because we only return inside the loop if found

#### Checkpoint 3: Fill in the condition

```js
if (nums[mid] === target) {
  return mid;
}

if (nums[mid] < target) {
  left = mid + 1;
} else {
  right = mid - 1;
}
```

#### Checkpoint 4: Trace it on the board

```text
nums = [-3, 0, 1, 4, 7, 9, 14], target = 7

Step 1: left=0, right=6, mid=3 → nums[3]=4  → 4 < 7  → left = 4
Step 2: left=4, right=6, mid=5 → nums[5]=9  → 9 > 7  → right = 4
Step 3: left=4, right=4, mid=4 → nums[4]=7  → found! → return 4

3 comparisons for 7 elements.
```

Ask students: how many comparisons would a linear scan need in the worst case? Up to 7. Here we needed 3.

## 4. Example 2: Binary Search on the Answer — Square Root

### Why This Is The Most Important Part of The Session

Classic binary search is well known. Students may have seen it before.

Binary search on the answer is the leap that separates students who only know the pattern from those who can apply it to new problems.

The key idea to repeat multiple times:

> We are not searching inside the given array. We are searching over a range of possible answer values.

### What We Are Solving

LeetCode 69 — Sqrt(x).

Given a non-negative integer `x`, return the floor of its square root without using `Math.sqrt()`.

### Teaching The Monotone Condition First

Before writing any code, draw this on the board for `x = 8`:

```text
answer:   [  0,  1,  2,  3,  4, ...  ]
mid*mid:  [  0,  1,  4,  9, 16, ...  ]
≤ 8?:     [  Y,  Y,  Y,  N,  N, ...  ]
                        ^
               last YES = answer (2)
```

Ask students:

1. If `mid=2` works (`4 ≤ 8`), does `mid=3` also work? → No (`9 > 8`).
2. If `mid=3` fails, does `mid=4` also fail? → Yes.
3. Does this look like a pattern we can binary search? → Yes — find the last Y.

This is the monotone property. We want the **largest mid** where `mid * mid <= x`.

### Live-Coding Sequence

#### Checkpoint 1: Name the invariants

1. Search space: integers `[1, x/2]` — all possible answers
2. Condition: `mid * mid <= x`
3. Termination: when loop exits, return `answer` (the last valid mid we recorded)

#### Checkpoint 2: Write the skeleton

```js
function mySqrt(x) {
  if (x < 2) return x;

  let left = 1;
  let right = Math.floor(x / 2);
  let answer = 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    // condition here
  }

  return answer;
}
```

#### Checkpoint 3: Fill in the condition

```js
if (mid * mid <= x) {
  answer = mid;   // valid candidate — record it, try larger
  left = mid + 1;
} else {
  right = mid - 1; // too big — try smaller
}
```

Ask students: why do we record `answer` and keep going instead of returning immediately? Because we want the **largest** valid mid, not the first one we find.

#### Checkpoint 4: Trace it on the board

```text
x=8, left=1, right=4

Step 1: mid=2 → 2*2=4 ≤ 8 ✓ → answer=2, left=3
Step 2: mid=3 → 3*3=9 > 8 ✗ → right=2
Step 3: left=3 > right=2 → stop

Answer: 2
```

## 5. Example 3: Search Insert Position

### Why This Is The Right Third Example

This problem is almost identical to Example 1. The only change is one line at the end.

But that one line teaches a deep insight about what `left` means when the binary search loop exits.

### What We Are Solving

LeetCode 35 — Search Insert Position.

Given a sorted array and a target, return the index of the target. If not found, return the index where it would be inserted to keep the array sorted.

```text
nums = [1, 3, 5, 6]

searchInsert(5) → 2   (found at index 2)
searchInsert(2) → 1   (2 would go between 1 and 3)
searchInsert(7) → 4   (7 goes at the end)
searchInsert(0) → 0   (0 goes at the start)
```

### Teaching The Key Insight

Write the classic binary search ending:

```js
return -1;  // not found
```

Then ask: if the target is not in the array, where would it go?

Work through `target=2` on `[1, 3, 5, 6]` on the board:

```text
Step 1: mid=1 → nums[1]=3 > 2 → right=0
Step 2: mid=0 → nums[0]=1 < 2 → left=1
Step 3: left=1 > right=0 → stop
```

Ask: where did `left` land? At index 1. What is `nums[1]`? It is 3 — the first element greater than 2. Inserting 2 at index 1 gives `[1, 2, 3, 5, 6]`. That is correct.

The insight to say aloud:

> When the binary search loop exits, `left` is always sitting at the position of the first element greater than the target. That is exactly where we would insert the target.

### Live-Coding Sequence

#### Checkpoint 1: Start from the Example 1 template

Show the code side by side. The only difference is the last line.

#### Checkpoint 2: Write the full solution

```js
function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid;       // found — identical to classic binary search
    }

    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;          // ← the only change from Example 1
}
```

#### Checkpoint 3: Trace all four cases

```text
nums = [1, 3, 5, 6]

target=5: mid=1→3<5→left=2, mid=2→5=5 → return 2  ✓ (found)
target=2: mid=1→3>2→right=0, mid=0→1<2→left=1, stop → return 1  ✓ (insert)
target=7: mid=1→3<7→left=2, mid=2→5<7→left=3, mid=3→6<7→left=4, stop → return 4  ✓
target=0: mid=1→3>0→right=0, mid=0→1>0→right=-1, stop → return 0  ✓
```

## 6. Connection to Previous Sessions

Draw these connections explicitly before homework briefing.

**Connection to Two Pointers (Session 4):**
Classic binary search is two pointers — `left` and `right` — that always move inward. The difference is the movement rule: two pointers move based on problem conditions, binary search moves based on halving. Same pointer discipline, different goal.

**Connection to Sliding Window (Session 6):**
Both use two pointer variables that move. Sliding window moves pointers to maintain a valid window. Binary search moves pointers to eliminate half the search space. Different goals, same structural habit.

**Connection to React useState (Session 6):**
The search_demo visualizer shows `left`, `right`, and `mid` as explicit state. Each step is a state transition — the exact `previous state → event → next state` model taught in Session 6.

## 7. Common Mistakes

### Mistake 1: `left < right` instead of `left <= right`

Missing the element when `left === right`.

Example to show in class:

```js
binarySearch([5], 5)  // returns -1 instead of 0 with wrong condition
```

### Mistake 2: `right = mid` (infinite loop)

When `left === 0` and `right === 1`, `mid = 0`. If the condition says go left and you write `right = mid`, the search space never shrinks.

Always move past mid. `right = mid - 1`.

### Mistake 3: Integer overflow form

In JavaScript this does not cause runtime errors. But in Java or C it does.

Teach the safe form now so the habit is right before it matters.

### Mistake 4: Wrong boundaries for binary search on the answer

The most common: setting `left = 0` or `right = x` instead of thinking carefully.

For square root: `right = x` works but is slow. `right = x/2` is a tighter and faster boundary since `sqrt(x) ≤ x/2` for all `x ≥ 4`.

Ask the two questions before writing boundaries:
- What is the smallest value that could possibly work?
- What is the largest value that could possibly work?

### Mistake 5: Returning -1 instead of `left` for insert position

Students copy the Example 1 template and forget to change the final return:

```js
return -1;    // wrong for search insert position
return left;  // correct — left is the insertion point when loop exits
```

## 8. Homework Briefing

Students pick one option from HOMEWORK.md:

- Option A (Beginner): First Bad Version — binary search on version numbers
- Option B (Intermediate): Koko Eating Bananas — binary search on the answer, same "find minimum valid answer" pattern as Example 2
- Option C (Stretch): Find Peak Element — no target, slope direction as the condition

Point students to:

- `HOMEWORK.md`
- `HOMEWORK_README_TEMPLATE.md`
- `binary_search_examples.js` as reference
- `search_demo/` as the React visualizer for exploring the algorithm

### What This Homework Is Really Training

The homework is not just about finding the correct output.

It is training these habits:

- name the invariants before coding
- set boundaries correctly
- move boundaries past mid
- write a helper condition function for the answer-space pattern

### Why This Homework Matters

Binary search on the answer is one of the most reusable ideas in technical interviews.

Students who can recognize a monotone feasibility function and apply this pattern will be able to solve a wide range of problems that do not look like search problems at first glance.

## Teaching Summary

If students remember only three things, they should be:

1. Binary search eliminates half the search space at each step by testing the mid point.
2. The search space does not have to be the input array — it can be a range of possible answer values.
3. Before coding, always name: search space, condition, termination.
