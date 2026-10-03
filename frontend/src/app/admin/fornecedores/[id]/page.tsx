"use client";

import { AdminPageShell } from "@/layout/PageShell";
import { UpsertProviderView } from "@/views/Admin/Registers/Providers/UpsertProvider";

export default function EditarFornecedorPage() {
  return (
    <AdminPageShell title="Editar fornecedor">
      <UpsertProviderView />
    </AdminPageShell>
  );
}
