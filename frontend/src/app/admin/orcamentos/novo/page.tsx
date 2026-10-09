"use client";

import { AdminPageShell } from "@/app/(layout)/PageShell";
import { UpsertBudgetView } from "@/views/Admin/Comercial/Budgets/UpsertBudget";

export default function NovoOrcamentoPage() {
  return (
    <AdminPageShell title="Novo orçamento">
      <UpsertBudgetView />
    </AdminPageShell>
  );
}
