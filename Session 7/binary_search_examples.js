"use strict";

/**
 * Session 7 - Binary Search Examples
 *
 * Run:
 *   node binary_search_examples.js
 *
 * This file demonstrates:
 * - brute force linear search (the naive approach we are replacing)
 * - classic binary search (find target in sorted array)
 * - binary search on the answer (minimum ship capacity)
 * - search in a rotated sorted array
 */

// ─────────────────────────────────────────────────────────────────────────────
// BEFORE BINARY SEARCH: Brute Force (Linear Search)
// ─────────────────────────────────────────────────────────────────────────────
//
// This is the naive approach every beginner writes first.
//
// How it works:
//   Start from the first element and walk forward one by one.
//   Stop when the target is found, or when the array ends.
//
// Problem:
//   If the array has 1,000,000 elements and the target is at position 999,999,
//   you check 1,000,000 elements.
//
//   This is O(n) — the work grows with the size of the input.
//
// When is it okay?
//   - The array is unsorted (no other choice)
//   - The array is very small (the overhead does not matter)
//   - You only search once (pre-processing for binary search is not worth it)

function linearSearch(nums, target) {
  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] === target) {
      return { index: i, steps: i + 1 };
    }
  }
  return { index: -1, steps: nums.length };
}

// Also count the steps binary search would take, for comparison.
function binarySearchWithSteps(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let steps = 0;

  while (left <= right) {
    steps += 1;
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return { index: mid, steps };
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return { index: -1, steps };
}

function runBruteForceComparison() {
  console.log("Brute Force vs Binary Search Comparison");
  console.log("─".repeat(60));

  const cases = [
    { nums: [-3, 0, 1, 4, 7, 9, 14, 18, 21], target: 7,  label: "target in middle" },
    { nums: [-3, 0, 1, 4, 7, 9, 14, 18, 21], target: -3, label: "target at start" },
    { nums: [-3, 0, 1, 4, 7, 9, 14, 18, 21], target: 21, label: "target at end" },
    { nums: [-3, 0, 1, 4, 7, 9, 14, 18, 21], target: 5,  label: "target not found" },
  ];

  for (const { nums, target, label } of cases) {
    const linear = linearSearch(nums, target);
    const binary = binarySearchWithSteps(nums, target);

    console.log(`\n  Case: ${label}  (target = ${target})`);
    console.log(`  Linear search:  index=${linear.index.toString().padStart(2)}  steps=${linear.steps}`);
    console.log(`  Binary search:  index=${binary.index.toString().padStart(2)}  steps=${binary.steps}`);
    if (binary.steps < linear.steps) {
      const saved = linear.steps - binary.steps;
      console.log(`  Binary saved ${saved} step(s)`);
    }
  }

  // Show the difference on a large array
  console.log("\n  Large array: 1,000,000 elements");
  const bigArray = Array.from({ length: 1_000_000 }, (_, i) => i * 2); // [0, 2, 4, ..., 1999998]
  const worstTarget = bigArray[bigArray.length - 1]; // last element: worst case for linear
  const linearBig = linearSearch(bigArray, worstTarget);
  const binaryBig = binarySearchWithSteps(bigArray, worstTarget);
  console.log(`  Linear search for ${worstTarget}: ${linearBig.steps.toLocaleString()} steps`);
  console.log(`  Binary search for ${worstTarget}: ${binaryBig.steps} steps`);
  console.log("");
}

// ─────────────────────────────────────────────────────────────────────────────
// EXAMPLE 1: Classic Binary Search
// ─────────────────────────────────────────────────────────────────────────────
//
// Problem:
//   Given a sorted array of integers and a target value,
//   return the index of the target. If not found, return -1.
//
// Key insight:
//   Because the array is sorted, we can look at the middle element
//   and immediately eliminate half the remaining search space.
//
//   - If nums[mid] === target  → found it, return mid
//   - If nums[mid] < target    → target must be in the right half, left = mid + 1
//   - If nums[mid] > target    → target must be in the left half, right = mid - 1
//
// Three invariants to always name before coding:
//   1. Search space:  [left, right] — both inclusive
//   2. Condition:     compare nums[mid] to target to decide which half to eliminate
//   3. Termination:   when left > right, the search space is empty
//
// Complexity:
//   Time:  O(log n) — the search space halves each iteration
//   Space: O(1)     — only a few pointer variables

function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    // Use this form instead of Math.floor((left + right) / 2).
    // In languages like Java or C, (left + right) can overflow a 32-bit integer
    // when both values are very large. This form is the safe habit to build now.
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    if (nums[mid] < target) {
      // mid is too small. Everything from left to mid can be eliminated.
      left = mid + 1;
    } else {
      // mid is too large. Everything from mid to right can be eliminated.
      right = mid - 1;
    }
  }

  // The loop exited with left > right.
  // The search space is empty and target was not found.
  return -1;
}

function runClassicExample() {
  const nums = [-3, 0, 1, 4, 7, 9, 14];
  const target1 = 7;
  const target2 = 5;

  console.log("Classic Binary Search");
  console.log("nums:", nums);
  console.log(`search(${target1}):`, binarySearch(nums, target1)); // expected: 4
  console.log(`search(${target2}):`, binarySearch(nums, target2)); // expected: -1
  console.log("");
}

