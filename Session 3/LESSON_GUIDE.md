# Session 3: TypeScript Foundations

## Lesson Purpose

This lesson introduces the TypeScript basics that students need before working safely in a team codebase.

The goal is not only to "make TypeScript compile."

The real goal is to train students to think in contracts:

- what shape of data is allowed
- what a function accepts
- what a function returns
- what can be optional
- what can be one of several valid types

This lesson should be taught in English.


## Final Learning Outcome

By the end of the session, students should be able to:

- explain the difference between `type` and `interface`
- use union types to describe multiple valid shapes
- use optional fields safely
- write a basic generic function
- type an async function as `Promise<T>`
- avoid `any`
- run strict type checking and understand the most common type errors

## Why This Session Matters

TypeScript prevents "wrong data shape" bugs before runtime.

That matters because:
result [
  {
    a = 2
    b = "dasda"
    c = [2,4]
  }
]
- the compiler catches mistakes earlier
- API contracts become easier to read
- team code becomes easier to trust
- refactoring becomes safer

The message for students:

> TypeScript is not just syntax. It is a tool for making contracts explicit.

## Suggested Lesson Length

60 to 75 minutes

Recommended pacing:

- Opening mindset: 5 minutes
- `type` and `interface`: 15 minutes
- union types and optional fields: 12 minutes
- generics: 10 minutes
- async typing with `Promise<T>`: 12 minutes
- strict mode and common errors: 10 minutes
- homework briefing: 5 minutes

## 1. Opening Mindset

Start with this idea:

> In JavaScript, many data mistakes are discovered only when the code runs. In TypeScript, we try to catch them before the code runs.

Then explain:

- TypeScript is about writing clearer contracts.
- A good type tells another developer what the code expects.
- A good type also tells the compiler what to reject.

### Teacher Goal

Students should stop thinking:

> "How do I make this pass?"

and start thinking:

> "What shape should this data have?"

## 2. `type` and `interface`

### What They Are

Both are used to describe shapes in TypeScript.

Students do not need to treat them as enemies.

For this lesson:

- use `type` when describing values, unions, or aliases
- use `interface` when describing object contracts clearly

### Example: `type`

```ts
type UserId = number;
type Status = "idle" | "loading" | "success" | "error";
```

What this teaches:

- `UserId` is still a number, but the name gives meaning
- `Status` limits valid values to a known set

### Example: `interface`

```ts
interface User {
  id: UserId;
  name: string;
  email?: string;
}
```

What this teaches:

- the object shape is explicit
- `email` is optional

### Teaching Point

Say:

> A type name is documentation that the compiler can enforce.

### Mini Example

```ts
const user: User = {
  id: 1,
  name: "Hunter",
};
```

This is valid because `email` is optional.

But this is invalid:

```ts
const user: User = {
  id: "1",
  name: "Hunter",
};
```

Why?

Because `id` must be a `number`, not a `string`.

### Clearer Real-Work Example

Imagine the frontend receives this response from an API:

```ts
const apiUser = {
  id: 1,
  name: "Hunter",
  email: "hunter@example.com",
};
```

If we type it correctly:

```ts
interface UserCardProps {
  user: User;
}
```

then a component like this is easy to trust:

```ts
function renderUserCard(props: UserCardProps): string {
  return `${props.user.name} (${props.user.id})`;
}
```



But if another developer passes the wrong shape:

```ts
renderUserCard({
  user: {
    id: "1",
    name: "Hunter",
  },
});
```

TypeScript catches it before runtime.

This is exactly the kind of mistake that happens in real team code when frontend and backend contracts drift.

## 3. Union Types

### Core Idea

A union type means:

> This value can be one of several valid types.

### Example

```ts
type InputValue = string | number;
```

This means a function can accept either:

- a `string`
- a `number`

### Example Function

```ts
function normalizeId(value: string | number): number {
  if (typeof value === "number") {
    return value;
  }

  return Number(value);
}
```

### Teaching Point

