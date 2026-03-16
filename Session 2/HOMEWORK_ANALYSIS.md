# Homework Analysis: Arrays, Maps, Sets, and Caching

## Purpose

This note is designed for teaching.

It explains:

- how to review the homework problems
- why students can start with arrays first
- where arrays become limited
- how `Map` improves lookup-based problems
- how `Set` simplifies duplicate checks
- how caching works
- why a local `Map` is the simplest version of the same caching idea used by tools like Redis

The goal is not only to know the final answer.

The goal is to understand **why** we choose one data structure over another.

## 1. Start With Arrays First

### Why Arrays Are A Good Starting Point

Students should start with arrays because arrays are:

- familiar
- easy to print and debug
- easy to loop through
- good for learning brute-force thinking first

That is a valid learning path.

In interviews and in real development, many optimal solutions start from a simple brute-force version first.

### What Arrays Are Good At

Arrays are good when:

- you want to scan every element
- you need direct access by index
- the data is already stored in order
- the value range is small and known in advance

### Example: Direct Index Access

```js
const nums = [10, 20, 30];

console.log(nums[0]); // 10
console.log(nums[2]); // 30
```

This is fast because arrays are designed for index-based access.

## 2. Limits Of Arrays

Arrays are useful, but they are not always the best lookup structure.

### Limitation 1: Searching By Value Is Usually O(n)

If you want to know whether a value exists inside a normal array, you often scan the array.

```js
const nums = [4, 8, 15, 16, 23, 42];

// To find 23, we may need to check many elements.
```

That makes search by value:

- `O(n)` in the general case => best case 


### Limitation 2: Arrays As Lookup Tables Need A Known Range

If you use an array like a lookup table, you need to know the value range.

Example:

If values are only from `0` to `100`, then an array of size `101` is easy to build.

But if values can be:

- very large
- very small
- sparse

then the lookup array becomes wasteful.

### Limitation 3: Negative Numbers Need Extra Handling

Normal array indexes are built around non-negative integer positions:

- `0`
- `1`
- `2`
- ...
-1
-2

If your values include negative numbers, you cannot directly use the value itself as a clean lookup index in the usual teaching sense.

You need an **offset**.

### Limitation 4: Sparse Ranges Waste Memory

Suppose values range from `-1_000_000` to `1_000_000`, but you only have 10 numbers.

An array-based lookup may need up to:

- `2,000,001` slots

That is a lot of unused space.

## 3. Yes, You Can Still Solve With Arrays

Students should know this:

> Arrays are not "wrong." They are just limited.

If the range is manageable, arrays can still solve lookup problems efficiently.

## 4. Solving Two Sum With An Array Lookup (Including Negative Numbers)

This is useful as a teaching bridge before introducing `Map`.

### Core Idea

Use an array as a lookup table:

- the array stores the index of a value we have already seen
- if we need to support negatives, we shift every value by an offset

### Example

Problem:

```js
nums = [-3, 4, 3, 90]
target = 0
```

We want:

```js
[-3, 3]
```

### Step 1: Find The Value Range

From the array:

- `min = -3`
- `max = 90`

### Step 2: Create An Offset

To map negative values into valid array positions:

```js
offset = -min = 3
```

 nums = [-3, 4, 3, 90]
nums = [-3 + 3, 4 + 3, 3 + 3, 90 + 3]
result - 3
Now:
a[-3]
a[-3 + 3] = a[0] 
- value `-3` maps to index `0`
- value `0` maps to index `3`
- value `3` maps to index `6`
- value `90` maps to index `93`

### Step 3: Use The Lookup Array

Build:

```js
const table = new Array(max - min + 1).fill(-1);
```

Each slot stores:

- the index where that value was first seen
- `-1` means "not seen yet"

### Walkthrough

Input:

```js
nums = [-3, 4, 3, 90]
target = 0
```
nums = [-3, 4, 3, 90]
4 in the array 
sav = 0
sav[4]
for i in nums:
  sav[-3 + 3] = 1
  sav[0] = 1
  sav[0-0] = 1
  i = 2
  sav[0 -3 ] = 1
  sav[0-3+3] = sav[0] = 1



#### i = 0

- current value = `-3`
- need = `3`
- `3` has not been seen yet
- store `-3` at `table[-3 + offset] = table[0] = 0`

