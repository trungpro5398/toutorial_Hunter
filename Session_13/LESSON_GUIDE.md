# Session 13 — Advanced Dynamic Programming / Pattern Recognition / Space Optimization

## Start With One Honest Sentence

Dynamic programming feels hard mostly because a new problem looks unfamiliar.

The solution is not:

- memorize more formulas

The solution is:

- understand what kind of smaller problem the current problem is hiding

That is what this lesson is about.

Not tricks.

Not fancy notation.

Not speed.

Just this:

> Look at the big problem.  
> Find the right smaller version of it.  
> Build from there.

---

## A Very Small Mental Picture

Imagine a big puzzle.

Trying to solve the whole puzzle at once is overwhelming.

But if the puzzle is split into small parts, then each small part becomes understandable.

DP works the same way.

It says:

- solve a small part
- remember that answer
- use that remembered answer to solve a larger part

So the real question is not:

> What code should I write?

The real question is:

> What small part should I remember?

That small remembered part is the state.

If the state is good, the problem becomes much clearer.

If the state is bad, everything feels confusing.

---

## The One Habit That Makes DP Easier

Whenever a DP problem appears, stop and ask:

> What is the smaller version of this exact same problem?

Then ask:

> If I already knew that smaller answer, how would it help me solve the current one?

That is the whole lesson, repeated in many forms.

---

## The Five Big DP Families

Most stronger DP problems fall into one of these families:

1. Grid DP
2. Knapsack-Style DP
3. Sequence / Subsequence DP
4. String / Prefix DP
5. Interval DP

The point is not to memorize the names.

The point is to understand the feeling of each family.

Each family answers a different kind of question.

Each family suggests a different kind of state.

Each family has a different “natural” transition.

That is what matters.

---

## Family 1 — Grid DP

Grid DP appears when the world looks like a board:

- a matrix
- a table
- a board of cells

The problem often asks:

- how many ways are there to move across the board?
- what is the minimum cost to reach the end?
- what is the maximum score collected by the time we reach a cell?

### The most important way to think about Grid DP

Do not stare at the whole board.

That is too big.

Instead, pick one cell.

Then ask:

> Before I can solve this cell, which earlier cells must already be solved?

That question is the real beginning of grid DP.

### Tiny example first

Look at this tiny board:

```text
S .
. E
```

Suppose movement is only:

- right
- down

How can `E` be reached?

Only two ways:

- from the cell above
- from the cell to the left

That is the whole core idea.

The board can later become 50 by 50 or 200 by 200, but the idea does not change.

That is why grid DP is such a good family to understand deeply.

### What the state usually looks like

Usually:

```text
dp[r][c]
```

But that shape alone is not enough.

The important part is the sentence attached to it.

For example:

```text
dp[r][c] = number of ways to reach cell (r, c)
```

or:

```text
dp[r][c] = minimum cost to reach cell (r, c)
```

or:

```text
dp[r][c] = maximum score to reach cell (r, c)
```

This is a very important lesson:

> The table shape can stay the same while the meaning changes completely.

So in DP, meaning matters more than shape.

### How the transition is discovered

Once the state is clear, ask:

> If I am at cell `(r, c)`, from where could I have come?

Usually:

- from top
- from left

That immediately tells you what the transition should do.

If the problem is counting:

- add previous counts

If the problem is minimizing:

- take the cheaper previous path

If the problem is maximizing:

- take the larger previous score

That is why grid DP often feels clean.

The recurrence is not random.

It is just the written form of “where could I have come from?”

### How to recognize this family quickly

This family should come to mind when:

- there is a grid
- movement rules are clear
- the answer at one place depends on nearby places

The strongest sentence for recognizing it is:

> The answer at one location depends on answers from nearby earlier locations.

### Why people get confused here

People often memorize:

```text
dp[r][c] = dp[r - 1][c] + dp[r][c - 1]
```

without understanding why.

The cure is simple:

Say this sentence out loud:

> Every path into this cell must come from above or from the left.

If that sentence makes sense, the recurrence makes sense.

### Real-world feeling

This family appears whenever a system is built location by location:

- route scoring
- map traversal
- movement planning
- cell-by-cell accumulation

The important feeling is:

> One location depends on nearby earlier locations.

### A simple code template for this family

