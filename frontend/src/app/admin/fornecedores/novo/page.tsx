"use client";

import { AdminPageShell } from "@/app/(layout)/PageShell";
import { UpsertProviderView } from "@/views/Admin/Registers/Providers/UpsertProvider";

export default function NovoFornecedorPage() {
  return (
    <AdminPageShell title="Novo fornecedor">
      <UpsertProviderView />
    </AdminPageShell>
  );
}
