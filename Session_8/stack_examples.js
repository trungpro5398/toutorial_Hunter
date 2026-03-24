function isValidParentheses(s) {
  const pairs = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  const stack = [];

  for (const char of s) {
    if (char === "(" || char === "[" || char === "{") {
      stack.push(char);
      continue;
    }

    const top = stack.pop();

    if (top !== pairs[char]) {
      return false;
    }
  }

  return stack.length === 0;
}

function dailyTemperatures(temperatures) {
  const answer = new Array(temperatures.length).fill(0);
  const stack = [];

  for (let index = 0; index < temperatures.length; index += 1) {
    while (
      stack.length > 0 &&
      temperatures[index] > temperatures[stack[stack.length - 1]]
    ) {
      const previousIndex = stack.pop();
      answer[previousIndex] = index - previousIndex;
    }

    stack.push(index);
  }

  return answer;
}

console.log("=== Easy: Valid Parentheses ===");
console.log(isValidParentheses("()"));
console.log(isValidParentheses("()[]{}"));
console.log(isValidParentheses("(]"));
console.log(isValidParentheses("([]{})"));

console.log("\n=== Medium: Daily Temperatures ===");
console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
console.log(dailyTemperatures([30, 40, 50, 60]));
console.log(dailyTemperatures([30, 60, 90]));
