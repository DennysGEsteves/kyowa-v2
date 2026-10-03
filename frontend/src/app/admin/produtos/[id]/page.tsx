"use client";

import { AdminPageShell } from "@/layout/PageShell";
import { UpsertProductView } from "@/views/Admin/Products/Products/UpsertProduct";

export default function EditarProdutoPage() {
  return (
    <AdminPageShell title="Editar produto">
      <UpsertProductView />
    </AdminPageShell>
  );
}
