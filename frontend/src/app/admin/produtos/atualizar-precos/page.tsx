"use client";

import { AdminPageShell } from "@/layout/PageShell";
import { UpdatePricesView } from "@/views/Admin/Products/Products/UpdatePrices";

export default function AtualizarPrecosPage() {
  return (
    <AdminPageShell title="Atualizar Preços">
      <UpdatePricesView />
    </AdminPageShell>
  );
}
