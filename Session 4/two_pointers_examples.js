"use strict";

/**
 * Session 4 - Two Pointers Examples
 *
 * Run:
 *   node two_pointers_examples.js
 *
 * This file demonstrates:
 * - slow / fast pointers with Move Zeroes
 * - left / right pointers with a palindrome check
 */

function moveZeroes(nums) {
  let slow = 0;

  for (let fast = 0; fast < nums.length; fast += 1) {
    // Put each non-zero value into the next correct write position.
    if (nums[fast] !== 0) {
      [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
      slow += 1;
    }
  }

  return nums;
}

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

function runMoveZeroesExample() {
  const nums = [0, 1, 0, 3, 12];

  console.log("Move Zeroes Example");
  console.log("before:", [0, 1, 0, 3, 12]);
  console.log("after :", moveZeroes(nums));
  console.log("");
}

function runPalindromeExample() {
  console.log("Palindrome Example");
  console.log('"racecar" ->', isPalindromeSimple("racecar"));
  console.log('"hunter"  ->', isPalindromeSimple("hunter"));
}

function main() {
  runMoveZeroesExample();
  runPalindromeExample();
}

main();
