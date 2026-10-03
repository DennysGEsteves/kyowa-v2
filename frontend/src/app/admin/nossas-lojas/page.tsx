"use client";

import { AdminPageShell } from "@/layout/PageShell";
import { RegistersStoresView } from "@/views/Admin/Registers/Stores/Stores.view";

export default function NossasLojasPage() {
  return (
    <AdminPageShell title="Nossas Lojas">
      <RegistersStoresView />
    </AdminPageShell>
  );
}
