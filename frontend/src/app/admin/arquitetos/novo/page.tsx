"use client";

import { AdminPageShell } from "@/layout/PageShell";
import { UpsertArchitectView } from "@/views/Admin/Registers/Architects/UpsertArchitect";

export default function NovoArquitetoPage() {
  return (
    <AdminPageShell title="Novo arquiteto">
      <UpsertArchitectView />
    </AdminPageShell>
  );
}
