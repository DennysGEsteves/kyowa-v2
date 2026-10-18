import {
  budgetStatusBadgeClass,
  budgetStatusLabels,
  type BudgetStatus,
} from "@entities";

type BudgetStatusBadgeProps = {
  status: BudgetStatus;
  compact?: boolean;
};

export function BudgetStatusBadge({
  status,
  compact = false,
}: BudgetStatusBadgeProps) {
  return (
    <span
      className={`${budgetStatusBadgeClass[status]}${compact ? " !px-2 !py-0.5" : ""}`}
    >
      {budgetStatusLabels[status]}
    </span>
  );
}
