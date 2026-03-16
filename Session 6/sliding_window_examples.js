"use strict";

/**
 * Session 6 - Sliding Window Examples
 *
 * Run:
 *   node sliding_window_examples.js
 *
 * This file demonstrates:
 * - fixed-size sliding window
 * - variable-size sliding window
 */

function maxSumSubarrayOfSizeK(nums, k) {
  if (k <= 0 || k > nums.length) {
    return null;
  }

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

function runFixedWindowExample() {
  const nums = [2, 1, 5, 1, 3, 2];
  const k = 3;

  console.log("Fixed Window Example");
  console.log("nums:", nums);
  console.log("k:", k);
  console.log("max sum of size k:", maxSumSubarrayOfSizeK(nums, k));
  console.log("");
}

function runVariableWindowExample() {
  const text = "abcaef";

  console.log("Variable Window Example");
  console.log("text:", text);
  console.log(
    "longest substring without repeating characters:",
    lengthOfLongestSubstring(text)
  );
}

function runMinSubarrayExample() {
  const nums = [2, 1, 5, 2, 3, 2];
  const target = 7;

  console.log("");
  console.log("Min Subarray With Sum >= Target Example");
  console.log("nums:", nums);
  console.log("target:", target);
  console.log(
    "smallest subarray length with sum >= target:",
    minSubarrayLen(target, nums)
  );
}

function runKDistinctExample() {
  const text = "eceba";
  const k = 2;

  console.log("");
  console.log("Longest Substring With At Most K Distinct Characters Example");
  console.log("text:", text);
  console.log("k:", k);
  console.log(
    "longest substring with at most k distinct:",
    longestSubstringKDistinct(text, k)
  );
}

function main() {
  runFixedWindowExample();
  runVariableWindowExample();
  runMinSubarrayExample();
  runKDistinctExample();
}

main();
