"use client";

import { AdminPageShell } from "@/layout/PageShell";
import { UpsertStoreView } from "@/views/Admin/Registers/Stores/UpsertStore";

export default function NovaLojaPage() {
  return (
    <AdminPageShell title="Nova loja">
      <UpsertStoreView />
    </AdminPageShell>
  );
}
