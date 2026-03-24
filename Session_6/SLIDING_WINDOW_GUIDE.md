# Session 6 Add-On: Sliding Window

## Lesson Purpose

This lesson introduces **sliding window**, the next practical algorithm after two pointers.

The core idea is:

> Keep a contiguous range and update the answer as the window moves.

This matters because many beginner problems look expensive at first:

- check every subarray
- check every substring
- recompute the same range again and again

Sliding window helps students stop restarting work from zero.

## Why This Should Be The Next Algorithm

This should come after:

- prefix sums
- two pointers

because it combines ideas from both:

- pointer movement from two pointers
- maintaining useful summary information instead of recomputing everything

It is also a very common interview and contest pattern.

## Core Mindset

Do not ask:

> "How do I re-scan this whole range again?"

Ask:

> "If the window moves by one step, what small update can I make instead?"

That is the real skill.

## What Is A Sliding Window?

A sliding window is a contiguous region of an array or string.

Example:

```text
nums = [2, 1, 5, 1, 3, 2]
window size = 3
```

Possible windows:

```text
[2, 1, 5]
[1, 5, 1]
[5, 1, 3]
[1, 3, 2]
```

Instead of calculating each window from scratch, we update from the previous one.

## Two Common Types

### 1. Fixed-Size Window

The window size is always `k`.

Examples:

- maximum sum of any subarray of size `k`
- average of every subarray of size `k`

### 2. Variable-Size Window

The size changes depending on a condition.

Examples: 

- longest substring without repeating characters
- smallest subarray with sum at least `target`

## Example 1: Fixed Window Maximum Sum

### Problem

Given:

```text
nums = [2, 1, 5, 1, 3, 2]
k = 3
```

Find the maximum sum of any contiguous subarray of size `3`.

### Naive Way

Check every window and sum all `k` elements again.

This costs:

- `O(n * k)`

### Better Way

Build the first window once:

```text
[2, 1, 5] -> sum = 8
```

Then slide:

- add the new right value
- subtract the old left value

Next window:

```text
[1, 5, 1]
new sum = old sum - 2 + 1 = 7
```

Next:

```text
[5, 1, 3]
new sum = 7 - 1 + 3 = 9
```

Next:

```text
[1, 3, 2]
new sum = 9 - 5 + 2 = 6
```

Maximum is:

```text
9
```

### JavaScript Solution

```js
function maxSumSubarrayOfSizeK(nums, k) {
  if (k > nums.length) return null;

  let windowSum = 0;

  for (let i = 0; i < k; i += 1) {
    windowSum += nums[i];
  }

  let maxSum = windowSum;

  for (let right = k; right < nums.length; right += 1) {
    windowSum += nums[right];
    windowSum -= nums[right - k];
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}
```

### Complexity

- Time: `O(n)`
- Extra space: `O(1)`

## Example 2: Longest Substring Without Repeating Characters

### Problem

Given a string:

```text
"abcaef"
```

Find the length of the longest substring with no repeated characters.

### Key Idea

Use:

- `right` to expand the window
- `left` to shrink it when the condition breaks

We keep a `Set` of characters currently inside the window.

### Walkthrough

Start with:

```text
"a"
"ab"
"abc"
```

Now the next character is another `"a"`.

The window is no longer valid.

So move `left` forward and remove characters until the duplicate is gone.

Then continue expanding.

### JavaScript Solution
1,2,3,1,4,5,6
left = 0

best = 0

index = 2
seen [ 1,2,3]
best = 2 - 0 + 1

index = 3

while 1 in set
{
  [2,3]
  left = 1
}
[2,3,1]
best = 3 - 1 + 1

```js
function lengthOfLongestSubstring(text) {
  const seen = new Set();
  let left = 0;
  let best = 0;

  for (let right = 0; right < text.length; right += 1) {
    while (seen.has(text[right])) {
      seen.delete(text[left]);
      left += 1;
    }

    seen.add(text[right]);
    best = Math.max(best, right - left + 1);
  }

  return best;
}
```

### Why This Works

At every step:

- the window `[left..right]` is valid
- `seen` matches the exact characters inside that window
- `best` stores the longest valid window so far

### Complexity

- Time: `O(n)`
- Extra space: `O(n)` in the worst case

## Example 3: Smallest Subarray With Sum At Least Target

### Problem

Given:

```text
nums = [2, 1, 5, 2, 3, 2]
target = 7
```

Find the length of the smallest contiguous subarray whose sum is at least `target`.

If no such subarray exists, return `0`.

### Why This Problem Is A Good Next Step

This problem combines ideas from the first two examples:

- sum tracking from Example 1
- variable window shrinking from Example 2

But it adds a twist:

- in Example 1, the window size was fixed
- in Example 2, we maximized the window
- here, we **minimize** the window

This trains students to think about **when to shrink** more carefully.

### Key Idea

1. Expand `right` to grow the window and add to the sum.
2. Once the sum is at least `target`, try shrinking from `left` to find the smallest valid window.
3. Keep shrinking as long as the window is still valid.

### Walkthrough

```text
nums = [2, 1, 5, 2, 3, 2], target = 7

Step 1: right=0, window=[2], sum=2           -> too small
Step 2: right=1, window=[2,1], sum=3         -> too small
Step 3: right=2, window=[2,1,5], sum=8       -> valid! length=3
        shrink: window=[1,5], sum=6          -> too small, stop shrinking
Step 4: right=3, window=[1,5,2], sum=8       -> valid! length=3
        shrink: window=[5,2], sum=7          -> valid! length=2
        shrink: window=[2], sum=2            -> too small, stop shrinking
Step 5: right=4, window=[2,3], sum=5         -> too small
Step 6: right=5, window=[2,3,2], sum=7       -> valid! length=3
        shrink: window=[3,2], sum=5          -> too small, stop shrinking

Smallest valid window length: 2
```