```js
function solveGridDP(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  // dp[r][c] stores the answer for cell (r, c)
  const dp = Array.from({ length: rows }, () => new Array(cols).fill(0));

  // Starting cell is filled first because everything else depends on earlier cells.
  dp[0][0] = grid[0][0];

  // First column: each cell can only come from above.
  for (let row = 1; row < rows; row += 1) {
    dp[row][0] = dp[row - 1][0] + grid[row][0];
  }

  // First row: each cell can only come from the left.
  for (let col = 1; col < cols; col += 1) {
    dp[0][col] = dp[0][col - 1] + grid[0][col];
  }

  // Middle cells reuse nearby earlier answers.
  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      dp[row][col] = grid[row][col] + Math.min(dp[row - 1][col], dp[row][col - 1]);
    }
  }

  return dp[rows - 1][cols - 1];
}
```

What this template is teaching:

- the state lives on the grid
- the first row and first column often need special handling
- each middle cell uses smaller nearby answers

---

## Family 2 — Knapsack-Style DP

This family is about making choices under a target or limit.

That limit might be:

- a sum
- a capacity
- a budget
- an exact target

The story changes, but the inside often stays the same.

The inside is:

- take the current item
- or skip the current item

That is the heart of this family.

### The most important way to think about Knapsack-Style DP

Ask:

> Is this secretly a choose-or-skip problem under a target?

That question is extremely useful.

Many problems disguise themselves with different surface stories:

- fair partition
- sign assignment
- subset target
- best value under capacity

But the hidden skeleton often stays the same:

- an item is being processed
- the target matters
- taking the item changes the state
- skipping the item keeps the old state

### Tiny example first

Take:

```text
[2, 3]
```

Target:

```text
5
```

Can 5 be made?

At `2`, there are two choices:

- use it
- skip it

At `3`, there are two choices:

- use it
- skip it

That is all.

Knapsack-style DP keeps coming back to that same tiny idea.

### What the state usually looks like

Common forms are:

```text
dp[sum]
dp[i][sum]
```

The shape is simple, but again the meaning matters.

Examples:

```text
dp[sum] = whether sum is reachable
dp[sum] = number of ways to make sum
dp[sum] = best value achievable with this sum or capacity
```

The center of the state is not “position on a board”.

The center is:

- target
- sum
- capacity

That is the key.

### How the transition is discovered

Ask:

> If I use this item, what smaller target must have already been possible?

That gives the “take” part.

Then ask:

> If I skip this item, what answer remains unchanged?

That gives the “skip” part.

That is why this family feels like:

> I am slowly building knowledge about targets while processing items one by one.

### Why backward iteration often appears

When compressing 2D DP into 1D, backward iteration often matters.

Why?

Because the current item should not immediately help itself again in the same round.

Backward iteration protects the meaning:

- this item is processed once
- not repeatedly reused right away

This is not just a code trick.

It is preserving the story of the state.

### How to recognize this family quickly

This family should come to mind when the problem contains words like:

- subset
- target
- partition
- capacity
- reachable
- possible
- number of ways to make

The strongest sentence for recognizing it is:

> I am deciding whether each item should be used, under some target or limit.

### Why people get confused here

The stories look different.

That is the trap.

Partition Equal Subset Sum and Target Sum do not look like ordinary knapsack at first.

But the hidden structure is still:

- choose
- under a target

That hidden structure matters more than the story.

### Real-world feeling

This family appears in:

- budget allocation
- bundle selection
- resource planning
- target building under constraints

The important feeling is:

> I am making take-or-skip decisions under a target.

### A simple code template for this family

```js
function solveKnapsackStyle(nums, target) {
  // dp[sum] means: after processing some numbers,
  // what do I know about this sum?
  const dp = new Array(target + 1).fill(false);

  // Sum 0 is always reachable by taking nothing.
  dp[0] = true;

  for (const num of nums) {
    // Go backward so the same number is not reused immediately.
    for (let sum = target; sum >= num; sum -= 1) {
      // If sum - num was reachable before,
      // then sum is reachable now by taking num.
      dp[sum] = dp[sum] || dp[sum - num];
    }
  }

  return dp[target];
}
```

What this template is teaching:

- the state is centered on the target
- each item creates a take-or-skip update
- backward iteration protects the state meaning

---

## Family 3 — Sequence / Subsequence DP

This family appears when order matters.

Not location on a board.

