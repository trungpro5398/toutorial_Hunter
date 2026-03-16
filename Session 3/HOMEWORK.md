# Session 3 Homework

## Goal

Convert the 4 existing homework solutions from Session 2 from JavaScript to TypeScript.

The purpose is to force better typing habits:

- no `any`
- explicit function contracts
- strict type checking

## Problems

Students should convert these exact functions from:

[dsa_examples.js](/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session%202/dsa_examples.js)

Required source functions:

- `twoSumBruteForce`
- `containsDuplicateWithSort`
- `isAnagramWithSort`
- `maxProfit`

## Required Files

- `hw1_migration_template.ts`
- `tsconfig.json`

Students may rename the homework file, but the work must stay in TypeScript.

## Optional Stretch Goal

If students finish early, they may also convert the improved versions from Session 2:

- `twoSumWithMap`
- `containsDuplicateWithSet`
- `isAnagramWithMap`

## Requirements

- use TypeScript (`.ts`)
- keep `strict: true`
- run typecheck successfully
- do not use `any`
- write parameter and return types for every function

## Typecheck Command

From this folder:

```bash
cd "/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session 3"
tsc --noEmit -p tsconfig.json
```

## Reflection Requirement

Students must record:

- which type error happened most often
- which type error was hardest to understand
- what change fixed it

## Common Errors Students May See

### 1. Wrong Assignment Type

Example:

```ts
const id: number = "1";
```

Meaning:

- a string was assigned to a number

### 2. Missing `undefined` Handling

Example:

Trying to use a value that may be `undefined` without checking it first.

### 3. Incorrect Return Type

Example:

Returning a `number` from a function typed as `boolean`.

### 4. Array Element Type Mismatch

Example:

Putting a string into `number[]`.

### 5. Using `any` To Bypass A Real Type Problem

This is not allowed for the homework.

The fix should be:

- define a better type
- adjust the function contract
- add a safe guard

## Why This Homework Matters

This homework is designed to break the habit of:

> "Just use `any` so the code runs."

Instead, students should build the habit of:

> "Make the contract clear so the compiler can help."

That is the real skill being trained.
