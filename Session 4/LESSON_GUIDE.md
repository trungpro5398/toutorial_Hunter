# Session 4: Module System + Project Structure + Runner

## Lesson Purpose

This lesson teaches students how to split code into multiple files correctly.

The goal is not just to use `import` and `export`.

The real goal is to train these habits:

- one file = one responsibility
- clear naming
- clear dependency direction
- easier review
- easier reuse
- safer project growth

This lesson should be taught in English.

## Final Learning Outcome

By the end of the session, students should be able to:

- explain that different architecture styles still aim for clearer separation of responsibilities
- explain what a module is
- explain the difference between named export and default export
- split code into `types`, `utils`, `services`, `data`, and `runner`
- explain why a large single file becomes hard to review
- create a runner so the project can be executed with one command
- explain the difference between a monolith, a modular project, and a monorepo at a beginner level
- identify basic circular import risks and avoid them

## Why This Session Matters

In small practice files, everything can live in one place.

In real projects, that becomes a problem very quickly:

- one file contains too many responsibilities
- small edits become risky
- code review becomes harder
- merge conflicts become more common
- logic becomes harder to reuse

The message for students:

> Project structure is part of the solution, not just folder decoration.

### Teaching Line: Different Architectures, Same Goal

There are many architecture styles.

They do not all organize code the same way.

But the shared goal is usually similar:

> Separate responsibilities clearly so the code is easier to understand, maintain, test, and extend.

This is the more precise version of saying:

> We split the work up.

That sentence is directionally correct, but incomplete.

The important part is not only splitting.

The important part is splitting with clear boundaries.

Bad splitting still creates confusion.

Good splitting creates clear ownership.

### Before Moving On: Monolith vs Modular Project vs Monorepo

Students often hear the word "mono" and mix these ideas together.

They are related, but they are not the same thing.

#### Monolith

A monolith usually means:

- one application
- many responsibilities may still live inside the same codebase
- often deployed as one main unit

This is not automatically bad.

Many real products start as monoliths because:

- setup is simpler
- development is faster at the beginning
- one deploy can be easier than many small deploys

The problem appears when the monolith has weak internal boundaries.

That creates:

- huge files
- mixed responsibilities
- harder reviews

So the real enemy is not "monolith" by itself.

The real enemy is:

- unclear structure inside the monolith

#### Modular Project

A modular project means:

- the code is split into smaller units with clearer responsibilities
- files and folders have better ownership
- utilities, services, types, and runners do different jobs

This lesson is mainly about that level.

We are teaching how to make one codebase cleaner internally.

#### Monorepo

A monorepo means:

- many packages, apps, or services live in one repository

For example:

```text
repo/
  apps/
    web/
    admin/
  packages/
    ui/
    shared-types/
    api-client/
```

This is a repository-level decision, not just a single-file organization decision.

### Why Companies Like Google Use A Monorepo

At a high level, companies like Google are known for using a monorepo because it helps with:

- shared code reuse
- consistent tooling
- easier large-scale refactors
- easier visibility across teams
- keeping related changes in one place

Very practical example:

If a shared library changes, a monorepo can make it easier to:

- update the library
- update all consumers
- test the changes together

That is much harder when every project lives in a completely separate repo with separate histories and tooling.

### Why We Are Not Teaching Monorepo First

Because monorepo is a bigger organizational topic.

Before students think about:

- many apps
- many packages
- shared workspace tooling

they first need to understand:

- how to structure one small project properly
- how modules depend on each other
- how to keep responsibilities separate

So the order is:

1. learn module boundaries inside one small project
2. learn clean runner and file ownership
3. later learn bigger repo organization such as monorepo

That order is important.

### When A Monolith Is Still A Good Choice

Students should not leave this lesson thinking:

> monolith = bad, microservices or monorepo = good

That would be the wrong lesson.

A monolith is still a good choice when:

- the project is small or early-stage
- one team owns the whole product
- the domain is still changing quickly
- the team wants simple deployment
- the engineering cost of splitting systems is not justified yet

### Why Many Teams Start With A Monolith

Because at the beginning, a monolith can be:

- faster to build
- easier to debug
- easier to deploy
- easier to reason about as one product

That is often the correct choice.

### The Important Distinction

There are two very different situations:

1. a monolith with clear internal structure
2. a monolith with messy boundaries

The first one can work very well.

The second one becomes painful.

So the real lesson is:

> Even inside a monolith, you still need modules, responsibilities, and clean boundaries.

## Suggested Lesson Length

60 to 75 minutes

Recommended pacing:

