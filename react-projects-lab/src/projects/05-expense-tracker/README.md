# Project 05 - Expense Tracker

## Goal

Build an expense tracker to practice number inputs, computed totals, and form validation.

## Requirements

- Create transactions with title, amount, type, and category.
- Amount must be a positive number.
- Type must be either income or expense.
- Calculate balance, total income, and total expense from the transaction list.
- Allow deleting transactions by id.
- Prepare localStorage persistence with an effect after the CRUD flow is stable.

## Suggested Structure

```text
05-expense-tracker/
  components/     TransactionForm, TransactionList, BalanceSummary
  constants/      category options, transaction types
  hooks/          useTransactions
  types/          Transaction, TransactionType
  utils/          calculateTotals, createTransaction
```
