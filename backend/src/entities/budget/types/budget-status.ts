export enum BudgetStatus {
  Closed = 'closed',
  Open = 'open',
  Cancel = 'cancel',
  Inactive = 'inactive',
  Lost = 'lost',
}

export const BUDGET_STATUSES = Object.values(BudgetStatus);
