"use client";

import { AdminPageShell } from "@/layout/admin-page-shell";
import { ProvidersPanel } from "@/components/admin/providers-panel";

export default function FornecedoresPage() {
  return (
    <AdminPageShell title="Fornecedores">
      <ProvidersPanel />
    </AdminPageShell>
  );
}
