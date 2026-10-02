"use client";

import { AdminPageShell } from "@/layout/admin-page-shell";
import { RegistersStoresView } from "@/views/Admin/Registers/Stores/Stores.view";

export default function NossasLojasPage() {
  return (
    <AdminPageShell title="Nossas Lojas">
      <RegistersStoresView />
    </AdminPageShell>
  );
}
