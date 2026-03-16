"use strict";

/**
 * Data Structure Examples for Teaching
 *
 * Run:
 *   node dsa_examples.js
 *
 * This file contains small runnable demos for:
 * - array lookup
 * - array lookup with negative numbers
 * - Map
 * - Set
 * - cache thinking
 * - homework problem solutions
 *
 * In main(), uncomment one runner at a time while teaching.
 */

function printTitle(title) {
  console.log("\n" + "=".repeat(70));
  console.log(title);
  console.log("=".repeat(70));
}

function printResult(label, value) {
  console.log(label + ":", value);
}

// ============================================================
// Basic helpers
// ============================================================

function minMax(nums) {
  let min = nums[0];
  let max = nums[0];

  for (let i = 1; i < nums.length; i += 1) {
    if (nums[i] < min) min = nums[i];
    if (nums[i] > max) max = nums[i];
  }

  return { min, max };
}

// ============================================================
// Two Sum
// ============================================================

function twoSumBruteForce(nums, target) {
  for (let i = 0; i < nums.length; i += 1) {
    for (let j = i + 1; j < nums.length; j += 1) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }

  return -1;
}

function twoSumWithArrayOffset(nums, target) {
  if (nums.length === 0) return -1;

  // We can use an array as a lookup table if we know the value range.
  // Negative numbers are supported by shifting values with an offset.
  const { min, max } = minMax(nums);
  const offset = -min;
  const size = max - min + 1;

  const table = new Array(size).fill(-1);

  for (let i = 0; i < nums.length; i += 1) {
    const value = nums[i];
    const need = target - value;

    // Only look inside the table if the needed value is in the known range.
    if (need >= min && need <= max) {
      const seenIndex = table[need + offset];
      if (seenIndex !== -1) {
        return [seenIndex, i];
      }
    }

    table[value + offset] = i;
  }

  return -1;
}

function twoSumWithMap(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i += 1) {
    const need = target - nums[i];

    if (map.has(need)) {
      return [map.get(need), i];
    }

    map.set(nums[i], i);
  }

  return -1;
}

// ============================================================
// Contains Duplicate
// ============================================================

function containsDuplicateWithSort(nums) {
  const sorted = [...nums].sort((a, b) => a - b);

  for (let i = 1; i < sorted.length; i += 1) {
    if (sorted[i] === sorted[i - 1]) {
      return true;
    }
  }

  return false;
}

function containsDuplicateWithSet(nums) {
  const seen = new Set();

  for (const value of nums) {
    if (seen.has(value)) {
      return true;
    }
    seen.add(value);
  }

  return false;
}

// ============================================================
// Valid Anagram
// ============================================================

function isAnagramWithSort(s, t) {
  return s.split("").sort().join("") === t.split("").sort().join("");
}

function isAnagramLowercaseArray(s, t) {
  if (s.length !== t.length) return false;

  // This version is fast, but only for lowercase English letters.
  const count = new Array(26).fill(0);
  const base = "a".charCodeAt(0);

  for (let i = 0; i < s.length; i += 1) {
    count[s.charCodeAt(i) - base] += 1;
    count[t.charCodeAt(i) - base] -= 1;
  }

  for (const value of count) {
    if (value !== 0) return false;
  }

  return true;
}

function isAnagramWithMap(s, t) {
  if (s.length !== t.length) return false;

  const count = new Map();

  for (const ch of s) {
    count.set(ch, (count.get(ch) || 0) + 1);
  }

  for (const ch of t) {
    if (!count.has(ch)) return false;

    const next = count.get(ch) - 1;
    if (next === 0) count.delete(ch);
    else count.set(ch, next);
  }

  return count.size === 0;
}

// ============================================================
// Best Time to Buy and Sell Stock
// ============================================================

function maxProfit(prices) {
  if (prices.length === 0) return 0;

  let buy = prices[0];
  let profit = 0;

  for (let i = 1; i < prices.length; i += 1) {
    if (prices[i] < buy) {
      buy = prices[i];
    } else {
      profit = Math.max(profit, prices[i] - buy);
    }
  }

  return profit;
}

// ============================================================
// Cache demo
// ============================================================

function createSlowSquareService() {
  let computeCount = 0;
  const cache = new Map();

  function slowSquare(n) {
    if (cache.has(n)) {
      return {
        source: "cache",
        value: cache.get(n),
        computeCount,
      };
    }

    // Simulate expensive work.
    computeCount += 1;
    const result = n * n;
    cache.set(n, result);

    return {
      source: "compute",
      value: result,
      computeCount,
    };
  }

  return slowSquare;
}

// ============================================================
// Teaching runners
// ============================================================

function runArrayLookupDemo() {
  printTitle("Array Lookup Demo");

  const values = [3, 7, 1, 9];
  printResult("values", values);
  printResult("values[2]", values[2]);

  console.log("\nArray lookup tables are fine when the range is small and known.");
  console.log("But searching by value in a normal array is usually O(n).");
}

