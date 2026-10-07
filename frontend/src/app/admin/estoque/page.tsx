"use client";

import { AdminPageShell } from "@/app/(layout)/PageShell";
import { StockView } from "@/views/Admin/Products/Stock";

export default function EstoquePage() {
  return (
    <AdminPageShell title="Estoque">
      <StockView />
    </AdminPageShell>
  );
}
