// Example 1 solution: 1D counting DP.
function climbStairs(n) {
  if (n <= 2) return n;

  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  dp[2] = 2;

  for (let step = 3; step <= n; step += 1) {
    dp[step] = dp[step - 1] + dp[step - 2];
  }

  return dp[n];
}

// Example 2 solution: same recurrence shape as Climbing Stairs,
// but now the objective is minimization instead of counting.
function minCostClimbingStairs(cost) {
  const dp = new Array(cost.length + 1).fill(0);

  for (let i = 2; i <= cost.length; i += 1) {
    const oneStep = dp[i - 1] + cost[i - 1];
    const twoSteps = dp[i - 2] + cost[i - 2];
    dp[i] = Math.min(oneStep, twoSteps);
  }

  return dp[cost.length];
}

// Example 3 solution: decision DP where each index has two cases,
// skip the current house or rob it.
function houseRobber(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  const dp = new Array(nums.length).fill(0);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i += 1) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }

  return dp[nums.length - 1];
}

// Example 4 solution: classic 2D DP on prefixes.
// dp[i][j] stores the minimum edits to convert
// word1[0..i-1] into word2[0..j-1].
function editDistance(word1, word2) {
  const rows = word1.length + 1;
  const cols = word2.length + 1;
  const dp = Array.from({ length: rows }, () => new Array(cols).fill(0));

  for (let row = 0; row < rows; row += 1) {
    dp[row][0] = row;
  }

  for (let col = 0; col < cols; col += 1) {
    dp[0][col] = col;
  }

  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      if (word1[row - 1] === word2[col - 1]) {
        dp[row][col] = dp[row - 1][col - 1];
        continue;
      }

      const insertCost = dp[row][col - 1];
      const deleteCost = dp[row - 1][col];
      const replaceCost = dp[row - 1][col - 1];

      dp[row][col] = 1 + Math.min(insertCost, deleteCost, replaceCost);
    }
  }

  return dp[word1.length][word2.length];
}

function printSection(title) {
  console.log(`\n=== ${title} ===`);
}

function runClimbingStairsExample() {
  const n = 5;

  printSection("Example 1: LC 70 - Climbing Stairs (Easy)");
  console.log("Problem:");
  console.log("- You can climb 1 or 2 steps at a time.");
  console.log("- Count how many distinct ways reach step n.");
  console.log("Real-life analogy:");
  console.log("- Count valid move sequences when each move size is limited.");
  console.log("How to think toward the solution:");
  console.log("1. Do not start from code. Start from the last move.");
  console.log("2. To reach step i, the final move must come from step i - 1 or step i - 2.");
  console.log("3. So the answer for step i depends only on 2 smaller answers.");
  console.log("4. That means this is a perfect DP state: dp[i] = ways to reach step i.");
  console.log("State:");
  console.log("- dp[i] = number of ways to reach step i");
  console.log("Transition:");
  console.log("- dp[i] = dp[i - 1] + dp[i - 2]");
  console.log("Why this transition is correct:");
  console.log("- Every valid path to i must end with either a 1-step jump or a 2-step jump.");
  console.log("- Those two groups do not overlap.");
  console.log("- So we add the counts.");
  console.log("Base cases:");
  console.log("- dp[1] = 1");
  console.log("- dp[2] = 2");
  console.log("Detailed trace for n = 5:");
  console.log("- dp[1] = 1");
  console.log("- dp[2] = 2");
  console.log("- dp[3] = dp[2] + dp[1] = 2 + 1 = 3");
  console.log("- dp[4] = dp[3] + dp[2] = 3 + 2 = 5");
  console.log("- dp[5] = dp[4] + dp[3] = 5 + 3 = 8");
  console.log("Answer:", climbStairs(n));
}

function runMinCostClimbingStairsExample() {
  const cost = [10, 15, 20];

  printSection("Example 2: LC 746 - Min Cost Climbing Stairs (Easy)");
  console.log("Problem:");
  console.log("- Each step has a cost.");
  console.log("- You can move 1 or 2 steps.");
  console.log("- Find the minimum total cost to reach the top.");
  console.log("Real-life analogy:");
  console.log("- Reach a destination while paying the smallest total toll.");
  console.log("How to think toward the solution:");
  console.log("1. Climbing Stairs counts ways. This one minimizes cost.");
  console.log("2. So the pattern is similar, but the operation changes from plus to min.");
  console.log("3. Ask: what is the cheapest way to stand at position i?");
  console.log("4. You arrive at i either from i - 1 or i - 2.");
  console.log("State:");
  console.log("- dp[i] = minimum cost to reach position i");
  console.log("Transition:");
  console.log("- dp[i] = min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])");
  console.log("Why this transition is correct:");
  console.log("- The last move into position i comes from exactly one of the previous two positions.");
  console.log("- Each option pays the best previous cost plus the step cost you land on.");
  console.log("- We choose the cheaper option.");
  console.log("Base cases:");
  console.log("- dp[0] = 0");
  console.log("- dp[1] = 0");
  console.log("Detailed trace for [10, 15, 20]:");
  console.log("- dp[2] = min(dp[1] + 15, dp[0] + 10) = min(15, 10) = 10");
  console.log("- dp[3] = min(dp[2] + 20, dp[1] + 15) = min(30, 15) = 15");
  console.log("Answer:", minCostClimbingStairs(cost));
}

