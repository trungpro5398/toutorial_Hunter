# Session 4 Homework

## Goal

Refactor existing code into a small multi-file project that can run with one command.

Students may choose one of these:

- refactor Snake
- refactor HW1 problem code

## Core Skills Being Trained

- module boundaries
- import / export
- project structure
- naming clarity
- runner setup

## Requirements

- split the code into multiple files
- avoid one giant file
- keep responsibilities separate
- add a one-command runner such as `npm run dev`
- explain the folder structure in the README

## Recommended Structure

```text
src/
  types/
  utils/
  services/
  runner.ts
```

Students may adjust this structure if the reasoning is clear.

## Required Deliverables

- source files split into modules
- `package.json`
- `README.md`

## README Must Include

- what the project does
- how to run it
- folder structure
- what each main file is responsible for
- one note about how circular import was avoided

## Pass Criteria

- code is split into multiple files with clear responsibilities
- imports and exports are used correctly
- the project runs with one command
- the README explains the structure clearly
