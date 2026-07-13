/*
 * Defines the shared todo types used across the planner.
 */

export type Priority = "low" | "medium" | "high";

export type TodoFilter = "all" | "active" | "completed";

export type Todo = {
    id: string;
    title: string;
    priority: Priority;
    hasDueDate: boolean;
    dueDate?: string;
    completed: boolean;
};