- Opening mindset: 5 minutes
- monolith vs module thinking: 10 minutes
- import/export basics: 15 minutes
- named vs default export: 10 minutes
- structure by responsibility: 15 minutes
- runner and one-command execution: 10 minutes
- circular import warning: 5 minutes
- homework briefing: 5 minutes

## 1. Opening Mindset

Start with this:

> A single file can solve a small problem. A real project needs boundaries.

Then explain:

- code is read more often than it is written
- teammates need predictable file locations
- when everything is mixed together, bugs become harder to isolate

### Teacher Goal

Students should stop thinking:

> "Where can I put this code so it runs?"

and start thinking:

> "Which file should own this responsibility?"

## 2. Start With The Problem: One File Doing Too Much

Before talking about `import` and `export`, show students the actual pain.

### Monolith Example

```ts
type Student = {
  id: number;
  name: string;
  scores: number[];
};

const students: Student[] = [
  { id: 1, name: "Hunter", scores: [70, 80, 90] },
  { id: 2, name: "Luna", scores: [40, 50, 45] }
];

function average(nums: number[]): number {
  let total = 0;

  for (const value of nums) {
    total += value;
  }

  return nums.length === 0 ? 0 : total / nums.length;
}

function formatAverage(value: number): string {
  return value.toFixed(2);
}

for (const student of students) {
  const avg = average(student.scores);
  const passed = avg >= 50;
  console.log(`${student.name} | ${formatAverage(avg)} | ${passed ? "PASS" : "FAIL"}`);
}
```

### Ask Students

Ask:

> What responsibilities are mixed together here?

Expected answers:

- data shape
- sample data
- math logic
- formatting logic
- report-building logic
- runner / execution

### Core Teaching Point

The code works.

But it is hard to scale because one file owns too many jobs.

That is exactly when module thinking becomes necessary.

## 3. What Is A Module?

A module is a file that exposes values or functions for other files to use.

That usually means:

- export from one file
- import into another file

### Basic Example

`math.ts`

```ts
export function add(a: number, b: number): number {
  return a + b;
}
```

`runner.ts`

```ts
import { add } from "./math.ts";

console.log(add(2, 3));
```

### Why This Matters

Now:

- the logic lives in one file
- the execution lives in another file

That separation is the beginning of maintainable structure.

## 4. Named Export vs Default Export

This distinction is important because students will see both styles in real codebases.

### Named Export

Use named export when a file exposes one or more clearly named items.

Example:

```ts
export function sum(nums: number[]): number {
  let total = 0;

  for (const value of nums) {
    total += value;
  }

  return total;
}

export function average(nums: number[]): number {
  if (nums.length === 0) return 0;
  return sum(nums) / nums.length;
}
```

Import:

```ts
import { sum, average } from "./utils/score.ts";
```

### Why Named Export Is Good Here

Because the file exposes multiple related utilities, and each one should keep its own explicit name.

### Default Export

Use default export when a file mainly exposes one main thing.

Example:

```ts
export default function buildStudentReports(): string {
  return "report";
}
```

Import:

```ts
import buildStudentReports from "./services/report.service.ts";
```

### Why Default Export Is Good Here

Because the file has one main responsibility:

- building the report

### Practical Rule For Students

- use named export for shared helpers, types, and small utilities
- use default export when one file has one main service or feature entry

That rule is simple enough for beginners and useful in real code too.

### Common Mistake

Students often mix the syntax incorrectly.

Wrong:

```ts
import average from "./utils/score.ts";
```

if the file exported:

```ts
export function average() {}
```

Correct:

```ts
import { average } from "./utils/score.ts";
```

## 5. Step-By-Step Refactor: From One File To A Small Project

This is the most important teaching section.

Show students how to refactor the monolith example slowly.

### Step 1: Move Data Shape Into `types/`

`types/student.ts`

```ts
export interface Student {
  id: number;
  name: string;
  scores: number[];
}

export interface StudentReport {
  id: number;
  name: string;
  average: number;
  passed: boolean;
}
```

### Why This File Exists

This file owns the contracts:

- what a `Student` looks like
- what a `StudentReport` looks like

It should not contain:

- business logic
- printing
- runner code

### Step 2: Move Reusable Math Into `utils/`

`utils/score.ts`

```ts
export function sum(nums: number[]): number {
  let total = 0;

  for (const value of nums) {
    total += value;
  }

  return total;
}

export function average(nums: number[]): number {
  if (nums.length === 0) return 0;
  return sum(nums) / nums.length;
}

export function hasPassed(avg: number): boolean {
  return avg >= 50;
}
```

### Why This File Exists

This file owns:

- small reusable pure functions

It should not know:

