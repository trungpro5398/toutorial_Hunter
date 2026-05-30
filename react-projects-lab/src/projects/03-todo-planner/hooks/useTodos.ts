/*
 * Manages todo state and exposes actions for the planner UI.
 */

import { useState } from "react";
import type { Todo, TodoFilter, Priority } from "../types/Todo";
import { createTodo } from "../utils/createTodo";
import { filterTodos } from "../utils/filterTodos";

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filter, setFilter] = useState<TodoFilter>("all");

    const visibleTodos = filterTodos( { todos, filter } );

    function addTodo( input: { title: string; priority: Priority; hasDueDate: boolean; dueDate?: string }) {
        const trimmedTitle = input.title.trim();

        if (trimmedTitle === "") {
            return;
        }

        const newTodo = createTodo( { title: trimmedTitle,
                                      priority: input.priority,
                                      hasDueDate: input.hasDueDate,
                                      dueDate: input.dueDate } );

        setTodos(currentTodos => [...currentTodos, newTodo] );
    }

    function toggleTodo(id: string) {
        setTodos(currentTodos => currentTodos.map(
            todo =>  todo.id === id ? { ...todo, completed: !todo.completed } :  todo
            )
        );z
    }

    function deleteTodo(id: string) {
        setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
    }

    function editTodo(
                        id: string,
                        updates: { title?: string; priority?: Priority; hasDueDate?: boolean; dueDate?: string }
                     ) {
        setTodos(currentTodos => currentTodos.map( todo => todo.id === id ? { ...todo, ...updates } : todo));
    }

    return {
        todos,
        filter,
        visibleTodos,
        setFilter,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
    };

}