# Project 03 - Todo Planner

## Goal

Build a small todo app to practice form state, list rendering, and updating items by id.

## Requirements

- Add new tasks with title, priority, and optional due date.
- Validate that title is not empty.
- Toggle the completed state for each task.
- Edit and delete tasks by id.
- Filter tasks by all, active, and completed.
- Split the form, filter bar, list, and item into separate components.

## Suggested Structure

```text
03-todo-planner/
  components/     TodoForm, TodoFilters, TodoList, TodoItem
  constants/      filter options, priority options
  hooks/          useTodos
  types/          Todo, TodoFilter, Priority
  utils/          createTodo, filterTodos
```