#### i = 1

- current value = `4`
- need = `-4`
- `-4` is outside the stored range, so skip lookup
- store `4`

#### i = 2

- current value = `3`
- need = `-3`
- `-3` is in range
- lookup slot for `-3`
- found index `0`
- return `[0, 2]`

### Why This Works

It works because:

- the array behaves like a simple value-to-index table
- the offset converts negative values into valid positions

### But Why We Usually Do Not Prefer This

This approach has extra constraints:

- we must know the range
- we often need a pre-scan to find `min` and `max`
- the array can become huge if the range is large

### Time And Space

- Time: `O(n)` after range prep, or `O(n)` overall if you count the pre-scan as linear
- Space: `O(range)` where `range = max - min + 1`

That space cost is the real weakness.

## 5. Two Sum With Map (The Practical Solution)

### Core Idea

A `Map` stores:

- key -> value

For Two Sum:

- key = number we have seen
- value = index where we saw it

When we read a new number `x`, we ask:

> Have we already seen `target - x`?

If yes, we found the answer.

### Code

```js

function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];

    if (map.has(need)) {
      return [map.get(need), i];
    }

    map.set(nums[i], i);
  }

  return -1;
}
```

### Example

```js
nums = [2, 7, 11, 15]
target = 9
```

sav[2] = 1
sav[target - 2] = sav[9-2] = sav[7] = 1
sav[7] = 1

#### i = 0

- current = `2`
- need = `7`
- map does not have `7`
- store `2 -> 0`

#### i = 1

- current = `7`
- need = `2`
- map has `2`
- return `[0, 1]`

### Why Map Is Better Here

- no need to know the value range
- negative numbers work naturally
- large numbers work naturally
- sparse values do not waste memory
- we only store the values we actually see

### Time And Space

- Time: `O(n)` average
- Space: `O(n)`

## 6. Why Map Lookup Is Fast

### The Main Idea

A `Map` is optimized for lookup by key.

Instead of scanning every element, the engine uses an internal structure to jump close to the correct storage location for that key.

In teaching terms:

- array scan = "check many boxes one by one"
- map lookup = "go directly to the labeled drawer"

### Why It Is Often Treated As O(1)

For common use, `Map` operations like:

- `set`
- `get`
- `has`

are treated as:

- `O(1)` average time

That means the work does not grow much as the collection gets bigger, on average.

### Important Accuracy Note

Theoretical worst-case lookup can be slower.

But in normal coding interviews and normal JavaScript usage, we treat `Map` as average `O(1)`.

## 7. Why Map Can Store Negative Numbers Easily

This is a key teaching point.

With `Map`, keys are not limited to array-style positions.

You can do:

```js
const map = new Map();

map.set(-3, 10);
map.set(1000000, 20);
```

That works fine.

Why?

Because `Map` is key-based storage, not index-based storage.

So:

- negative keys are allowed
- large keys are allowed
- sparse keys are allowed

This removes the biggest pain points of array lookup tables.

## 8. Contains Duplicate: Sort Vs Set

### Sort + Scan

This is a solid intermediate solution.

Idea:

1. sort the array
2. duplicates become adjacent
3. scan neighbors

### Example

```js
nums = [1, 2, 3, 1]
```

After sorting:

```js
[1, 1, 2, 3]
```

Then:

- compare index `1` with index `0`
- both are `1`
- duplicate found

### Complexity

- Time: `O(n log n)`
- Space: depends on engine details

### Set Solution

Use a `Set` to track seen values.


a[2] = 1

b[2] 

array push 1,2,2
a = [1,2,2]
set add 1,2
### Code

```js
function containsDuplicate(nums) {
  const seen = new Set();

  for (const x of nums) {
    if (seen.has(x)) return true;
    seen.add(x);
  }

  return false;
}
```
[2,1,2,2,3,1,3]
a[2] = 1
index = 2
a[2] = 2

### Why Set Fits Better

`Set` is designed for:

- uniqueness
- membership checking

You do not need an index here.

You only care whether a value has appeared.

### Complexity

- Time: `O(n)` average
- Space: `O(n)`

## 9. Valid Anagram: Sort, Array Count, and Map Count

### Sort Solution

Sort both strings and compare them.

That works and is easy to explain.

### Complexity

- Time: `O(n log n)`
- Space: `O(n)`