- where the data came from
- how the final output is printed

### Step 3: Move Formatting Into Another Utility File

`utils/format.ts`

```ts
export function formatAverage(value: number): string {
  return value.toFixed(2);
}
```

### Why Split Formatting From Score Logic?

Because formatting is not the same responsibility as calculation.

That is a subtle but important design habit.

### Step 4: Move Business Logic Into `services/`

`services/report.service.ts`

```ts
import type { Student, StudentReport } from "../types/student.ts";
import { average, hasPassed } from "../utils/score.ts";

export default function buildStudentReports(students: Student[]): StudentReport[] {
  return students.map((student) => {
    const avg = average(student.scores);

    return {
      id: student.id,
      name: student.name,
      average: avg,
      passed: hasPassed(avg),
    };
  });
}
```

### Why This Belongs In `services/`

Because this file combines:

- input data
- utility functions
- application logic

This is the workflow layer, not just a small helper.

### Step 5: Keep Sample Data Separate

`data/students.ts`

```ts
import type { Student } from "../types/student.ts";

export const sampleStudents: Student[] = [
  { id: 1, name: "Hunter", scores: [70, 80, 90] },
  { id: 2, name: "Luna", scores: [40, 50, 45] },
];
```

### Why This Helps

Now the service can be reused with:

- real data
- mock data
- test data

without changing the service itself.

### Step 6: Keep Execution In The Runner

`runner.ts`

```ts
import { sampleStudents } from "./data/students.ts";
import buildStudentReports from "./services/report.service.ts";
import { formatAverage } from "./utils/format.ts";

function main(): void {
  const reports = buildStudentReports(sampleStudents);

  for (const report of reports) {
    const status = report.passed ? "PASS" : "FAIL";
    console.log(`${report.name} | ${formatAverage(report.average)} | ${status}`);
  }
}

main();
```

### Why This Is Better Than The Monolith

Now:

- each file has a clearer job
- review is easier
- utility functions are reusable
- changing formatting does not affect score calculation
- changing data does not affect business logic

## 6. Folder Structure By Responsibility

This is the key project design rule for this lesson.

### Recommended Beginner Structure

```text
src/
  types/
  utils/
  services/
  data/
  runner.ts
```

### What Each Folder Owns

`types/`

- interfaces
- type aliases
- data contracts

`utils/`

- small reusable helpers
- calculations
- formatting
- pure functions

`services/`

- business logic
- workflows
- functions that combine multiple utilities and types

`data/`

- example data
- constants
- demo input

`runner.ts`

- entry point
- starts the program
- prints or runs the workflow

### Practical Naming Rule

If a student is unsure where code belongs, ask:

> Is this a shape, a helper, a workflow, or the entry point?

That question usually gives the answer.

## 7. The Runner

### What Is A Runner?

A runner is the file that starts the program.

It should:

- import the needed modules
- call the main workflow
- print or return the result

It should not become a giant logic file.

### Bad Runner Example

```ts
// bad: too much logic in the runner
const students = [...];

function average() { ... }
function hasPassed() { ... }
function formatAverage() { ... }

for (...) {
  ...
}
```

This defeats the purpose of structure.

### Good Runner Example

```ts
import { sampleStudents } from "./data/students.ts";
import buildStudentReports from "./services/report.service.ts";
import formatReportLine from "./utils/format.ts";

function main(): void {
  const reports = buildStudentReports(sampleStudents);

  for (const report of reports) {
    console.log(formatReportLine(report));
  }
}

main();
```

### Why The Runner Matters

Without a runner:

- students manually test random pieces of code
- execution becomes inconsistent
- the project feels fragmented

With a runner:

- the whole feature can be tested with one command

That is the first step toward real project ergonomics.

## 8. One-Command Execution

Students should get used to this:

```bash
npm run dev
```

Why?

Because one command:

- reduces friction
- helps onboarding
- makes demos repeatable
- is closer to real team code

### Example `package.json`

```json
{
  "type": "module",
  "scripts": {
    "dev": "node src/runner.ts"
  }
}
```

### Teaching Note

In this repo, Node 22 can run the simple `.ts` demo directly.

The important lesson is not the exact tool.

The important lesson is:

> The project should run with one clear command.

## 9. Circular Import Warning

### What Is A Circular Import?

It happens when:

- file A imports file B
- file B imports file A

That creates unnecessary coupling and can cause confusing runtime behavior.

### Simple Bad Example

`a.ts`

```ts
import { b } from "./b.ts";

export const a = b + 1;
```

`b.ts`

```ts
import { a } from "./a.ts";

export const b = a + 1;
```

