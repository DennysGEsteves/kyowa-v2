"use client";

import { AdminPageShell } from "@/app/(layout)/PageShell";
import { SalesView } from "@/views/Admin/Comercial/Sales";

export default function VendasPage() {
  return (
    <AdminPageShell title="Vendas">
      <SalesView />
    </AdminPageShell>
  );
}
