"use client";

import { AdminPageShell } from "@/app/(layout)/PageShell";
import { SealDetailView } from "@/views/Admin/SealLookup/SealDetail/SealDetail.view";
import { useParams } from "next/navigation";

export default function ConsultaLacreDetalhePage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <AdminPageShell title="Consulta de Lacre">
      <SealDetailView sealId={id} />
    </AdminPageShell>
  );
}
