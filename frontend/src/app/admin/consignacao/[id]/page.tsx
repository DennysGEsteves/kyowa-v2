"use client";

import { AdminPageShell } from "@/app/(layout)/PageShell";
import { UpsertConsignmentView } from "@/views/Admin/Comercial/Consignment/UpsertConsignment";

export default function EditarConsignacaoPage() {
  return (
    <AdminPageShell title="Editar consignação">
      <UpsertConsignmentView />
    </AdminPageShell>
  );
}
