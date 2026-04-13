# Session 12 — Homework: Dynamic Programming

## Estimated Time: 10-12 hours

This homework focuses only on dynamic programming.

Students should solve 4 LeetCode medium problems and explain the DP state clearly.

---

## Goal

Train the most important DP patterns:

- counting DP
- grid DP
- sequence DP
- subset / decision DP

---

## Required Problems

Solve all 4 problems below.

### 1. Unique Paths

- LeetCode 62
- Difficulty: Medium
- Main idea: grid DP

Requirement:

- explain what `dp[r][c]` means
- explain why each cell depends on top and left

### 2. Decode Ways

- LeetCode 91
- Difficulty: Medium
- Main idea: counting DP on a string

Requirement:

- explain what `dp[i]` means
- explain single-digit and two-digit transitions clearly

### 3. Longest Increasing Subsequence

- LeetCode 300
- Difficulty: Medium
- Main idea: sequence DP

Requirement:

- explain what `dp[i]` means
- explain why previous positions affect the current answer

### 4. Partition Equal Subset Sum

- LeetCode 416
- Difficulty: Medium
- Main idea: subset / knapsack-style DP

Requirement:

- explain the target sum
- explain whether the state means exact reachability or best value

---

## Submission Rules

Create 4 JavaScript files:

- `lc62_unique_paths.js`
- `lc91_decode_ways.js`
- `lc300_lis.js`
- `lc416_partition_equal_subset_sum.js`

Each file must include:

1. the solution
2. at least 3 manual test cases with `console.log`
3. a short explanation of the state and transition

---

## Pass Criteria

| # | Requirement | Details |
|---|---|---|
| 1 | All 4 problems attempted | do not skip any |
| 2 | State explained clearly | every problem must explain what `dp[...]` means |
| 3 | Transition explained clearly | no formula without plain-English meaning |
| 4 | Base cases explained | small states must be correct |
| 5 | Manual trace included | at least 1 trace per problem |
| 6 | Clean code | readable names, no unnecessary hacks |

---

## Real-Life Connection

Students should connect each problem to a real structure:

| Problem | Real-life analogy |
|---|---|
| Unique Paths | counting routes through a grid |
| Decode Ways | counting valid interpretations of a message |
| Longest Increasing Subsequence | building the best improving chain |
| Partition Equal Subset Sum | deciding whether a fair split is possible |

---

## Suggested Workflow

For each problem:

1. say what the state means
2. list the smaller states it depends on
3. define the base case
4. write the transition in English first
5. then write the code
6. run manual test cases

---

## How To Run

Example:

```bash
cd "/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session_12"
node lc62_unique_paths.js
node lc91_decode_ways.js
node lc300_lis.js
node lc416_partition_equal_subset_sum.js
```

---

## Deliverables

1. 4 JavaScript solution files
2. one `README.md` using the template
3. short manual traces for all 4 problems

---

## Stretch Goals

- solve `House Robber II` (LeetCode 213)
- solve `Coin Change` (LeetCode 322)
- solve `Longest Common Subsequence` (LeetCode 1143)
