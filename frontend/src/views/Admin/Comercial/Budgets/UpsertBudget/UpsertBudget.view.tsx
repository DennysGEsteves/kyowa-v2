"use client";

import { useBudgetDetailQuery } from "@/api/Budgets/budgets.query";
import { routes } from "@routes";
import {
  AdminFormLoading,
  AdminFormNotFound,
} from "@/components/Form";
import { useParams } from "next/navigation";
import { UpsertBudgetForm } from "./UpsertBudget.form";

export function UpsertBudgetView() {
  const params = useParams();
  const id = params.id as string | undefined;

  const { data: budget, isLoading, isError } = useBudgetDetailQuery(id ?? null, {
    enabled: Boolean(id),
  });

  if (!id) {
    return <UpsertBudgetForm />;
  }

  if (isLoading) {
    return <AdminFormLoading />;
  }

  if (isError || !budget) {
    return (
      <AdminFormNotFound
        backHref={routes.budgets.href}
        backLabel="Voltar aos orçamentos"
        message="Orçamento não encontrado."
      />
    );
  }

  return <UpsertBudgetForm budget={budget} />;
}
