# Session 12 — Dynamic Programming / Memoization / Tabulation

## Lesson Goal (85-100 minutes)

| # | Topic | Time |
|---|---|---|
| 1 | Mindset: why recursion alone is not enough | 10 minutes |
| 2 | What DP really means | 10 minutes |
| 3 | The 4-step DP framework | 15 minutes |
| 4 | Memoization | 15 minutes |
| 5 | Tabulation | 15 minutes |
| 6 | 4 LeetCode example problems in class | 25 minutes |
| 7 | How to keep improving until “DP feels easy” | 10 minutes |

---

## Three Things Students Must Remember After This Session

> 1. **Dynamic programming is cached problem solving**.
> 2. **The hardest part is not the code. The hardest part is defining the state correctly**.
> 3. **Mastery comes from pattern recognition: 1D DP, 2D DP, decision DP, sequence DP, and grid DP**.

---

## Why This Session Should Be Taught Deeply

Dynamic programming is one of the most important algorithm topics because students usually fail it for the same reasons:

- they memorize formulas
- they skip state definition
- they do not understand why repeated work is wasteful
- they jump to code before defining transition logic

So this session should not be taught as:

> Here is a formula. Memorize it.

It should be taught as:

> Here is a smaller question.  
> Here is the answer for that smaller question.  
> Here is how the big answer depends on smaller answers.

That mindset is what eventually leads to mastery.

---

## Final Learning Outcome

By the end of the session, students should be able to:

- explain DP as solving overlapping subproblems once
- identify the state
- write a recurrence / transition
- choose memoization or tabulation
- explain base cases clearly
- connect beginner DP problems to bigger patterns

---

## Part 1 — Opening Mindset: Why Recursion Alone Is Not Enough (10 minutes)

Ask students:

1. If I compute Fibonacci recursively, do I repeat work?
2. If I try every choice in a problem, do I recompute the same smaller case again and again?
3. If the smaller answer is always the same, why not store it?

Teaching line:

> DP starts when repeated recursion becomes wasteful.

### Simple example: Fibonacci

Brute force idea:

```text
fib(5) = fib(4) + fib(3)
fib(4) = fib(3) + fib(2)
```

Students should notice:

- `fib(3)` appears more than once
- `fib(2)` appears more than once

That is the first moment where DP should feel necessary.

---

## Part 2 — What Dynamic Programming Really Means (10 minutes)

### Plain-English Definition

Dynamic programming means:

- break a problem into smaller subproblems
- store answers to those subproblems
- reuse those answers instead of recomputing them

### Two Conditions Students Should Look For

#### 1. Overlapping Subproblems

The same smaller problem appears again and again.

#### 2. Optimal Substructure

The best answer to a larger problem can be built from answers to smaller problems.

Teaching line:

> If smaller answers repeat and can be reused to build the big answer, DP is likely a good fit.

---

## Part 3 — The 4-Step DP Framework (15 minutes)

This is the core teaching framework. Repeat it for every problem.

### Step 1: Define the state

Ask:

> What does `dp[i]` or `dp[r][c]` mean?

Examples:

- `dp[i]` = number of ways to reach step `i`
- `dp[i]` = best money you can rob from houses `0..i`
- `dp[r][c]` = number of paths to cell `(r, c)`

### Step 2: Define the transition

Ask:

> How does the current answer depend on previous smaller states?

Examples:

- `dp[i] = dp[i - 1] + dp[i - 2]`
- `dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])`

### Step 3: Define the base case

Ask:

> What are the smallest states that are already known?

Examples:

- `dp[0] = 1`
- `dp[1] = 1`

### Step 4: Decide top-down or bottom-up

- top-down = recursion + memoization
- bottom-up = tabulation

Teaching line:

> Most DP mistakes happen before writing code. They happen when state or transition is unclear.

---

## Part 4 — Memoization (15 minutes)

### Intuition

Memoization means:

- start with recursion
- save answers in a cache
- return cached results next time

### Template

```js
function solve(i, memo) {
  if (base case) return answer;
  if (memo[i] !== undefined) return memo[i];

  memo[i] = transition using smaller states;
  return memo[i];
}
```

### Why It Is Good For Teaching

- students can think recursively first
- easier to connect with “solve smaller problems”
- easier to debug state meaning

### Warning

Students often think memoization is DP itself. It is only one implementation style.

---

## Part 5 — Tabulation (15 minutes)

### Intuition

Tabulation means:

