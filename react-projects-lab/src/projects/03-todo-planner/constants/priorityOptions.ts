/*
 * Stores the available todo priority options.
 */

import type { Priority } from "../types/Todo";

export const priorityOptions: { label: string, value: Priority }[] = [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
];