# Dynamic Programming Guide

## What Dynamic Programming Is

Dynamic programming is a problem-solving technique where you:

- break a problem into smaller subproblems
- store answers to those subproblems
- reuse those stored answers later

The core idea is:

> Do not solve the same smaller problem more than once.

## Why Students Should Learn DP Deeply

DP is not just an interview topic.

It trains:

- state design
- structured problem decomposition
- transition thinking
- optimization thinking

Even when product code does not look like textbook DP, the mindset still matters:

- caching repeated work
- reusing previous computations
- building larger answers from stable smaller answers

## When DP Usually Appears

DP is likely when:

- the same smaller case appears again and again
- the final answer depends on answers to smaller states
- you are counting, maximizing, minimizing, or checking possibility

Typical signals:

- number of ways
- maximum profit / value
- minimum cost / steps
- can or cannot achieve target

## The DP Design Checklist

### 1. Define the state

Ask:

> What does `dp[i]` or `dp[i][j]` mean?

Examples:

- `dp[i]` = best answer considering first `i` items
- `dp[i]` = number of ways to reach state `i`
- `dp[r][c]` = answer for grid cell `(r, c)`

### 2. Define the transition

Ask:

> How does the current answer depend on smaller states?

### 3. Define the base cases

Ask:

> What states are already known without recursion?

### 4. Choose implementation

- top-down memoization
- bottom-up tabulation

## Memoization vs Tabulation

## Memoization

Starts from the big question and recursively asks smaller questions.

Pros:

- natural for beginners
- easy to connect with recursion

Cons:

- recursive overhead
- sometimes harder to optimize space

## Tabulation

Starts from the smallest known answers and builds upward.

Pros:

- often faster in practice
- good for space optimization

Cons:

- ordering can be tricky if the state is unclear

## Three Core Classroom Examples

### 1. Climbing Stairs (LC 70)

Pattern:

- counting DP
- `dp[i] = dp[i - 1] + dp[i - 2]`

### 2. House Robber (LC 198)

Pattern:

- decision DP
- choose or skip current item

### 3. Coin Change (LC 322)

Pattern:

- minimization DP
- try all transitions into the current amount

## Four Homework Growth Patterns

### Pattern 1: Grid DP

Example:

- Unique Paths

### Pattern 2: Sequence DP

Example:

- Longest Increasing Subsequence

### Pattern 3: Decode / count possibilities

Example:

- Decode Ways

### Pattern 4: Subset / knapsack-style DP

Example:

- Partition Equal Subset Sum

## Common Mistakes

### Mistake 1: Students write a recurrence they cannot explain

If they cannot explain it in plain English, they do not really understand it.

### Mistake 2: Students never say what the state means

Always force the sentence:

> `dp[i]` means ...

### Mistake 3: Wrong initialization

Many DP bugs are base-case bugs, not transition bugs.

### Mistake 4: They solve one problem and think they “know DP”

DP mastery comes from seeing multiple patterns.

## Summary Sentence

> Dynamic programming is the art of solving smaller subproblems once and building the final answer from them.
