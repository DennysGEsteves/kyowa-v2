import type { CreateBudgetDTO, UpdateBudgetDTO } from "@/api/Budgets";
import type {
  Budget,
  BudgetCheckoutItem,
  BudgetClosingAt,
  BudgetClosingLevel,
  BudgetLostReason,
  BudgetStatus,
} from "@entities";
import { budgetLostReasonLabels, budgetLostReasons } from "@entities";
import { formatCurrencyBRLFromNumber, parseCurrencyBRL } from "@/utils/masks";
import type { BudgetFormSchema } from "./UpsertBudget.schema";

function parseOptionalId(value: string): string | null {
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function parseLostReasonsFromStorage(
  value: string | null,
): BudgetLostReason[] {
  if (!value?.trim()) {
    return [];
  }

  const parts = value.split(",").map((part) => part.trim());
  const byLabel = new Map(
    budgetLostReasons.map((key) => [budgetLostReasonLabels[key], key]),
  );

  return parts.flatMap((part) => {
    const key = byLabel.get(part);
    return key ? [key] : [];
  });
}

function serializeLostReasons(
  status: BudgetStatus,
  reasons: BudgetLostReason[],
): string | null {
  if (status !== "lost" || reasons.length === 0) {
    return null;
  }
  return reasons.map((key) => budgetLostReasonLabels[key]).join(", ");
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
    lostReasons: parseLostReasonsFromStorage(budget.lostReasons),
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
    lostReasons: serializeLostReasons(
      values.status as BudgetStatus,
      values.lostReasons,
    ),
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
    lostReasons: serializeLostReasons(
      values.status as BudgetStatus,
      values.lostReasons,
    ),
    status: values.status as BudgetStatus,
    closingAt: (values.closingAt || null) as BudgetClosingAt | null,
    closingLevel: (values.closingLevel || null) as BudgetClosingLevel | null,
    checkout: values.checkout.map(parseCheckoutItem),
  };
}
