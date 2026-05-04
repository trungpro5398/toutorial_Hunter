// Example 1: grid minimization DP.
function minimumPathSum(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const dp = Array.from({ length: rows }, () => new Array(cols).fill(0));

  dp[0][0] = grid[0][0];

  for (let row = 1; row < rows; row += 1) {
    dp[row][0] = dp[row - 1][0] + grid[row][0];
  }

  for (let col = 1; col < cols; col += 1) {
    dp[0][col] = dp[0][col - 1] + grid[0][col];
  }

  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      dp[row][col] = grid[row][col] + Math.min(dp[row - 1][col], dp[row][col - 1]);
    }
  }

  return dp[rows - 1][cols - 1];
}

// Example 2: knapsack-style counting / reachability transformation.
function targetSumWays(nums, target) {
  const total = nums.reduce((sum, value) => sum + value, 0);
  if (Math.abs(target) > total) return 0;
  if ((total + target) % 2 !== 0) return 0;

  const subsetTarget = (total + target) / 2;
  const dp = new Array(subsetTarget + 1).fill(0);
  dp[0] = 1;

  for (const num of nums) {
    for (let sum = subsetTarget; sum >= num; sum -= 1) {
      dp[sum] += dp[sum - num];
    }
  }

  return dp[subsetTarget];
}

// Example 3: 2D string / subsequence DP.
function longestCommonSubsequence(text1, text2) {
  const rows = text1.length + 1;
  const cols = text2.length + 1;
  const dp = Array.from({ length: rows }, () => new Array(cols).fill(0));

  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      if (text1[row - 1] === text2[col - 1]) {
        dp[row][col] = dp[row - 1][col - 1] + 1;
      } else {
        dp[row][col] = Math.max(dp[row - 1][col], dp[row][col - 1]);
      }
    }
  }

  return dp[text1.length][text2.length];
}

// Example 4: interval DP.
function burstBalloons(nums) {
  const values = [1, ...nums, 1];
  const n = values.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let length = 2; length < n; length += 1) {
    for (let left = 0; left + length < n; left += 1) {
      const right = left + length;

      for (let last = left + 1; last < right; last += 1) {
        const coins =
          dp[left][last] +
          dp[last][right] +
          values[left] * values[last] * values[right];

        dp[left][right] = Math.max(dp[left][right], coins);
      }
    }
  }

  return dp[0][n - 1];
}

function section(title) {
  console.log(`\n=== ${title} ===`);
}

function runMinimumPathSumExample() {
  const grid = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ];

  section("Example 1: LC 64 - Minimum Path Sum");
  console.log("DP family: grid minimization DP");
  console.log("Why teach this next:");
  console.log("- it strengthens 2D table thinking");
  console.log("- it shows that grid DP can be counting or minimizing");
  console.log("How to think:");
  console.log("1. At each cell, ask how the path could arrive here.");
  console.log("2. In this problem, arrival is only from top or left.");
  console.log("3. So the current answer depends on the cheaper of those two previous states.");
  console.log("State:");
  console.log("- dp[r][c] = minimum path sum to reach cell (r, c)");
  console.log("Transition:");
  console.log("- dp[r][c] = grid[r][c] + min(dp[r - 1][c], dp[r][c - 1])");
  console.log("Answer:", minimumPathSum(grid));
}

function runTargetSumExample() {
  const nums = [1, 1, 1, 1, 1];
  const target = 3;

  section("Example 2: LC 494 - Target Sum");
  console.log("DP family: knapsack-style DP");
  console.log("Why teach this next:");
  console.log("- it teaches problem transformation");
  console.log("- many medium DP problems become easier after the right rewrite");
  console.log("How to think:");
  console.log("1. Direct plus/minus recursion repeats work.");
  console.log("2. Rewrite the problem into subset-sum counting.");
  console.log("3. After transformation, dp[sum] can count how many ways reach a subset target.");
  console.log("State:");
  console.log("- dp[sum] = number of ways to build this subset sum");
  console.log("Transition:");
  console.log("- dp[sum] += dp[sum - num] while iterating backward");
  console.log("Answer:", targetSumWays(nums, target));
}

function runLCSExample() {
  const text1 = "abcde";
  const text2 = "ace";

  section("Example 3: LC 1143 - Longest Common Subsequence");
  console.log("DP family: string / subsequence DP");
  console.log("Why teach this next:");
  console.log("- it is one of the most reusable 2D DP patterns");
  console.log("- students learn match vs skip reasoning");
  console.log("How to think:");
  console.log("1. Shrink the problem to prefixes.");
  console.log("2. Let dp[i][j] mean the answer for the first i chars and first j chars.");
  console.log("3. If the current chars match, extend the smaller diagonal answer.");
  console.log("4. If they do not match, skip one side and keep the better result.");
  console.log("State:");
  console.log("- dp[i][j] = LCS length of text1 prefix i and text2 prefix j");
  console.log("Transition:");
  console.log("- match -> dp[i - 1][j - 1] + 1");
  console.log("- no match -> max(dp[i - 1][j], dp[i][j - 1])");
  console.log("Answer:", longestCommonSubsequence(text1, text2));
}

function runBurstBalloonsExample() {
  const nums = [3, 1, 5, 8];

  section("Example 4: LC 312 - Burst Balloons");
  console.log("DP family: interval DP");
  console.log("Why teach this next:");
  console.log("- this is where students start seeing truly advanced state design");
  console.log("- it teaches that choosing the last action can be easier than choosing the first");
  console.log("How to think:");
  console.log("1. Choosing the first balloon is messy because neighbors keep changing.");
  console.log("2. Choosing the last balloon in an interval is much cleaner.");
  console.log("3. If balloon k is last in (left, right), then its neighbors are fixed.");
  console.log("4. That creates a strong interval state.");
  console.log("State:");
  console.log("- dp[left][right] = maximum coins from bursting balloons strictly inside this interval");
  console.log("Transition:");
  console.log("- try every possible last balloon inside the interval");
  console.log("Answer:", burstBalloons(nums));
}

console.log("=== Session 13 Advanced Dynamic Programming Examples ===");
console.log("Main idea: after basic DP, students should learn patterns, not just more formulas.");

runMinimumPathSumExample();
runTargetSumExample();
runLCSExample();
runBurstBalloonsExample();

console.log("\n=== Why This Session Exists ===");
console.log("- Session 12 teaches what DP is.");
console.log("- Session 13 teaches how to recognize stronger DP families.");
