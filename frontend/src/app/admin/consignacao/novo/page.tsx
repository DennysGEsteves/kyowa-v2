"use client";

import { AdminPageShell } from "@/app/(layout)/PageShell";
import { UpsertConsignmentView } from "@/views/Admin/Comercial/Consignment/UpsertConsignment";

export default function NovaConsignacaoPage() {
  return (
    <AdminPageShell title="Nova consignação">
      <UpsertConsignmentView />
    </AdminPageShell>
  );
}
