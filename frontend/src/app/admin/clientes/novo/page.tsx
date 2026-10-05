"use client";

import { AdminPageShell } from "@/app/(layout)/PageShell";
import { UpsertClientView } from "@/views/Admin/Registers/Clients/UpsertClient";

export default function NovoClientePage() {
  return (
    <AdminPageShell title="Novo cliente">
      <UpsertClientView />
    </AdminPageShell>
  );
}
