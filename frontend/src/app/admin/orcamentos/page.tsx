"use client";

import { AdminPageShell } from "@/app/(layout)/PageShell";
import { BudgetsView } from "@/views/Admin/Comercial/Budgets";

export default function OrcamentosPage() {
  return (
    <AdminPageShell title="Orçamentos">
      <BudgetsView />
    </AdminPageShell>
  );
}
