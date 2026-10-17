"use client";

import { Client, User } from "@/@types/entities";
import { useBudgetDetailQuery } from "@/api/Budgets/budgets.query";
import { useUsersQuery } from "@/api/Users/users.query";
import { Receipt, openReceiptWindow } from "@/components/Receipt";
import { useClientStoreArchitectLookups } from "@/hooks/useClientStoreArchitectLookups";
import { buildReceiptNumber } from "@/utils/receipt";
import { routes } from "@routes";

type BudgetReceiptProps = {
  budgetId: string;
};

export function BudgetReceipt({ budgetId }: BudgetReceiptProps) {
  const { data: budget } = useBudgetDetailQuery(budgetId);

  const { clients } = useClientStoreArchitectLookups();
  const { data: users = [] } = useUsersQuery();

  const client = clients.find((c: Client) => c.id === budget?.clientId) ?? null;
  const user = users.find((u: User) => u.id === budget?.userId) ?? null;

  if (!budget || !client || !user) {
    return null;
  }

  const receiptNumber =
    budget.sequentialId != null
      ? buildReceiptNumber(budget.createdAt, budget.sequentialId)
      : "—";

  return (
    <Receipt
      client={client}
      seller={user}
      obs={budget.obs ?? ""}
      nature="budget"
      receiptNumber={receiptNumber}
      checkout={budget.checkout}
      showTerms={true}
    />
  );
}

export function openBudgetReceipt(budgetId: string) {
  openReceiptWindow(routes.budgets.receipt(budgetId));
}
