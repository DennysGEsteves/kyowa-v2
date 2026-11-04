"use client";

import { AdminPageShell } from "@/app/(layout)/PageShell";
import { ConsignmentView } from "@/views/Admin/Comercial/Consignment";

export default function ConsignacaoPage() {
  return (
    <AdminPageShell title="Consignação">
      <ConsignmentView />
    </AdminPageShell>
  );
}