Union types are powerful, but students must narrow them before using them safely.

That means checking:

- `typeof`
- discriminant fields
- other safe conditions

### Why This Matters

Without narrowing, TypeScript will block unsafe access.

That is a feature, not a problem.

### Clearer Example: Safe vs Unsafe

Unsafe:

```ts
function formatInput(value: string | number): string {
  return value.toUpperCase();
}
```

Why it fails:

- `toUpperCase()` exists on `string`
- it does not exist on `number`

Safe:

```ts
function formatInput(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }

  return value.toString();
}
```

### Real-Work Problem

A search box may return:

- a typed string from the UI
- a numeric ID from route params after parsing

A union type lets you represent that honestly instead of pretending the value is always one thing.

## 4. Optional Fields

### Core Idea

Optional fields are properties that may be missing.

### Example

```ts
interface StudentProfile {
  id: number;
  name: string;
  note?: string;
}
```

Here:

- `id` is required
- `name` is required
- `note` may or may not exist

### Safe Usage

```ts
function formatProfile(profile: StudentProfile): string {
  const extra = profile.note ? ` (${profile.note})` : "";
  return `${profile.name}${extra}`;
}
```

### Common Student Mistake

This is unsafe:

```ts
profile.note.toUpperCase();
```

Why?

Because `note` may be `undefined`.

### Teaching Point

Optional means:

> You must handle the missing case.

### Real-Work Problem

Backend APIs often return partial data.

Example:

- user profile sometimes includes `avatarUrl`
- sometimes it does not

That means this contract is realistic:

```ts
interface UserProfile {
  id: number;
  name: string;
  avatarUrl?: string;
}
```

The frontend must handle both cases:

- render the image if `avatarUrl` exists
- render a placeholder if it does not

## 5. Generic Basics

### Core Idea

A generic lets the caller decide the type later.

This is useful when the structure of the logic stays the same, but the data type changes.

### Example

```ts
function firstItem<T>(items: T[]): T | undefined {
  return items[0];
}
```

### What This Means

- if `items` is `string[]`, the result is `string | undefined`
- if `items` is `number[]`, the result is `number | undefined`

The function logic is the same, but the returned type stays accurate.

### Concrete Examples

```ts
const a = firstItem(["a", "b", "c"]); // string | undefined

const b = firstItem([10, 20, 30]);    // number | undefined
```

### Teaching Point

Say:

> A generic is how we keep reuse without losing type information.

### Real-Work Problem

Imagine a reusable dropdown component:

```ts
function getFirstOption<T>(options: T[]): T | undefined {
  return options[0];
}

```

This works for:

- `string[]` labels
- `User[]` objects
- `Product[]` objects

The logic is reused, and the returned type stays accurate for each screen.

## 6. Async Typing With `Promise<T>`

### Core Idea

An `async` function always returns a `Promise`.

So if the final value is a `User`, the function type is:

```ts
Promise<User>
```

### Example

```ts
interface User {
  id: number;
  name: string;
}

async function getUser(id: number): Promise<User> {
  return {
    id,
    name: "Hunter",
  };
}
```

### Teaching Point

Students often write the inside correctly but forget to type the function as `Promise<T>`.

That is one of the easiest mistakes to fix once they see the rule:

> `async` + final type `T` = return type `Promise<T>`

### Better Example With Result Union

```ts
interface ApiSuccess<T> {
  ok: true;
  data: T;
}

interface ApiFailure {
  ok: false;
  error: string;
}

type ApiResult<T> = ApiSuccess<T> | ApiFailure;
```

Then:

```ts
async function loadUser(id: number): Promise<ApiResult<User>> {
  if (id <= 0) {
    return {
      ok: false,
      error: "Invalid user id",
    };
  }

  return {
    ok: true,
    data: {
      id,
      name: "Hunter",
    },
  };
}
```

This is a strong example because it teaches:

- generics
- unions
- async typing
- clear API contracts

### Clearer Real-Work Example

Suppose your frontend loads an order:

