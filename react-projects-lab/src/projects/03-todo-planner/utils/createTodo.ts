/*
 * Creates a complete todo object from input values.
 */

import type { Todo, Priority } from "../types/Todo";

export function createTodo(input: { title: string; priority: Priority; hasDueDate: boolean; dueDate?: string }): Todo {
    const todo = {
        id: crypto.randomUUID(),
        title: input.title,
        priority: input.priority,
        hasDueDate: input.hasDueDate,
        dueDate: input.hasDueDate ? input.dueDate : undefined,
        completed: false,
    }

    return todo;
}