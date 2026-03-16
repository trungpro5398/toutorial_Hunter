# Session 4 Add-On: Two Pointers

## Lesson Purpose

This lesson introduces **two pointers**, one of the next beginner-friendly techniques after prefix sums.

The core idea is:

> Use pointer positions to avoid repeated work.

This technique is useful because it often reduces a brute-force solution from:

- `O(n^2)`

to:

- `O(n)`

depending on the problem pattern.

## What Are Two Pointers?

Two pointers means we keep two indexes moving through the array or string in a controlled way.

[1,2,3,5,6]
left index = 1
right index = 3
[2,3,5]
[3,5,6]
Common patterns:

- left / right from opposite ends
- slow / fast in the same direction
- fixed window
- variable window

For this beginner lesson, focus on:

- slow / fast pointers
- opposite-direction pointers

## Why Learn This After Prefix Sums?

Prefix sums teach:

- precompute once
- answer faster later

Two pointers teach:

- move through data without restarting work
- reuse what you already know about previous positions

Both lessons train the same deeper habit:

> Stop recomputing from scratch if the structure of the problem lets you move smarter.

## Example 1: Remove Or Move Items With Slow/Fast Pointers

### Problem Idea

You want to move through the array once:

- one pointer reads
- one pointer writes

That lets you reorganize the array in-place.

### LeetCode Example: 283. Move Zeroes

Given:

```text
[0, 1, 0, 3, 12]
```

Move all zeroes to the end while keeping the order of non-zero values.

Expected result:

```text
[1, 3, 12, 0, 0]
```

### Why Two Pointers Works

Use:

- `fast` to scan every value
- `slow` to mark the next place where a non-zero value should go

Whenever `fast` finds a non-zero:

- swap `nums[slow]` and `nums[fast]`
- move `slow` forward

### JavaScript Solution

```js
function moveZeroes(nums) {
  let slow = 0;

  for (let fast = 0; fast < nums.length; fast += 1) {
    // When we find a non-zero, place it at the next write position.
    if (nums[fast] !== 0) {
      [nums[slow], nums[fast]] = [nums[fast], nums[slow]]; swap function 
      slow += 1;
    }
  }
}
```

### Walkthrough

Start:

```text
nums = [0, 1, 0, 3, 12]
slow = 0
```

`fast = 0`

- value is `0`
- do nothing

`fast = 1`

- value is `1`
- swap index `0` and `1`

Now:

```text
[1, 0, 0, 3, 12]
slow = 1
```

`fast = 3`

- value is `3`
- swap index `1` and `3`

Now:

```text
[1, 3, 0, 0, 12]
slow = 2
```

`fast = 4`

- value is `12`
- swap index `2` and `4`

Now:

```text
[1, 3, 12, 0, 0]
```

### Complexity

- Time: `O(n)`
- Extra space: `O(1)`

### Why We Solve It This Way

Because:

- we only scan once
- we do not rebuild a second array
- we keep the non-zero order correct

## Example 2: Opposite-End Pointers

### Problem Idea

Use one pointer at the left and one at the right.

This is useful when:

- pairs depend on both ends
- we want to compare mirrored positions

### Simple Example: Valid Palindrome (Letters Only)

Given a cleaned lowercase string:

```text
"racecar"
```

Compare:

- left with right
- then move inward

If all pairs match, it is a palindrome.

### Code

```js
function isPalindromeSimple(text) {
  let left = 0;
  let right = text.length - 1;

  while (left < right) {
    if (text[left] !== text[right]) {
      return false;
    }

    left += 1;
    right -= 1;
  }

  return true;
}
```

### Why This Works

We only compare the positions that matter.

There is no reason to restart from the beginning every time.

## Common Mistakes

### Mistake 1: Moving The Wrong Pointer

Students often update:

- both pointers when only one should move

The fix is:

- define the exact rule for each pointer before writing code

### Mistake 2: Forgetting The Invariant

For `Move Zeroes`, the invariant is:

- everything before `slow` is already placed correctly

If students lose that idea, the algorithm feels random.

### Mistake 3: Using Extra Loops Too Early

Beginners often fall back to nested loops.

Before writing a second loop, ask:

> Can the pointer continue from where it already is?

## Teaching Summary

If students remember only three things from this lesson, they should be:

1. Two pointers means tracking positions carefully, not scanning blindly.
2. The pointer movement rule is the heart of the algorithm.
3. Many `O(n^2)` beginner solutions can become `O(n)` with correct pointer logic.