### Why This Is Bad

Now the files depend on each other to initialize correctly.

That is brittle and hard to reason about.

### Practical Beginner Rule

Use this dependency direction:

```text
types -> no service dependency
utils -> can depend on types
services -> can depend on types and utils
runner -> can depend on everything
```

And:

- nothing should import the runner
- `types` should usually not import `services`
- `utils` should stay low-level

That directional rule prevents many beginner mistakes.

## 10. Simple Practice Exercises

These are short teaching exercises.

The recommended flow:

1. show the prompt
2. ask students where the code should go
3. let them try briefly
4. reveal the sample answer

### Exercise 1: Move A Function Into Its Own Module

Prompt:

Take this function and move it into `utils/math.ts`.

```ts
function double(value: number): number {
  return value * 2;
}
```

Then import it into `runner.ts`.

### Sample Answer

`utils/math.ts`

```ts
export function double(value: number): number {
  return value * 2;
}
```

`runner.ts`

```ts
import { double } from "./utils/math.ts";

console.log(double(5));
```

Teaching point:

- the runner executes
- the utility file owns the reusable logic

### Exercise 2: Use Default Export For One Main Service

Prompt:

Create a file that builds a greeting message and export it as the main function of that file.

### Sample Answer

`services/greeting.service.ts`

```ts
export default function buildGreeting(name: string): string {
  return `Hello, ${name}`;
}
```

`runner.ts`

```ts
import buildGreeting from "./services/greeting.service.ts";

console.log(buildGreeting("Hunter"));
```

Teaching point:

- default export works well when one file has one main thing

### Exercise 3: Decide The Correct Folder

Prompt:

Where should each item go?

- `interface Student`
- `average(scores)`
- `buildStudentReports(students)`
- `sampleStudents`
- `main()`

### Expected Answer

- `interface Student` -> `types/`
- `average(scores)` -> `utils/`
- `buildStudentReports(students)` -> `services/`
- `sampleStudents` -> `data/`
- `main()` -> `runner.ts`

Teaching point:

- structure becomes easier once responsibilities are named clearly

## 11. Real-Work Problems For Class Discussion

Use these as small design exercises.

The goal is to make students see that project structure is a real engineering concern.

### Problem 1: API Client Feature

Scenario:

You load user data from an API and render a small CLI summary.

Ask students:

- where should the user type live?
- where should the fetch function live?
- where should the formatting function live?
- where should the execution live?

Expected structure:

- `types/user.ts`
- `services/user.service.ts`
- `utils/format.ts`
- `runner.ts`

### Problem 2: LeetCode Solution Pack

Scenario:

You have 10 algorithm solutions in one file and want to clean it up.

Ask students:

- what should stay together?
- what should be split apart?

Expected direction:

- keep each problem in its own file
- move shared helpers into `utils/`
- keep the runner separate if you want to demo them

### Problem 3: Snake Refactor

Scenario:

The Snake game has:

- board rendering
- movement logic
- food spawning
- state creation
- runner loop

Ask students:

- what deserves its own file?

Expected direction:

- `types/` for positions and state shape
- `utils/` for small helpers like equality or bounds logic
- `services/` for movement/update logic
- `runner` for input loop and rendering trigger

This prepares them directly for the homework.

## 12. Code Demo In This Session

Use the `module_demo/` project in this folder.

It demonstrates:

- named export
- default export
- folder structure
- runner
- one-command execution

Suggested teaching order:

1. open [student.ts](/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session%204/module_demo/src/types/student.ts)
2. open [score.ts](/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session%204/module_demo/src/utils/score.ts)
3. open [format.ts](/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session%204/module_demo/src/utils/format.ts)
4. open [report.service.ts](/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session%204/module_demo/src/services/report.service.ts)
5. open [runner.ts](/Users/quangtrungnguyen/Documents/Offer_Job/Tutorial/Session%204/module_demo/src/runner.ts)
6. run `npm run dev`

## 13. Homework

### Assignment

Refactor either:

- Snake
- or HW1 problem code

into multiple files.

### Requirements

- use modules
- separate responsibilities clearly
- provide one runner command
- include a README explaining the folder structure

### Required Output

Students should produce:

- multiple files, not one big file
- `package.json` with a runnable script
- README that explains what each folder or main file does

### Suggested README Sections

- project purpose
- how to run
- folder structure
- file responsibilities
- one note about how circular import was avoided

## 14. Teaching Summary

If students remember only three things from this lesson, they should be:

1. One file should own one responsibility.
2. The runner is the entry point, not the place for all logic.
3. Good module boundaries make code easier to review, reuse, and grow.