### Frequency Count With Array

If the problem guarantees lowercase English letters only, an array of size `26` is excellent.

Why?

Because:

- the range is fixed
- small
- known in advance

This is the perfect case for an array-based counter.

### Example

For lowercase letters:

- `'a'` maps to index `0`
- `'b'` maps to index `1`
- ...
- `'z'` maps to index `25`

This is a great teaching example of when arrays are actually ideal.

### Frequency Count With Map

If characters can be more general:

- uppercase
- spaces
- punctuation
- unicode

then `Map` is more flexible.

Why?

Because you do not need a fixed alphabet size.

## 10. Best Time To Buy And Sell Stock

This problem is different.

It is not mainly about lookup.

It is about tracking the best state so far.

### Core Idea

Keep:

- the lowest price seen so far
- the best profit seen so far

### Why This Works

For each day:

- either it becomes the new best buy price
- or it becomes a selling opportunity

### Complexity

- Time: `O(n)`
- Space: `O(1)`

This is already optimal.

## 11. Array Vs Map Vs Set: Teaching Comparison

## Array

Use when:

- you want index-based access
- the range is fixed and known
- you want simple brute-force logic
- you want compact counters like frequency arrays

Weakness:

- search by value is usually slow
- range-based lookup can waste memory
- negative values need offsets

## Map

Use when:

- you need key -> value lookup
- keys may be negative or large
- the value range is unknown
- you want fast average lookup

Strength:

- flexible keys
- average `O(1)` lookup
- stores only what is used

## Set

Use when:

- you only care whether something exists
- you want uniqueness
- you want duplicate detection

Strength:

- simple API
- fast average membership checks
- expresses intent clearly

## 12. From Map To Cache

Now connect this to a bigger software idea.

### What Is A Cache?

A cache stores data that was already computed or already fetched, so the next lookup is faster.

### Simple Example

Suppose a function takes 2 seconds to compute a result.

If the same input appears again, we can save the old result and return it instantly.

That is caching.

### Local Cache With Map

Inside one JavaScript program, the simplest cache looks like this:

```js
const cache = new Map();

function getSquare(x) {
  if (cache.has(x)) {
    return cache.get(x);
  }

  const result = x * x;
  cache.set(x, result);
  return result;
}
```

This is the simplest version of the caching idea.

### Why This Helps

If the same query happens again:

- we avoid recomputing
- we return the cached answer
- repeated lookups become faster

## 13. Where Redis Fits

Redis is a real cache system used in production.

### Teaching Analogy

For teaching, you can say:

> A local `Map` is the simplest in-process version of the same caching idea that Redis uses at a larger scale.

That is the safe and accurate version.

Do **not** teach that `Map` and Redis are literally the same thing.

They are not.

But they are connected by the same core idea:

- store data by key
- retrieve repeated queries quickly

### Local Map Cache Vs Redis

## Local `Map`

- lives inside one JavaScript process
- disappears when the program stops
- only that process can use it
- simple and fast for demos

## Redis

- runs as a separate server
- can be shared by multiple apps
- supports expiration (TTL)
- supports larger system-level caching patterns
- often used for repeated queries, sessions, rate limiting, and temporary fast data access

### Example Use Case

Imagine:

- your app asks the database for the same user profile again and again

Without cache:

- every request hits the database

With cache:

1. first request loads from database
2. result is stored in cache
3. later requests read from cache
4. response is faster and database load is lower

That is the real-world value of caching.

## 14. Recommended Teaching Sequence

When teaching these topics, use this order:

1. brute-force with arrays
2. show the pain points
3. show array lookup with offsets (including negatives)
4. explain why this still has limitations
5. introduce `Map`
6. introduce `Set`
7. connect the idea to caching
8. connect local `Map` cache to Redis as a bigger real-world version of the same concept

This sequence helps students understand:

- not just the final code
- but the reason for the upgrade

## 15. Summary

The important lesson is:

- arrays are a good starting tool
- arrays can solve more than students think
- but arrays become awkward when the key space is large, sparse, or negative
- `Map` solves flexible key lookup cleanly
- `Set` solves uniqueness and membership cleanly
- caching is the same "save and reuse" idea at a bigger system level

Students should leave with this understanding:

> We choose a data structure based on the kind of lookup we need.
