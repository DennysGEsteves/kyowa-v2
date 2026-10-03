"use client";

import { AdminPageShell } from "@/layout/PageShell";
import { UpsertStoreView } from "@/views/Admin/Registers/Stores/UpsertStore";

export default function EditarLojaPage() {
  return (
    <AdminPageShell title="Editar loja">
      <UpsertStoreView />
    </AdminPageShell>
  );
}
