"use client";

import { AdminPageShell } from "@/layout/PageShell";
import { UpsertClientView } from "@/views/Admin/Registers/Clients/UpsertClient";

export default function EditarClientePage() {
  return (
    <AdminPageShell title="Editar cliente">
      <UpsertClientView />
    </AdminPageShell>
  );
}
