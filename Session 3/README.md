# Session 3: TypeScript Foundations

This folder contains the teaching package for Session 3.

## Focus

This session teaches:

- `type` and `interface`
- union types (`A | B`)
- optional fields (`?`)
- basic generics
- async functions with `Promise<T>`
- writing TypeScript without `any`

## Files

- `LESSON_GUIDE.md`
  - Full teaching guide in English.
  - Use this during class.

- `typescript_examples.ts`
  - Complete examples for the session topics.
  - Good for walkthrough and discussion.

- `hw1_migration_template.ts`
  - Homework template for converting the 4 existing Session 2 homework functions to TypeScript.
  - It matches the function names in `/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session 2/dsa_examples.js`.
  - Typed function signatures are ready.
  - Students fill in the logic without using `any`.

- `HOMEWORK.md`
  - Homework brief, expectations, and common type mistakes.

- `tsconfig.json`
  - Strict TypeScript configuration for this session.

## Suggested Teaching Flow

1. Start with `LESSON_GUIDE.md`
2. Walk through `typescript_examples.ts`
3. Show `tsconfig.json` and explain `strict`
4. Assign `hw1_migration_template.ts` with `HOMEWORK.md`

## Typecheck

From this folder:

```bash
cd "/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session 3"
tsc --noEmit -p tsconfig.json
```

If you want emitted JavaScript:

```bash
tsc -p tsconfig.json
```

Compiled files will go to `dist/`.

## Teaching Goal

Students should leave this session with one core habit:

> Every function should have a clear contract: what it accepts and what it returns.
