import type { CreateBudgetDTO, UpdateBudgetDTO } from "@/api/Budgets";
import type {
  Budget,
  BudgetCheckoutItem,
  BudgetClosingAt,
  BudgetClosingLevel,
  BudgetStatus,
} from "@entities";
import { formatCurrencyBRLFromNumber, parseCurrencyBRL } from "@/utils/masks";
import type { BudgetFormSchema } from "./UpsertBudget.schema";

function parseOptionalId(value: string): string | null {
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function parseCheckoutItem(
  item: BudgetFormSchema["checkout"][number],
): BudgetCheckoutItem {
  const price = parseCurrencyBRL(item.price);
  return {
    quantity: Number(item.quantity),
    categoryId: item.categoryId,
    price: price ?? 0,
    description: item.description.trim(),
  };
}

export function budgetToFormValues(budget: Budget): BudgetFormSchema {
  return {
    storeId: budget.storeId,
    clientId: budget.clientId ?? "",
    architectId: budget.architectId ?? "",
    obs: budget.obs ?? "",
    lostReasons: budget.lostReasons ?? "",
    status: budget.status,
    closingAt: budget.closingAt ?? "",
    closingLevel: budget.closingLevel ?? "",
    checkout: budget.checkout.map((item) => ({
      quantity: String(item.quantity),
      categoryId: item.categoryId,
      price: formatCurrencyBRLFromNumber(item.price),
      description: item.description,
    })),
  };
}

export function formValuesToCreateBudgetDTO(
  values: BudgetFormSchema,
  userId: string,
): CreateBudgetDTO {
  return {
    userId,
    storeId: values.storeId,
    clientId: parseOptionalId(values.clientId),
    architectId: parseOptionalId(values.architectId),
    obs: values.obs.trim() || null,
    lostReasons: values.lostReasons.trim() || null,
    status: values.status as BudgetStatus,
    closingAt: (values.closingAt || null) as BudgetClosingAt | null,
    closingLevel: (values.closingLevel || null) as BudgetClosingLevel | null,
    checkout: values.checkout.map(parseCheckoutItem),
  };
}

export function formValuesToUpdateBudgetDTO(
  values: BudgetFormSchema,
): UpdateBudgetDTO {
  return {
    storeId: values.storeId,
    clientId: parseOptionalId(values.clientId),
    architectId: parseOptionalId(values.architectId),
    obs: values.obs.trim() || null,
    lostReasons: values.lostReasons.trim() || null,
    status: values.status as BudgetStatus,
    closingAt: (values.closingAt || null) as BudgetClosingAt | null,
    closingLevel: (values.closingLevel || null) as BudgetClosingLevel | null,
    checkout: values.checkout.map(parseCheckoutItem),
  };
}