### JavaScript Solution

```js
function minSubarrayLen(target, nums) {
  let left = 0;
  let windowSum = 0;
  let minLength = Infinity;

  for (let right = 0; right < nums.length; right += 1) {
    windowSum += nums[right];

    while (windowSum >= target) {
      minLength = Math.min(minLength, right - left + 1);
      windowSum -= nums[left];
      left += 1;
    }
  }

  return minLength === Infinity ? 0 : minLength;
}
```

### Why The `while` Loop Is Important

In Example 2, we also had a `while` loop to shrink.

But here the reason is different:

- in Example 2, we shrink because the window became **invalid** (duplicate character)
- here, we shrink because the window is **valid** and we want to find the **smallest** valid one

This is an important distinction:

> Sometimes you shrink to fix a broken window. Sometimes you shrink to optimize a valid window.

### Complexity

- Time: `O(n)` — each element is added once and removed at most once
- Extra space: `O(1)`

## Example 4: Longest Substring With At Most K Distinct Characters

### Problem

Given:

```text
text = "eceba"
k = 2
```

Find the length of the longest substring that contains at most `k` distinct characters.

### Why This Problem Is A Good Next Step

The first three examples used simple tracking:

- Example 1: a single number (`windowSum`)
- Example 2: a `Set` (present or not)
- Example 3: a single number again (`windowSum`)

This example introduces a **frequency Map**:

- track how many times each character appears inside the window
- the window is valid when the Map has at most `k` keys
- when it becomes invalid, shrink and update the Map

This is the most common real-world sliding window pattern in interviews.

### Key Idea

1. Expand `right` and add the character to the frequency Map.
2. If the Map has more than `k` distinct characters, shrink from `left`.
3. When shrinking, decrease the frequency. If it reaches `0`, delete the key.
4. Track the longest valid window.

### Walkthrough

```text
text = "eceba", k = 2

Step 1: right=0, window="e",     map={e:1}         -> 1 distinct, valid, best=1
Step 2: right=1, window="ec",    map={e:1, c:1}     -> 2 distinct, valid, best=2
Step 3: right=2, window="ece",   map={e:2, c:1}     -> 2 distinct, valid, best=3
Step 4: right=3, window="eceb",  map={e:2, c:1, b:1} -> 3 distinct, invalid!
        shrink: remove 'e', map={e:1, c:1, b:1}     -> still 3, keep shrinking
        shrink: remove 'c', map={e:1, b:1}           -> 2 distinct, valid, best=3
Step 5: right=4, window="eba",   map={e:1, b:1, a:1} -> 3 distinct, invalid!
        shrink: remove 'e', map={b:1, a:1}           -> 2 distinct, valid, best=3

Longest valid substring length: 3 ("ece")
```

### JavaScript Solution

```js
function longestSubstringKDistinct(text, k) {
  if (k === 0) return 0;

  const freq = new Map();
  let left = 0;
  let best = 0;

  for (let right = 0; right < text.length; right += 1) {
    const charRight = text[right];
    freq.set(charRight, (freq.get(charRight) || 0) + 1);

    while (freq.size > k) {
      const charLeft = text[left];
      freq.set(charLeft, freq.get(charLeft) - 1);

      if (freq.get(charLeft) === 0) {
        freq.delete(charLeft);
      }

      left += 1;
    }

    best = Math.max(best, right - left + 1);
  }

  return best;
}
```

### Why Use A Map Instead Of A Set

In Example 2, a `Set` was enough because:

- we only cared if a character was **present or not**

Here, a `Map` is needed because:

- the same character can appear multiple times inside the window
- when shrinking, we decrease the count instead of removing immediately
- only delete the key when the count reaches `0`

This is a general upgrade:

| Tracking need | Data structure |
|---|---|
| present or not | `Set` |
| how many times | `Map` (frequency counter) |

Students should learn to pick the right one based on the problem.

### Complexity

- Time: `O(n)` — each character is added and removed at most once
- Extra space: `O(k)` — the Map holds at most `k + 1` keys before shrinking

## Standard Questions Students Should Ask

When a problem mentions:

- subarray
- substring
- contiguous range
- longest valid range
- smallest valid range
- every window of size `k`

students should ask:

1. Is the range contiguous?
2. Can I move the window instead of recomputing it?
3. Is the window size fixed or variable?
4. What information should I maintain while the window moves?

## Common Mistakes

### Mistake 1: Recomputing The Whole Window

Example:

- summing all `k` elements again for every step

Fix:

- add one incoming value
- remove one outgoing value

### Mistake 2: Not Defining The Window Condition

For variable windows, students must know:

- what makes the window valid
- when to shrink it

If that rule is unclear, the algorithm becomes random.

### Mistake 3: Moving Pointers Without Updating Data

If `left` moves, the summary structure must also update.

Examples:

- remove from sum
- remove from frequency map
- remove from set

### Mistake 4: Confusing Sliding Window With Prefix Sums

Prefix sums are best when:

- many range queries must be answered after preprocessing

Sliding window is best when:

- the range itself moves during one scan

## Teaching Summary

If students remember only three things, they should be:

1. Sliding window works on contiguous ranges.
2. The key idea is to update the window cheaply when it moves.
3. Fixed window and variable window are different patterns and should not be mixed carelessly.
