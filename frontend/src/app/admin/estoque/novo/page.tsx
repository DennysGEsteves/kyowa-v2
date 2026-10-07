"use client";

import { AdminPageShell } from "@/app/(layout)/PageShell";
import { UpsertStockView } from "@/views/Admin/Products/Stock";

export default function NovoEstoquePage() {
  return (
    <AdminPageShell title="Novo lançamento de estoque">
      <UpsertStockView />
    </AdminPageShell>
  );
}