```ts
interface Order {
  id: number;
  total: number;
}

async function loadOrder(orderId: number): Promise<Order> {
  return {
    id: orderId,
    total: 99,
  };
}
```

The key contract is:

- input: `orderId: number`
- output: `Promise<Order>`

Another developer can read the function signature and understand what comes back before even reading the body.

## 7. Why We Avoid `any`

### Core Idea

`any` turns off the compiler's help.

If you use `any`, TypeScript stops protecting that part of the program.

### Why This Is Dangerous

With `any`, this becomes possible:

```ts
function printName(user: any): string {
  return user.name.toUpperCase();
}
```

The compiler allows it.

But runtime may still crash if `user` is missing `name`.

### Better Alternative

Use a real contract:

```ts
interface NamedUser {
  name: string;
}

function printName(user: NamedUser): string {
  return user.name.toUpperCase();
}
```

### Teaching Point

Say:

> `any` makes the compiler blind. We want the compiler to help, not to give up.

## 8. Strict Mode

### What `strict` Does

Strict mode turns on stronger type checks.

This is important because it catches:

- missing `undefined` handling
- weak assumptions
- incorrect assignments
- loose function contracts

### Why Students Need It

If strict mode is off, students can accidentally write code that "looks typed" but still hides bugs.

For this session, strict mode is part of the discipline.

## 9. Common Type Errors To Teach

### Error 1: Type Mismatch

Example:

```ts
const id: number = "1";
```

Fix:

- change the value type
- or convert it intentionally

### Error 2: Possibly `undefined`

Example:

```ts
profile.note.toUpperCase();
```

Fix:

- add a guard
- use conditional logic

### Error 3: Wrong Union Usage

Example:

Trying to call string methods on `string | number` without checking the type first.

Fix:

- narrow with `typeof`

### Error 4: Async Return Type Confusion

Example:

Typing an async function as `User` instead of `Promise<User>`.

Fix:

- wrap the return type in `Promise<...>`

### Error 5: Reaching For `any`

Example:

Using `any` because the type feels inconvenient.

Fix:

- define a proper type alias
- define an interface
- use a union
- use a generic

## 10. Simple Practice Exercises For Class

These are short teaching exercises.

They are designed to help students understand the contract idea before moving into more realistic team-style problems.

The recommended teaching flow:

1. show the prompt
2. ask students to predict the type first
3. let them try for 2 to 4 minutes
4. reveal the sample answer
5. explain why the type contract is useful

### Exercise 1: Basic Object Contract

Prompt:

Create a type for a student card.

Rules:

- `id` must be a number
- `name` must be a string
- `note` is optional

Then write a function that formats the student card into a string.

### Sample Answer

```ts
interface StudentCard {
  id: number;
  name: string;
  note?: string;
}

function formatStudentCard(student: StudentCard): string {
  const noteText = student.note ? ` | Note: ${student.note}` : "";
  return `#${student.id} ${student.name}${noteText}`;
}
```

### Example Usage

```ts
const a: StudentCard = {
  id: 1,
  name: "Hunter",
};

const b: StudentCard = {
  id: 2,
  name: "Luna",
  note: "Late submission",
};
```

Teaching point:

- students see required vs optional fields clearly
- students learn that object shape is part of the function contract

### Exercise 2: Union Type + Narrowing

Prompt:

Write a function that accepts either:

- a `string`
- a `number`

If it receives a string, return the uppercase version.

If it receives a number, return the number converted to a string.

### Sample Answer

```ts
function normalizeValue(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  }

  return value.toString();
}
```

### Example Usage

```ts
normalizeValue("hello"); // "HELLO"
normalizeValue(42);      // "42"
```

Teaching point:

- students must narrow the union before using type-specific methods
- students see that TypeScript forces safe handling

### Exercise 3: Generic + Async Contract

Prompt:

Write:

1. a generic function that returns the first item of an array
2. an async function that returns a user object

The goal is to practice:

- generic return types
- `Promise<T>`

### Sample Answer

```ts
function firstItem<T>(items: T[]): T | undefined {
  return items[0];
}

