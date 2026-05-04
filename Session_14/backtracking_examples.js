function subsets(nums) {
  const result = [];

  function dfs(index, path) {
    if (index === nums.length) {
      result.push([...path]);
      return;
    }

    dfs(index + 1, path);

    path.push(nums[index]);
    dfs(index + 1, path);
    path.pop();
  }

  dfs(0, []);
  return result;
}

function combinationSum(candidates, target) {
  const result = [];

  function dfs(startIndex, remain, path) {
    if (remain === 0) {
      result.push([...path]);
      return;
    }

    if (remain < 0) return;

    for (let i = startIndex; i < candidates.length; i += 1) {
      path.push(candidates[i]);
      dfs(i, remain - candidates[i], path);
      path.pop();
    }
  }

  dfs(0, target, []);
  return result;
}

function permute(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);

  function dfs(path) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i += 1) {
      if (used[i]) continue;

      used[i] = true;
      path.push(nums[i]);
      dfs(path);
      path.pop();
      used[i] = false;
    }
  }

  dfs([]);
  return result;
}

function subsetsWithDup(nums) {
  nums.sort((a, b) => a - b);
  const result = [];

  function dfs(startIndex, path) {
    result.push([...path]);

    for (let i = startIndex; i < nums.length; i += 1) {
      if (i > startIndex && nums[i] === nums[i - 1]) continue;

      path.push(nums[i]);
      dfs(i + 1, path);
      path.pop();
    }
  }

  dfs(0, []);
  return result;
}

console.log("=== Session 14 Backtracking Foundations ===");
console.log("LC 78 Subsets:", subsets([1, 2]));
console.log("LC 39 Combination Sum:", combinationSum([2, 3, 6, 7], 7));
console.log("LC 46 Permutations:", permute([1, 2, 3]));
console.log("LC 90 Subsets II:", subsetsWithDup([1, 2, 2]));
