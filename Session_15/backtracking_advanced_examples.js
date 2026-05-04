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

function solveNQueens(n) {
  const result = [];
  const cols = new Set();
  const diag1 = new Set();
  const diag2 = new Set();
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

console.log("=== Session 15 Backtracking Advanced ===");
console.log("LC 131 Palindrome Partitioning:", partition("aab"));
console.log(
  "LC 79 Word Search:",
  exist(
    [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    "ABCCED"
  )
);
console.log("LC 51 N-Queens count for n=4:", solveNQueens(4).length);
