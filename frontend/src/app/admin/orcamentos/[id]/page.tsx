"use client";

import { AdminPageShell } from "@/app/(layout)/PageShell";
import { UpsertBudgetView } from "@/views/Admin/Comercial/Budgets/UpsertBudget";

export default function EditarOrcamentoPage() {
  return (
    <AdminPageShell title="Editar orçamento">
      <UpsertBudgetView />
    </AdminPageShell>
  );
}
