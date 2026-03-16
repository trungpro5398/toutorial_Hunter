"use strict";

/**
 * Session 4 - Prefix Sums Examples
 *
 * Run:
 *   node prefix_sums_examples.js
 *
 * This file demonstrates:
 * - building prefix sums
 * - answering range sum queries
 * - counting values that match a condition in a range
 * - LeetCode 303: Range Sum Query - Immutable
 */

function buildPrefixSum(nums) {
  const prefix = new Array(nums.length + 1).fill(0);

  // prefix[i + 1] stores the sum of nums[0..i]
  for (let i = 0; i < nums.length; i += 1) {
    prefix[i + 1] = prefix[i] + nums[i];
  }

  return prefix;
}

function queryRangeSum(prefix, left, right) {
  // Inclusive range sum:
  // sum(left..right) = prefix[right + 1] - prefix[left]
  return prefix[right + 1] - prefix[left];
}

function buildEvenPrefix(nums) {
  const prefixEven = new Array(nums.length + 1).fill(0);

  for (let i = 0; i < nums.length; i += 1) {
    // Convert the condition into 0/1 so prefix sums can count it.
    const isEven = nums[i] % 2 === 0 ? 1 : 0;
    prefixEven[i + 1] = prefixEven[i] + isEven;
  }

  return prefixEven;
}

function countEvenInRange(prefixEven, left, right) {
  // The same range formula works because prefixEven stores counts.
  return prefixEven[right + 1] - prefixEven[left];
}

class NumArray {
  constructor(nums) {
    // Precompute once in O(n).
    this.prefix = new Array(nums.length + 1).fill(0);

    for (let i = 0; i < nums.length; i += 1) {
      this.prefix[i + 1] = this.prefix[i] + nums[i];
    }
  }

  sumRange(left, right) {
    // Answer each query in O(1).
    return this.prefix[right + 1] - this.prefix[left];
  }
}

function runRangeSumExample() {
  const nums = [2, 4, 1, 7, 3];
  const prefix = buildPrefixSum(nums);

  console.log("Range Sum Example");
  console.log("nums:", nums);
  console.log("prefix:", prefix);
  console.log("sum(1..3):", queryRangeSum(prefix, 1, 3));
  console.log("");
}

function runCountExample() {
  const nums = [2, 5, 8, 1, 6, 3];
  const prefixEven = buildEvenPrefix(nums);

  console.log("Count Condition Example");
  console.log("nums:", nums);
  console.log("prefixEven:", prefixEven);
  console.log("count even in (1..4):", countEvenInRange(prefixEven, 1, 4));
  console.log("");
}

function runLeetCode303Example() {
  const numArray = new NumArray([-2, 0, 3, -5, 2, -1]);

  console.log("LeetCode 303 Example");
  console.log("sumRange(0, 2):", numArray.sumRange(0, 2));
  console.log("sumRange(2, 5):", numArray.sumRange(2, 5));
  console.log("sumRange(0, 5):", numArray.sumRange(0, 5));
}

function main() {
  runRangeSumExample();
  runCountExample();
  runLeetCode303Example();
}

main();
