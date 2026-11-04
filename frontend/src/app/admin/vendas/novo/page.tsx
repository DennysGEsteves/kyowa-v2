"use client";

import { AdminPageShell } from "@/app/(layout)/PageShell";
import { UpsertSalesView } from "@/views/Admin/Comercial/Sales/UpsertSale";

export default function NovaVendaPage() {
  return (
    <AdminPageShell title="Nova venda">
      <UpsertSalesView />
    </AdminPageShell>
  );
}