interface User {
  id: number;
  name: string;
}

async function getUser(id: number): Promise<User> {
  return {
    id,
    name: "Hunter",
  };
}
```

### Example Usage

```ts
const firstName = firstItem(["Alice", "Bob"]);
const firstScore = firstItem([10, 20]);
```

Teaching point:

- the same generic function keeps correct types for different arrays
- `async` does not return `User`, it returns `Promise<User>`

### Optional Quick Challenge

Ask students:

> What would be the return type of `firstItem([])`?

Expected answer:

```ts
undefined
```

More precisely, the function type is:

```ts
T | undefined
```

That is a good moment to reinforce that TypeScript tracks missing cases too.

## 11. Real-Work Problems For Class Discussion

Use these as short design exercises during class.

Students do not need to fully code all of them live.

The goal is to connect TypeScript to actual development work.

### Problem 1: Typed API Response

Scenario:

Your frontend calls `/api/user/1`.

You expect:

```ts
interface User {
  id: number;
  name: string;
  email?: string;
}
```

Question to ask students:

- Which fields are required?
- Which fields should be optional?
- What should the async function return type be?

Expected direction:

```ts
async function getUser(id: number): Promise<User> {
  // ...
}
```

### Problem 2: API Result State

Scenario:

A page can be:

- loading
- success
- error

Question to ask students:

- Should this be a free-form string or a strict union?

Expected direction:

```ts
type PageStatus = "loading" | "success" | "error";
```

This is real-world useful because state names are easy to mistype in UI code.

### Problem 3: Optional Backend Fields

Scenario:

A product may include a discount, but not every product has one.

Expected direction:

```ts
interface Product {
  id: number;
  name: string;
  price: number;
  discountPercent?: number;
}
```

Question:

- What bug appears if we assume `discountPercent` always exists?

Answer:

- runtime logic may try to calculate with `undefined`

### Problem 4: Reusable API Wrapper

Scenario:

You want one reusable success wrapper for many endpoints.

Expected direction:

```ts
interface ApiResponse<T> {
  data: T;
  message: string;
}
```

Then:

```ts
type UserResponse = ApiResponse<User>;
type ProductResponse = ApiResponse<Product>;
```

This is a practical reason for generics.

### Problem 5: Safe Async Error Contract

Scenario:

An async function may either return data or an error object.

Expected direction:

```ts
interface Success<T> {
  ok: true;
  data: T;
}

interface Failure {
  ok: false;
  error: string;
}

type Result<T> = Success<T> | Failure;
```

Then:

```ts
async function loadProduct(id: number): Promise<Result<Product>> {
  // ...
}
```

This is realistic because many teams standardize API result shapes like this.

## 12. Suggested Live Examples

Use `typescript_examples.ts` during class.

Recommended walkthrough order:

1. `type` aliases (`UserId`, `Status`)
2. `interface User`
3. union input normalization
4. optional `email`
5. generic `firstItem<T>`
6. `Promise<T>` with `loadUser`

The goal is to show that these are not separate random features.

They work together to create safer function contracts.

## 13. Homework

### Assignment

Convert the 4 existing JavaScript homework functions from Session 2 into TypeScript:

- `twoSumBruteForce`
- `containsDuplicateWithSort`
- `isAnagramWithSort`
- `maxProfit`

Source file:

- `/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session 2/dsa_examples.js`

### Requirements

- use `.ts`
- enable `strict`
- run typecheck
- do not use `any`
- write clear parameter and return types

### What Students Must Record

Ask students to write down:

- which type errors appeared most often
- which error felt most confusing
- how they fixed it

This reflection matters because it shows what contract mistakes are still habitual.

## 14. Teaching Summary

If students remember only three ideas from this session, they should be:

1. Good types are contracts.
2. `async` functions return `Promise<T>`.
3. Avoid `any` because it removes the compiler's protection.

That is the foundation they need before working with APIs and team code.