Not hitting a target sum.

But order in a sequence.

Typical problem shapes:

- what is the best chain?
- what is the longest valid progression?
- what is the best answer ending here?

### The most important way to think about Sequence DP

Ask:

> If the answer is forced to end at position `i`, what earlier positions are allowed before it?

That question usually reveals the family.

### Tiny example first

Take:

```text
[1, 4, 2, 3]
```

Suppose the goal is an increasing subsequence.

At value `3`, which earlier values can be before it?

- `1`
- `2`

Which cannot?

- `4`

That means the answer at the current position depends on valid earlier positions.

That is the whole family in a tiny picture.

### What the state usually looks like

Very often:

```text
dp[i]
```

with meaning:

```text
dp[i] = best answer ending at index i
```

This is a major DP lesson.

The state does not always mean the final answer.

Sometimes it means:

- the best local answer ending at one exact place

Then the final answer is the best among all those local answers.

### How the transition is discovered

Ask:

> Which earlier positions can legally connect to the current one?

Then:

- look backward
- keep valid earlier positions
- extend the best one

This is why sequence DP often includes:

- one loop over the current index
- one loop over earlier indexes

That double loop is not random.

It is the written version of:

> Look backward for valid helpers.

### How to recognize this family quickly

This family should come to mind when the story sounds like:

- longest increasing
- best chain
- valid previous positions
- best answer ending here

The strongest sentence for recognizing it is:

> The current position wants help from the past.

### Why people get confused here

The common mistake is thinking `dp[i]` should already mean the whole final answer.

Usually it does not.

Usually it means:

- the best answer ending at `i`

That local meaning is what makes the recurrence possible.

### Real-world feeling

This family appears in:

- trend analysis
- progression scoring
- ordered history evaluation
- chain building

The important feeling is:

> The present depends on which parts of the past can legally extend into it.

### A simple code template for this family

```js
function solveSequenceDP(nums) {
  // dp[i] means: the best answer ending exactly at index i
  const dp = new Array(nums.length).fill(1);

  for (let i = 0; i < nums.length; i += 1) {
    for (let j = 0; j < i; j += 1) {
      // Only extend from earlier positions that are valid helpers.
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  // The final answer is often the best local answer anywhere in the array.
  return Math.max(...dp);
}
```

What this template is teaching:

- the state is local, not global
- the transition usually looks backward
- the final answer often comes from the best ending position

---

## Family 4 — String / Prefix DP

This family feels difficult only when whole strings are treated as one giant object.

The trick is to cut strings into prefixes.

That is the key move.

### The most important way to think about String / Prefix DP

Ask:

> What is the answer for the first `i` characters?  
> Or for the first `i` of one string and first `j` of another?

That question turns something blurry into something structured.

### Tiny example first

Take:

```text
"ab"
"ac"
```

What is the longest common subsequence?

It is:

```text
"a"
```

That tiny example already shows the real idea:

- do not compare whole strings in one jump
- compare smaller fronts of the strings

### What the state usually looks like

Often:

```text
dp[i][j]
```

with meaning:

```text
answer for the first i characters of one string and the first j characters of the other
```

For one-string prefix problems, sometimes:

```text
dp[i]
```

means the answer for the prefix up to index `i`.

### How the transition is discovered

Look at the last characters of the prefixes.

Then ask:

- do they match?
- or do they differ?

If they match:

- reuse a smaller diagonal answer

If they differ:

- skip one side
- or pay an edit cost

This “look at the last characters” move is one of the strongest habits in all of DP.

### How to recognize this family quickly

This family should come to mind when the problem talks about:

- two strings
- matching
- editing
- comparing prefixes
- subsequences

The strongest sentence for recognizing it is:

> I should shrink the strings into smaller fronts and compare the last characters.

### Why people get confused here

The common mistake is trying to reason about the whole strings at once.

That is too large.

Prefixes make the problem small enough to manage.

### Real-world feeling

This family appears in:

- edit distance
- text comparison
- document difference
- correction systems
- similarity scoring

The important feeling is:

> Full strings are too large. Prefixes are small enough to reason about.

### A simple code template for this family

