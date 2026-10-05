"use client";

import { AdminPageShell } from "@/app/(layout)/PageShell";
import { RegistersProvidersView } from "@/views/Admin/Registers/Providers/Providers.view";

export default function FornecedoresPage() {
  return (
    <AdminPageShell title="Fornecedores">
      <RegistersProvidersView />
    </AdminPageShell>
  );
}