function runArrayNegativeNumberDemo() {
  printTitle("Array Lookup With Negative Numbers (Using Offset)");

  const nums = [-3, 4, 3, 90];
  const target = 0;
  const range = minMax(nums);
  const offset = -range.min;

  printResult("nums", nums);
  printResult("target", target);
  printResult("min", range.min);
  printResult("max", range.max);
  printResult("offset", offset);
  printResult("twoSumWithArrayOffset(nums, target)", twoSumWithArrayOffset(nums, target));

  console.log("\nThis works, even with negative numbers.");
  console.log("But it needs a known range and may waste memory when the range is large.");
}

function runTwoSumExamples() {
  printTitle("Two Sum: Brute Force vs Array Offset vs Map");

  const numsA = [2, 7, 11, 15];
  const targetA = 9;

  printResult("numsA", numsA);
  printResult("targetA", targetA);
  printResult("twoSumBruteForce(numsA, targetA)", twoSumBruteForce(numsA, targetA));
  printResult("twoSumWithMap(numsA, targetA)", twoSumWithMap(numsA, targetA));

  const numsB = [-3, 4, 3, 90];
  const targetB = 0;

  console.log("");
  printResult("numsB", numsB);
  printResult("targetB", targetB);
  printResult("twoSumWithArrayOffset(numsB, targetB)", twoSumWithArrayOffset(numsB, targetB));
  printResult("twoSumWithMap(numsB, targetB)", twoSumWithMap(numsB, targetB));

  console.log("\nMap is usually the practical solution because it does not need a range or offset.");
}

function runContainsDuplicateExamples() {
  printTitle("Contains Duplicate: Sort vs Set");

  const nums = [1, 2, 3, 1];

  printResult("nums", nums);
  printResult("containsDuplicateWithSort(nums)", containsDuplicateWithSort(nums));
  printResult("containsDuplicateWithSet(nums)", containsDuplicateWithSet(nums));

  console.log("\nSet is cleaner here because we only care about membership and uniqueness.");
}

function runAnagramExamples() {
  printTitle("Valid Anagram: Sort vs Array Count vs Map Count");

  const s = "anagram";
  const t = "nagaram";

  printResult("s", s);
  printResult("t", t);
  printResult("isAnagramWithSort(s, t)", isAnagramWithSort(s, t));
  printResult("isAnagramLowercaseArray(s, t)", isAnagramLowercaseArray(s, t));
  printResult("isAnagramWithMap(s, t)", isAnagramWithMap(s, t));

  console.log("\nArray count is excellent when the alphabet is fixed and small.");
  console.log("Map count is more flexible when the character set is not limited.");
}

function runStockExample() {
  printTitle("Best Time to Buy and Sell Stock");

  const prices = [7, 1, 5, 3, 6, 4];

  printResult("prices", prices);
  printResult("maxProfit(prices)", maxProfit(prices));

  console.log("\nThis one is not mainly a lookup problem.");
  console.log("It is a one-pass state-tracking problem.");
}

function runMapVsSetDemo() {
  printTitle("Map vs Set");

  const map = new Map();
  map.set(-3, "seen at index 0");
  map.set(1000, "seen at index 1");

  const set = new Set();
  set.add(10);
  set.add(20);
  set.add(10);

  printResult("map.get(-3)", map.get(-3));
  printResult("map.has(1000)", map.has(1000));
  printResult("set.has(20)", set.has(20));
  printResult("set size after adding 10 twice", set.size);

  console.log("\nMap stores key -> value.");
  console.log("Set stores unique values only.");
}

function runCacheExample() {
  printTitle("Cache Demo: Local Map Cache and the Redis Idea");

  const slowSquare = createSlowSquareService();

  printResult("slowSquare(12) first call", slowSquare(12));
  printResult("slowSquare(12) second call", slowSquare(12));
  printResult("slowSquare(7) first call", slowSquare(7));
  printResult("slowSquare(7) second call", slowSquare(7));

  console.log("\nThe first request computes the result.");
  console.log("The second request reuses the cached result.");
  console.log("A local Map is the simplest in-process version of this caching idea.");
  console.log("Redis applies the same idea at a shared system level.");
}

function runSummary() {
  printTitle("Summary");

  console.log("Array: good first step, good for fixed ranges and index access.");
  console.log("Map: better for flexible key lookup, including negative numbers.");
  console.log("Set: best when you only care about uniqueness or membership.");
  console.log("Cache: store previous results so repeated lookups are faster.");
}

// ============================================================
// Main
// ============================================================

function main() {
  // Uncomment one runner at a time while teaching.
  // This keeps the console output focused and easy to explain.

  runTwoSumExamples();
  // runArrayLookupDemo();
  // runArrayNegativeNumberDemo();
  // runContainsDuplicateExamples();
  // runAnagramExamples();
  // runStockExample();
  // runMapVsSetDemo();
  // runCacheExample();
  // runSummary();
}

main();
