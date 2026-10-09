import type {
  BudgetCheckoutItem,
  BudgetClosingAt,
  BudgetClosingLevel,
  BudgetStatus,
} from "@entities";

export type ListBudgetsParams = {
  page?: number;
  limit?: number;
};

export type CreateBudgetDTO = {
  userId: string;
  storeId: string;
  clientId?: string | null;
  architectId?: string | null;
  obs?: string | null;
  lostReasons?: string | null;
  status?: BudgetStatus;
  closingAt?: BudgetClosingAt | null;
  closingLevel?: BudgetClosingLevel | null;
  checkout?: BudgetCheckoutItem[];
  createdAt?: string;
};

export type UpdateBudgetDTO = {
  clientId?: string | null;
  storeId?: string;
  architectId?: string | null;
  obs?: string | null;
  lostReasons?: string | null;
  status?: BudgetStatus;
  closingAt?: BudgetClosingAt | null;
  closingLevel?: BudgetClosingLevel | null;
  checkout?: BudgetCheckoutItem[];
};
