import {
  budgetStatusBadgeClass,
  budgetStatusLabels,
  type BudgetStatus,
} from "@entities";

type BudgetStatusBadgeProps = {
  status: BudgetStatus;
};

export function BudgetStatusBadge({ status }: BudgetStatusBadgeProps) {
  return (
    <span className={budgetStatusBadgeClass[status]}>
      {budgetStatusLabels[status]}
    </span>
  );
}
