# Session 8: Stack Guide

## Lesson Purpose

This guide introduces stack as one of the simplest and most useful data structures in programming.

The core idea is:

> The last item you put in is the first item you take out.

That is called **LIFO**:

- Last In
- First Out

## Why Stack Is The Right Next Algorithm

After two pointers, sliding window, and binary search, students now have enough pointer discipline to handle a data structure that tracks unfinished work.

Stack is the next good step because it appears in real software constantly:

- browser back navigation
- undo / redo history
- nested HTML tags
- expression parsing
- "next greater" style interview problems

## Real Example First

Start with browser tabs or browsing history.

If a user visits:

```text
Home -> Products -> Product Detail -> Checkout
```

and presses Back, where do they go?

They go to the most recent previous page first:

```text
pop Checkout
now on Product Detail
```

That is stack behavior.

## Basic Operations

In JavaScript, an array can act as a stack:

```js
const stack = [];

stack.push("Home");
stack.push("Products");
stack.push("Checkout");

console.log(stack.pop()); // "Checkout"
console.log(stack[stack.length - 1]); // "Products"
```

### Operations to teach

- `push(value)` -> add to top
- `pop()` -> remove from top
- `stack[stack.length - 1]` -> peek at top
- `stack.length === 0` -> empty check

## When Should Students Think "This Is A Stack Problem"?

Teach these clues:

- the most recent thing matters first
- something was opened and must later be closed
- we need to remember unfinished items
- we are waiting for a future event to resolve earlier positions

## Example 1: Valid Parentheses (Easy)

### Problem

Given a string containing `()[]{}`, return `true` if every opening bracket is correctly closed in order.

### Real Connection

This is how editors or parsers think about:

- nested HTML tags
- nested function calls
- balanced brackets in code

### Core Idea

- opening bracket -> push it
- closing bracket -> top of stack must match
- if mismatch or stack is empty -> invalid
- end with empty stack -> valid

### Code

```js
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
```

### Walkthrough

```text
s = "([])"

"(" -> push "("
"[" -> push "["
"]" -> pop "[" -> matches
")" -> pop "(" -> matches
stack empty -> true
```

### Complexity

- Time: `O(n)`
- Space: `O(n)`

## Example 2: Daily Temperatures (Medium)

### Problem

For each day, find how many days you must wait until a warmer temperature. If no warmer day exists, answer is `0`.

### Real Connection

This pattern appears whenever we ask:

- when will a larger value appear later?
- how long until traffic gets worse?
- how many days until price is higher?

### Key Insight

Keep a stack of indexes whose warmer day has not been found yet.

The stack is monotonic decreasing by temperature:

```text
temperatures[stack[0]] >= temperatures[stack[1]] >= ...
```

When the current temperature is warmer than the day on top of the stack:

- we found the answer for that older day
- pop it
- compute the distance

### Code

```js
function dailyTemperatures(temperatures) {
  const answer = new Array(temperatures.length).fill(0);
  const stack = [];

  for (let i = 0; i < temperatures.length; i += 1) {
    while (
      stack.length > 0 &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const previousIndex = stack.pop();
      answer[previousIndex] = i - previousIndex;
    }

    stack.push(i);
  }

  return answer;
}
```

### Walkthrough

```text
temperatures = [73, 74, 75, 71, 69, 72, 76, 73]

Day 0 (73): push 0
Day 1 (74): warmer than day 0 -> answer[0] = 1, push 1
Day 2 (75): warmer than day 1 -> answer[1] = 1, push 2
Day 3 (71): push 3
Day 4 (69): push 4
Day 5 (72): warmer than day 4 -> answer[4] = 1
            warmer than day 3 -> answer[3] = 2
            push 5
...
```

### Complexity

- Time: `O(n)` because each index is pushed once and popped once
- Space: `O(n)`

## Easy vs Medium Teaching Difference

For the easy problem:

- the stack stores raw opening characters
- we check matching pairs directly

For the medium problem:

- the stack stores indexes
- we are not matching symbols
- we are waiting for a future event to resolve an older position

This is a major pattern jump. Make that explicit.

## Common Mistakes

### Mistake 1: Peeking before checking empty

Always confirm `stack.length > 0` before reading the top.

### Mistake 2: Storing values when indexes are needed

For `dailyTemperatures`, students need indexes so they can compute distance.

### Mistake 3: Forgetting the stack invariant

If students do not state what the stack currently represents, they usually get lost.

Say this often:

> What does the stack contain right now?

## Teaching Close

Students should leave with this sentence:

> A stack is for problems where the newest unfinished thing must be handled first.
