# Session 15 — Backtracking Pruning / Grid Search / String Partition / Constraints

## Start With The New Idea

Session 14 teaches how to explore a decision tree.

Session 15 teaches how to explore it more intelligently.

The new idea is:

> Do not explore branches that are already hopeless.

That idea is called pruning.

Backtracking becomes much stronger when it is no longer:

- try everything blindly

but instead:

- try choices
- stop bad branches early

---

## What Pruning Really Means

Pruning means:

- before going deeper
- check whether continuing still makes sense

If not, stop that branch immediately.

Tiny example:

If target is `7` and the current sum is already `9`, and all numbers are positive, then that branch is already dead.

There is no need to go deeper.

That is pruning.

---

## Pattern 1 — String Partition Backtracking

This pattern appears when:

- a string must be cut into pieces
- each piece must satisfy a rule

Examples:

- palindrome partitions
- restore IP addresses

### Tiny idea

At each position:

- cut here
- or cut later

So the recursion explores all valid next cuts.

### Example — LeetCode 131: Palindrome Partitioning

#### How to think

Start at one index in the string.

Try every possible end index.

If the substring is a palindrome:

- choose it
- go deeper from the next position

#### Code

```js
function partition(s) {
  const result = [];

  function isPalindrome(left, right) {
    while (left < right) {
      if (s[left] !== s[right]) return false;
      left += 1;
      right -= 1;
    }
    return true;
  }

  function dfs(start, path) {
    if (start === s.length) {
      result.push([...path]);
      return;
    }

    for (let end = start; end < s.length; end += 1) {
      if (!isPalindrome(start, end)) continue;

      path.push(s.slice(start, end + 1));
      dfs(end + 1, path);
      path.pop();
    }
  }

  dfs(0, []);
  return result;
}
```

### What matters most here

The next choice is:

- not a number
- not an unused item

It is:

- the next cut position

That is why this is a new backtracking flavor.

---

## Pattern 2 — Grid Search Backtracking

This pattern appears when:

- the problem lives on a board
- moving changes the local state
- cells often need to be marked and restored

### Tiny idea

At each cell:

- try moving in all allowed directions
- mark the current cell as used
- restore it when returning

### Example — LeetCode 79: Word Search

#### How to think

At each position, try to match the next character.

Then move:

- up
- down
- left
- right

without reusing the same cell in one path.

#### Code

```js
function exist(board, word) {
  const rows = board.length;
  const cols = board[0].length;

  function dfs(row, col, index) {
    if (index === word.length) return true;
    if (row < 0 || row >= rows || col < 0 || col >= cols) return false;
    if (board[row][col] !== word[index]) return false;

    const saved = board[row][col];
    board[row][col] = "#";

    const found =
      dfs(row + 1, col, index + 1) ||
      dfs(row - 1, col, index + 1) ||
      dfs(row, col + 1, index + 1) ||
      dfs(row, col - 1, index + 1);

    board[row][col] = saved;
    return found;
  }

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (dfs(row, col, 0)) return true;
    }
  }

  return false;
}
```

### What matters most here

The important backtracking move is:

- mark
- recurse
- restore

That restore step is the real backtracking step on a grid.

---

## Pattern 3 — Constraint Backtracking

This is where backtracking becomes much stronger.

Now the recursion is not just exploring choices.

It is also checking strong rules before going deeper.

### Tiny idea

If a choice already breaks a rule:

- stop immediately

That is pruning with constraints.

### Example — LeetCode 51: N-Queens

#### How to think

Go row by row.

At each row, try placing a queen in every column.

But only continue if the placement is safe.

Unsafe means:

- same column
- same diagonal

#### Code

```js
function solveNQueens(n) {
  const result = [];
  const cols = new Set();
  const diag1 = new Set(); // row - col
  const diag2 = new Set(); // row + col
  const board = Array.from({ length: n }, () => new Array(n).fill("."));

  function dfs(row) {
    if (row === n) {
      result.push(board.map((line) => line.join("")));
      return;
    }

    for (let col = 0; col < n; col += 1) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
        continue;
      }

      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);
      board[row][col] = "Q";

      dfs(row + 1);

      board[row][col] = ".";
      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
    }
  }

  dfs(0);
  return result;
}
```

### What matters most here

This pattern teaches:

- strong pruning
- fast rule checking
- state restoration

This is one of the best ways to understand why backtracking can be much faster than naive brute force.

---

## Pattern 4 — Why Pruning Changes Everything

Without pruning:

- the tree grows huge

With pruning:

- many branches die early

That means:

- less work
- less useless recursion
- cleaner search

A useful sentence:

> Backtracking explores the tree.  
> Pruning cuts the bad branches.

---

## What Session 15 Should Leave Clear

By the end of this session, these ideas should feel natural:

1. A branch can stop early if it is already hopeless.
2. String partition problems backtrack over cut positions.
3. Grid search problems backtrack by marking and restoring.
4. Constraint problems backtrack by checking safety before going deeper.

---

## Final Message

> Basic backtracking explores choices.  
> Strong backtracking explores choices and kills bad branches early.