// ─────────────────────────────────────────────────────────────────────────────
// EXAMPLE 2: Binary Search on the Answer — Square Root
// ─────────────────────────────────────────────────────────────────────────────
//
// Problem (LeetCode 69: Sqrt(x)):
//   Given a non-negative integer x, return the floor of its square root.
//   Do NOT use Math.sqrt(). Return an integer.
//
//   Example: x=8 → 2  (because sqrt(8) ≈ 2.82, floor = 2)
//            x=9 → 3  (because sqrt(9) = 3 exactly)
//
// Why binary search works here — the key insight:
//   We are NOT searching inside an array.
//   We are searching over all POSSIBLE ANSWERS: the integers 0, 1, 2, ..., x.
//
//   Think of all possible answers laid out in a line:
//
//     answer:   [  0,  1,  2,  3,  4,  5, ...  ]
//     mid*mid:  [  0,  1,  4,  9, 16, 25, ...  ]
//     ≤ x=8?:   [  Y,  Y,  Y,  N,  N,  N, ...  ]
//                              ^
//                     last YES = our answer (floor sqrt)
//
//   Key property (monotone):
//   Once mid*mid > x, every larger number also fails.
//   This monotone structure lets us binary search over the answer space.
//
// Three invariants:
//   1. Search space:  [0, x] — all possible integer answers
//   2. Condition:     mid * mid <= x  (this mid is still a valid candidate)
//   3. Termination:   when left > right, `answer` holds the last valid mid
//
// Complexity:
//   Time:  O(log x)
//   Space: O(1)

function mySqrt(x) {
  if (x < 2) return x; // 0→0, 1→1

  let left = 1;
  let right = Math.floor(x / 2); // sqrt(x) is always ≤ x/2 for x ≥ 4
  let answer = 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (mid * mid <= x) {
      // mid is a valid candidate — record it and try a larger one.
      answer = mid;
      left = mid + 1;
    } else {
      // mid * mid is too big — try a smaller one.
      right = mid - 1;
    }
  }

  return answer;
}

function runSqrtExample() {
  console.log("Binary Search on the Answer — Square Root");
  console.log("─".repeat(60));

  const cases = [
    { x: 4,  expected: 2 },
    { x: 8,  expected: 2 },
    { x: 9,  expected: 3 },
    { x: 25, expected: 5 },
    { x: 26, expected: 5 },
  ];

  for (const { x, expected } of cases) {
    const result = mySqrt(x);
    const ok = result === expected ? "✓" : "✗";
    console.log(`  sqrt(${String(x).padStart(2)}) = ${result}  (expected ${expected})  ${ok}`);
  }
  console.log("");
}

// ─────────────────────────────────────────────────────────────────────────────
// EXAMPLE 3: Search Insert Position
// ─────────────────────────────────────────────────────────────────────────────
//
// Problem (LeetCode 35):
//   Given a sorted array and a target, return the index of the target.
//   If the target is not found, return the index where it WOULD be inserted
//   so the array stays sorted.
//
//   Example: nums=[1,3,5,6], target=5 → 2  (found at index 2)
//            nums=[1,3,5,6], target=2 → 1  (2 would go between 1 and 3)
//            nums=[1,3,5,6], target=7 → 4  (7 would go at the end)
//            nums=[1,3,5,6], target=0 → 0  (0 would go at the start)
//
// Why this is a great next step after Example 1:
//   Classic binary search returns -1 when not found.
//   Here we return `left` instead — and that one change gives us the
//   insertion position for free.
//
// Why does `left` equal the insertion position when the loop ends?
//   The loop exits when left > right.
//   At that point, left is the smallest index where nums[left] > target.
//   So inserting target AT left keeps the array sorted.
//
// Three invariants:
//   1. Search space:  [left, right] — both inclusive
//   2. Condition:     same as classic binary search (compare nums[mid] to target)
//   3. Termination:   when left > right, return left (the insertion point)
//
// Complexity:
//   Time:  O(log n)
//   Space: O(1)

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

  // Not found. `left` is now the insertion position.
  return left;
}

function runSearchInsertExample() {
  const nums = [1, 3, 5, 6];

  console.log("Search Insert Position");
  console.log("─".repeat(60));
  console.log("nums:", nums);

  const cases = [
    { target: 5, expected: 2, note: "found at index 2" },
    { target: 2, expected: 1, note: "insert between 1 and 3" },
    { target: 7, expected: 4, note: "insert at end" },
    { target: 0, expected: 0, note: "insert at start" },
  ];

  for (const { target, expected, note } of cases) {
    const result = searchInsert(nums, target);
    const ok = result === expected ? "✓" : "✗";
    console.log(`  searchInsert(${target}) = ${result}  (${note})  ${ok}`);
  }
  console.log("");
}

function main() {
  runBruteForceComparison();
  runClassicExample();
  runSqrtExample();
  runSearchInsertExample();
}

main();