```js
function solveTwoStringDP(text1, text2) {
  const rows = text1.length + 1;
  const cols = text2.length + 1;

  // dp[i][j] means: answer for the first i chars of text1
  // and the first j chars of text2
  const dp = Array.from({ length: rows }, () => new Array(cols).fill(0));

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      if (text1[i - 1] === text2[j - 1]) {
        // Matching characters usually reuse the diagonal answer.
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // If they do not match, skip one side and keep the better result.
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[text1.length][text2.length];
}
```

What this template is teaching:

- the state is built from prefixes
- the transition comes from the last characters
- diagonal / top / left all have clear meanings

---

## Family 5 — Interval DP

This family is where DP begins to feel deeply advanced.

Not because the code is magic.

But because the correct smaller problem is less obvious.

### The most important way to think about Interval DP

Ask:

> Is the real answer living inside a range?

If yes, interval DP may be the right family.

### Tiny example first

Imagine a range from `left` to `right`.

At first, the natural thought is:

> What should happen first?

But that is often the wrong thought.

Why?

Because the first action may change too many future things.

A much better thought is often:

> What happens last inside this interval?

That is the key doorway into interval DP.

At the last action:

- left boundary is fixed
- right boundary is fixed
- smaller intervals are already solved

That is why the last-action view is often much cleaner than the first-action view.

### What the state usually looks like

Usually:

```text
dp[left][right]
```

with meaning:

```text
best answer inside the interval from left to right
```

This state works because it keeps the problem self-similar:

- the big interval breaks into smaller intervals

### How the transition is discovered

Pick some `k` inside the interval.

Then ask:

> What if `k` is the last action, or the split point, inside this interval?

That usually creates:

- left interval answer
- right interval answer
- current contribution from `k`

This is the core pattern.

### How to recognize this family quickly

This family should come to mind when the problem sounds like:

- best answer inside a subrange
- merging or bursting inside a segment
- grouping choices inside a range
- order changes the structure

The strongest sentence for recognizing it is:

> The smaller problem is a smaller interval, not a smaller index.

### Why people get confused here

The common mistake is choosing the first action.

That often makes the future unstable.

Choosing the last action is often what makes the boundaries stable enough to write a clean recurrence.

### Real-world feeling

This family appears in:

- burst / merge problems
- grouped optimization
- range planning
- problems where internal ordering matters

The important feeling is:

> The state is a whole segment, and the cleanest view often comes from the last action.

### A simple code template for this family

```js
function solveIntervalDP(values) {
  const n = values.length;

  // dp[left][right] means: best answer inside this interval
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));

  // Solve shorter intervals first, then longer ones.
  for (let length = 2; length < n; length += 1) {
    for (let left = 0; left + length < n; left += 1) {
      const right = left + length;

      // Try every split point or every possible last action.
      for (let k = left + 1; k < right; k += 1) {
        const candidate =
          dp[left][k] +
          dp[k][right] +
          values[left] * values[k] * values[right];

        dp[left][right] = Math.max(dp[left][right], candidate);
      }
    }
  }

  return dp[0][n - 1];
}
```

What this template is teaching:

- the state is an interval
- smaller intervals are solved before larger intervals
- the transition usually tries every split point or last action

---

## Example 1 — Minimum Path Sum

- LeetCode 64
- DP family: Grid DP

### Problem

Each cell has a cost.

Move from top-left to bottom-right.

You can move only:

- right
- down

Return the minimum total cost.

### Tiny warm-up

Take:

```text
1 2
3 4
```

Two possible paths:

1. right then down -> `1 + 2 + 4 = 7`
2. down then right -> `1 + 3 + 4 = 8`

So the answer is:

```text
7
```

That tiny case already shows the real idea:

- each cell depends on earlier cells
- keep the cheaper previous path

### How to choose the state

Ask:

> What is the minimum cost to reach this exact cell?

That gives:

```text
dp[r][c] = minimum cost to reach cell (r, c)
```

### How to choose the transition

To enter `(r, c)`, the path must come from:

- top
- or left

So:

```text
dp[r][c] = grid[r][c] + min(dp[r - 1][c], dp[r][c - 1])
```

### Why this is correct

There are only two legal previous cells.

So the cheaper of those two earlier answers must be the best way into the current cell.

### Code

```js
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
      dp[row][col] =
        grid[row][col] + Math.min(dp[row - 1][col], dp[row][col - 1]);
    }
  }

  return dp[rows - 1][cols - 1];
}
```

### Small example

For:

```text
1 3 1
1 5 1
4 2 1
```