function runHouseRobberExample() {
  const nums = [2, 7, 9, 3, 1];

  printSection("Example 3: LC 198 - House Robber (Medium)");
  console.log("Problem:");
  console.log("- Each house has money.");
  console.log("- You cannot rob adjacent houses.");
  console.log("- Maximize total money.");
  console.log("Real-life analogy:");
  console.log("- Choose profitable options where taking one blocks the next one.");
  console.log("How to think toward the solution:");
  console.log("1. At each house, there are only 2 real decisions: rob or skip.");
  console.log("2. If you skip house i, the best answer is whatever was best up to i - 1.");
  console.log("3. If you rob house i, you must skip i - 1, so the best answer is dp[i - 2] + nums[i].");
  console.log("4. That means the current best answer is the better of those 2 options.");
  console.log("State:");
  console.log("- dp[i] = maximum money from houses 0..i");
  console.log("Transition:");
  console.log("- dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])");
  console.log("Why this transition is correct:");
  console.log("- Every valid final answer either includes the current house or excludes it.");
  console.log("- There is no third option.");
  console.log("- So checking those 2 cases is enough.");
  console.log("Base cases:");
  console.log("- dp[0] = nums[0]");
  console.log("- dp[1] = max(nums[0], nums[1])");
  console.log("Detailed trace for [2, 7, 9, 3, 1]:");
  console.log("- dp[0] = 2");
  console.log("- dp[1] = max(2, 7) = 7");
  console.log("- dp[2] = max(7, 2 + 9) = 11");
  console.log("- dp[3] = max(11, 7 + 3) = 11");
  console.log("- dp[4] = max(11, 11 + 1) = 12");
  console.log("Answer:", houseRobber(nums));
}

function runEditDistanceExample() {
  const word1 = "horse";
  const word2 = "ros";

  printSection("Example 4: LC 72 - Edit Distance (Hard)");
  console.log("Problem:");
  console.log("- Convert word1 into word2.");
  console.log("- Allowed operations: insert, delete, replace.");
  console.log("- Find the minimum number of operations.");
  console.log("Real-life analogy:");
  console.log("- Edit one draft into another using the fewest edits.");
  console.log("How to think toward the solution:");
  console.log("1. This is too big to think about as whole strings immediately.");
  console.log("2. Ask a smaller question: what is the minimum edit distance between prefixes?");
  console.log("3. That suggests a 2D state because 2 string positions matter at the same time.");
  console.log("4. Let dp[i][j] mean the minimum edits to convert the first i chars of word1 into the first j chars of word2.");
  console.log("5. Now look only at the last characters of those prefixes.");
  console.log("6. If they match, no new cost is needed. Reuse dp[i - 1][j - 1].");
  console.log("7. If they differ, there are exactly 3 meaningful last operations:");
  console.log("   insert -> dp[i][j - 1]");
  console.log("   delete -> dp[i - 1][j]");
  console.log("   replace -> dp[i - 1][j - 1]");
  console.log("8. Take the cheapest one, then add 1 for the current operation.");
  console.log("State:");
  console.log("- dp[i][j] = minimum edits to convert word1[0..i-1] into word2[0..j-1]");
  console.log("Transition:");
  console.log("- if word1[i - 1] === word2[j - 1], dp[i][j] = dp[i - 1][j - 1]");
  console.log("- else dp[i][j] = 1 + min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1])");
  console.log("Why this transition is correct:");
  console.log("- The final operation must be insert, delete, or replace if characters differ.");
  console.log("- Those are the only 3 edit operations allowed.");
  console.log("- Each operation reduces the problem to a smaller prefix pair.");
  console.log("Base cases:");
  console.log("- dp[i][0] = i because converting to empty string means delete everything");
  console.log("- dp[0][j] = j because building from empty string means insert everything");
  console.log("Detailed trace idea for 'horse' -> 'ros':");
  console.log("- dp[1][1]: 'h' vs 'r' differ -> 1 replacement");
  console.log("- dp[2][2]: 'ho' vs 'ro' ends with matching 'o' -> reuse smaller answer");
  console.log("- dp[5][3] becomes 3 after combining insert/delete/replace choices over all prefixes");
  console.log("Answer:", editDistance(word1, word2));
}

console.log("=== Session 12 Dynamic Programming Examples ===");
console.log("Main idea: DP solves repeated smaller subproblems once and reuses them.");
console.log("Key rule: define the state before writing the recurrence.");

runClimbingStairsExample();
runMinCostClimbingStairsExample();
runHouseRobberExample();
runEditDistanceExample();

console.log("\n=== Why These 4 Examples Matter ===");
console.log("- LC 70 teaches counting DP.");
console.log("- LC 746 teaches minimization DP with a familiar recurrence shape.");
console.log("- LC 198 teaches choose-or-skip DP.");
console.log("- LC 72 teaches 2D DP on prefixes and serious state design.");
