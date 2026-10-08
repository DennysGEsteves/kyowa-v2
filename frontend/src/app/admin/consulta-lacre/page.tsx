"use client";

import { AdminPageShell } from "@/app/(layout)/PageShell";
import { SealLookupView } from "@/views/Admin/SealLookup";

export default function ConsultaLacrePage() {
  return (
    <AdminPageShell title="Consulta de Lacre">
      <SealLookupView />
    </AdminPageShell>
  );
}
