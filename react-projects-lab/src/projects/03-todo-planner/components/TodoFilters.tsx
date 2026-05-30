/*
 * Renders filter buttons for switching visible todos.
 "All", "Active", "Completed"
 */

import type { TodoFilter } from "../types/Todo";
import { filterOptions } from "../constants/filterOptions";

type TodoFiltersProps = {
    filter: TodoFilter;
    setFilter: (filter: TodoFilter) => void;
};

export function TodoFilters({ filter, setFilter }: TodoFiltersProps) {
  return (
    <section className="starter-panel" aria-labelledby="todo-filters-title">
      <h2 id="todo-filters-title">TodoFilters</h2>
      <p>Build all, active, and completed filters here.</p>

      <div className="starter-actions">
      {
        filterOptions.map((option) => (
            <button
                key={option.value}
                className={option.value === filter ? "button" : "button secondary"}
                type="button"
                onClick={() => setFilter(option.value)}
            >
                {option.label}
            </button>
        ))
      }
      </div>
    </section>
  );
}
