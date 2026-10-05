"use client";

import { AdminPageShell } from "@/app/(layout)/PageShell";
import { UpsertArchitectView } from "@/views/Admin/Registers/Architects/UpsertArchitect";

export default function EditarArquitetoPage() {
  return (
    <AdminPageShell title="Editar arquiteto">
      <UpsertArchitectView />
    </AdminPageShell>
  );
}