the answer is:

```text
7
```

### Common wrong idea

Trying to reason about all full paths at once.

The easier move is always:

- solve one cell
- then the next

---

## Example 2 — Target Sum

- LeetCode 494
- DP family: Knapsack-Style DP

### Problem

Put either `+` or `-` before each number.

Count how many assignments produce the target total.

### Tiny warm-up

Take:

```text
nums = [1, 2]
target = 1
```

All sign choices:

- `+1 +2 = 3`
- `+1 -2 = -1`
- `-1 +2 = 1`
- `-1 -2 = -3`

Only one gives the target.

So the answer is:

```text
1
```

### How to understand the hidden structure

Let:

- positive numbers sum to `P`
- negative numbers sum to `N`

Then:

```text
P - N = target
P + N = total
```

Add the equations:

```text
2P = total + target
P = (total + target) / 2
```

Now the problem becomes:

> How many subsets have sum `(total + target) / 2`?

That is why this is knapsack-style DP.

### How to choose the state

Use:

```text
dp[sum] = number of ways to build this sum
```

### How to choose the transition

For each number:

- skip it
- or use it

If it is used to make `sum`, then before that the smaller sum must have been:

```text
sum - num
```

So:

```text
dp[sum] += dp[sum - num]
```

### Why backward iteration is used

Backward iteration protects the idea that one number is used once per round.

### Code

```js
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
```

### Example

For:

```text
nums = [1, 1, 1, 1, 1]
target = 3
```

the answer is:

```text
5
```

### Common wrong idea

Thinking only about plus/minus recursion and not seeing the hidden subset-sum target.

---

## Example 3 — Longest Common Subsequence

- LeetCode 1143
- DP family: String / Prefix DP

### Problem

Given two strings, return the length of their longest common subsequence.

### Tiny warm-up

Take:

```text
"ab"
"ac"
```

The longest common subsequence is:

```text
"a"
```

So the answer is:

```text
1
```

This already shows the right direction:

- do not compare whole strings at once
- compare smaller fronts of the strings

### How to choose the state

Use:

```text
dp[i][j] = LCS length of the first i chars of text1 and first j chars of text2
```

### How to choose the transition

Look at the last characters of those prefixes.

If they match:

```text
dp[i][j] = dp[i - 1][j - 1] + 1
```

If they do not match:

```text
dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
```

### Why this is correct

Matching last characters can extend a common subsequence.

If they do not match, one side must be skipped.

### Code

```js
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
```

### Example

For:

```text
text1 = "abcde"
text2 = "ace"
```

the answer is:

```text
3
```

### Common wrong idea

Trying to compare whole strings directly instead of shrinking them into prefixes.

---

## Example 4 — Burst Balloons

- LeetCode 312
- DP family: Interval DP

### Problem

Burst balloons in some order.

The coins from one burst depend on its current neighbors.

Return the maximum total coins.

### Tiny warm-up

Take:

```text
[2, 4, 3]
```

If the first thought is:

> Which balloon should be burst first?

the problem immediately feels messy.

That is because the neighbors keep changing.

So the better thought is:

> Which balloon is burst last inside an interval?

That is the key interval DP move.

### How to choose the state

Use:

```text
dp[left][right] = maximum coins from bursting balloons strictly inside this interval
```

### How to choose the transition

Assume balloon `k` is the last balloon burst inside `(left, right)`.

Then:

- the left interval is already solved
- the right interval is already solved
- the neighbors of `k` are fixed

So:

```text
dp[left][right] =
  max over k of
  dp[left][k] + dp[k][right] + values[left] * values[k] * values[right]
```

### Why this is correct

The last-action view makes the boundaries stable.

That is what makes the recurrence clean.

### Code

```js
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
```

### Example

For:

```text
[3, 1, 5, 8]
```

the answer is:

```text
167
```

### Common wrong idea

Trying to choose the first balloon to burst instead of choosing the last balloon inside an interval.

---

## What Should Come Next

After this lesson, grouped practice is the best next step:

1. several grid DP problems together
2. several knapsack-style problems together
3. several string / prefix problems together
4. several interval DP problems together

That builds pattern recognition much better than random mixing too early.

---

## Final Message

> The goal is not to memorize many DP formulas.  
> The goal is to recognize what kind of smaller state the problem is asking for.
