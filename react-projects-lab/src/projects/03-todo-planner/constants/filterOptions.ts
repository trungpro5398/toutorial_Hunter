/*
 * Stores the available todo filter options.
 */

import type { TodoFilter } from "../types/Todo";

export const filterOptions: { label: string; value: TodoFilter }[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
];