# Monorepo Demo Structure

## Purpose

This file is not the main lesson.

It is a short bridge document for later teaching.

Use it only after students already understand:

- modules
- file responsibilities
- runners
- clean dependency direction inside one project

## What A Monorepo Is

A monorepo is a repository that contains multiple apps and/or shared packages in one place.

This is bigger than a normal modular project.

A modular project asks:

> How do we organize one codebase internally?

A monorepo asks:

> How do we organize multiple related codebases together?

## Simple Example Structure

```text
repo/
  apps/
    web/
      src/
      package.json
    admin/
      src/
      package.json
  packages/
    ui/
      src/
      package.json
    shared-types/
      src/
      package.json
    api-client/
      src/
      package.json
  package.json
```

## How To Explain This To Students

### `apps/`

Contains runnable applications.

Examples:

- web app
- admin app
- mobile app

### `packages/`

Contains shared code used by multiple apps.

Examples:

- reusable UI components
- shared types
- API client logic

## Why Teams Use This

At a high level, teams use a monorepo when they want:

- shared code reuse
- one place to manage related projects
- easier cross-project refactors
- consistent tooling

## Very Practical Example

Suppose both `web` and `admin` use the same user type:

```ts
export interface User {
  id: number;
  name: string;
  email?: string;
}
```

If that type lives in:

```text
packages/shared-types/
```

then both apps can import the same source of truth.

That reduces:

- duplicated type definitions
- inconsistent updates
- mismatch bugs between apps

## What Students Should Not Confuse

Students often confuse these levels:

### Single File Organization

- splitting one big file into several files

### Modular Project Organization

- structuring one project into `types`, `utils`, `services`, `runner`

### Monorepo Organization

- structuring multiple related apps/packages in one repository

These are connected ideas, but they are not the same thing.

## Teaching Recommendation

Do not teach monorepo first.

Teach in this order:

1. split one file into modules
2. structure one project cleanly
3. only then introduce monorepo as a larger organizational model

That order keeps the concepts grounded.
