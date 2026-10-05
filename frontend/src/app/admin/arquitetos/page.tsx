"use client";

import { AdminPageShell } from "@/app/(layout)/PageShell";
import { RegistersArchitectsView } from "@/views/Admin/Registers/Architects/Architects.view";

export default function ArquitetosPage() {
  return (
    <AdminPageShell title="Arquitetos">
      <RegistersArchitectsView />
    </AdminPageShell>
  );
}
