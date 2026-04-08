import { Link } from "react-router-dom";
import { BalanceSummary } from "./components/BalanceSummary";
import { TransactionForm } from "./components/TransactionForm";
import { TransactionList } from "./components/TransactionList";

export function ExpenseTrackerPage() {
  return (
    <section className="exercise-page" aria-labelledby="expense-tracker-title">
      <Link className="back-link" to="/">
        Back to project list
      </Link>

      <div className="exercise-header">
        <div className="exercise-heading">
          <p className="eyebrow">Project 05 · totals</p>
          <h1 id="expense-tracker-title">Expense Tracker</h1>
          <p>
            Read the requirements in the README. Build this screen from form,
            list, and summary components.
          </p>
        </div>
      </div>

      <div className="starter-surface">
        <TransactionForm />
        <BalanceSummary />
        <TransactionList />
      </div>
    </section>
  );
}
