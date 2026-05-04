/**
 * Session 3 - Homework Template
 *
 * Convert the 4 existing homework solutions from Session 2 into strict TypeScript.
 *
 * Source file:
 * /Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session 2/dsa_examples.js
 *
 * Use these JavaScript functions as the original reference:
 * - twoSumBruteForce
 * - containsDuplicateWithSort
 * - isAnagramWithSort
 * - maxProfit
 *
 * Rules:
 * - Do not use `any`
 * - Keep parameter types explicit
 * - Keep return types explicit
 * - Run strict typecheck
 *
 * Students should complete the logic inside these TypeScript versions.
 */

export function twoSumBruteForce(
  nums: number[],
  target: number
): [number, number] | -1 {
  // TODO:
  // Convert the Session 2 `twoSumBruteForce` version to strict TypeScript.
  // Return the pair of indexes whose values sum to target.
  // If no pair exists, return -1.
  for (let i = 0; i < nums.length; i += 1) {
    for (let j = i + 1; j < nums.length; j += 1) {
      if (nums[i]! + nums[j]! === target) {
        return [i, j];
      }
    }
  }

  return -1;
}

export function containsDuplicateWithSort(nums: number[]): boolean {
  // TODO:
  // Convert the Session 2 `containsDuplicateWithSort` version to strict TypeScript.
  // Keep the numeric sort comparator.
  const sorted = [...nums].sort((a, b) => a - b);

  for (let i = 1; i < sorted.length; i += 1) {
    if (sorted[i] === sorted[i - 1]) {
      return true;
    }
  }

  return false;
}

export function isAnagramWithSort(s: string, t: string): boolean {
  // TODO:
  // Convert the Session 2 `isAnagramWithSort` version to strict TypeScript.
  return s.split("").sort().join("") === t.split("").sort().join("");
}

export function maxProfit(prices: number[]): number {
  // TODO:
  // Convert the Session 2 `maxProfit` version to strict TypeScript.
  // Return the maximum profit from one buy and one sell.
  // You must buy before you sell.
  if (prices.length === 0) return 0;

  let buy: number = prices[0]!;
  let profit = 0;

  for (let i = 1; i < prices.length; i += 1) {
    if (prices[i]! < buy) {
      buy = prices[i]!;
    } else {
      profit = Math.max(profit, prices[i]! - buy);
    }
  }

  return profit;
}

/**
 * Stretch goal (optional):
 *
 * After finishing the 4 required conversions above, students may also
 * convert these improved data-structure versions from Session 2:
 * - twoSumWithMap
 * - containsDuplicateWithSet
 * - isAnagramWithMap
 */
