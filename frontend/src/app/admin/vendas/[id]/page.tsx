"use client";

import { AdminPageShell } from "@/app/(layout)/PageShell";
import { UpsertSalesView } from "@/views/Admin/Comercial/Sales/UpsertSale";

export default function EditarVendaPage() {
  return (
    <AdminPageShell title="Editar venda">
      <UpsertSalesView />
    </AdminPageShell>
  );
}