- compute from smallest states upward
- fill a table or array iteratively

### Template

```js
const dp = new Array(n + 1).fill(0);
dp[base] = known value;

for (let i = smallState; i <= n; i += 1) {
  dp[i] = transition;
}
```

### Why It Matters

- often more efficient than recursion
- easier to optimize space
- clearer for many interview problems

### Teaching Line

> Memoization starts from the question and works downward.  
> Tabulation starts from the smallest answers and builds upward.

---

## Part 6 — 4 LeetCode Example Problems To Teach In Class (25 minutes)

### Example 1: Climbing Stairs

- LeetCode 70
- Difficulty: Easy
- Pattern: basic 1D counting DP

Problem idea:

- you can climb 1 or 2 steps
- how many distinct ways reach step `n`?

State:

- `dp[i]` = number of ways to reach step `i`

Transition:

- `dp[i] = dp[i - 1] + dp[i - 2]`

Real-world analogy:

- counting how many valid ways to reach a destination when each move size is limited

Why it is good:

- first clean DP recurrence
- easiest place to teach state and base case

---

### Example 2: Min Cost Climbing Stairs

- LeetCode 746
- Difficulty: Easy
- Pattern: minimization DP

Problem idea:

- each step has a cost
- reaching the top can come from one step below or two steps below
- minimize total cost

State:

- `dp[i]` = minimum cost to reach position `i`

Transition:

- `dp[i] = min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])`

Why it is good:

- same shape as Climbing Stairs, but now the operation changes from counting to minimizing
- helps students understand that DP is about state meaning, not memorizing one formula

---

### Example 3: House Robber

- LeetCode 198
- Difficulty: Medium
- Pattern: decision DP

Problem idea:

- each house has money
- you cannot rob adjacent houses
- maximize total money

State:

- `dp[i]` = maximum money from houses `0..i`

Transition:

- skip current house: `dp[i - 1]`
- rob current house: `dp[i - 2] + nums[i]`
- so `dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])`

Real-world analogy:

- making choices where taking one option blocks the immediate neighbor option

Why it is good:

- introduces “choose / skip”
- helps students move beyond counting DP

---

### Example 4: Edit Distance

- LeetCode 72
- Difficulty: Hard
- Pattern: 2D DP on prefixes

Problem idea:

- convert one string into another
- allowed operations: insert, delete, replace
- minimize total edits

State:

- `dp[i][j]` = minimum edits to convert the first `i` characters of word1 into the first `j` characters of word2

Transition:

- if characters match, reuse `dp[i - 1][j - 1]`
- otherwise choose the cheapest among insert, delete, and replace

Why it is good:

- teaches students how to design a 2D state
- teaches how to reduce a “big scary string problem” into prefix subproblems
- this is one of the best problems for pushing students toward real DP maturity

---

## Part 7 — How To Keep Improving Until DP Feels Easy (10 minutes)

Students should keep asking these questions on every DP problem:

1. What is the smaller version of this problem?
2. What should the state mean?
3. What are the base cases?
4. How do I move from smaller states to the current state?
5. Am I counting, maximizing, minimizing, or checking possibility?

### The Progression Toward Mastery

#### Stage 1

Can solve:

- Fibonacci
- Climbing Stairs
- Min Cost Climbing Stairs

#### Stage 2

Can solve:

- House Robber
- Coin Change
- Unique Paths

#### Stage 3

Can solve:

- Longest Increasing Subsequence
- Decode Ways
- Partition Equal Subset Sum

#### Stage 4

Can recognize advanced patterns:

- interval DP
- knapsack DP
- subsequence DP
- state compression DP

Teaching line:

> DP mastery is not one trick. It is repeated exposure to states and transitions until patterns become familiar.

---

## Most Common Student Mistakes

### Mistake 1: Writing code before defining the state

This is the biggest DP mistake.

### Mistake 2: Base cases are wrong

One wrong base case often breaks the whole recurrence.

### Mistake 3: Students know the formula but not what it means

Make them explain in plain English:

> What exactly does `dp[i]` represent?

### Mistake 4: Mixing memoization and tabulation mentally

Students should first understand the recurrence, then choose implementation style.

---

## How To Close The Lesson

Say this at the end:

> DP is not magic.  
> DP is careful reuse of smaller answers.

Then connect it to homework:

- class examples teach counting, minimizing, choosing, and 2D state design
- homework extends into sequence DP, grid DP, and stronger pattern recognition
