/*
 * Filters todos based on the selected completion filter.
 * Returns todos that should be shown
 */

import type { Todo, TodoFilter } from "../types/Todo";

export function filterTodos( input: { todos: Todo[]; filter: TodoFilter }): Todo[] {
    if (input.filter === "active") {
        return input.todos.filter( (item) => !item.completed );
    }
    else if (input.filter === "completed") {
        return input.todos.filter( (item) => item.completed );
    }

    return input.todos;
}