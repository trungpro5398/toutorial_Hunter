export function sum(nums: number[]): number {
  let total = 0;

  for (const value of nums) {
    total += value;
  }

  return total;
}

export function average(nums: number[]): number {
  if (nums.length === 0) {
    return 0;
  }

  return sum(nums) / nums.length;
}

export function hasPassed(avg: number): boolean {
  return avg >= 50;
}
