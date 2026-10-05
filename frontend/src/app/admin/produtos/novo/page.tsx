"use client";

import { AdminPageShell } from "@/app/(layout)/PageShell";
import { UpsertProductView } from "@/views/Admin/Products/Products/UpsertProduct";

export default function NovoProdutoPage() {
  return (
    <AdminPageShell title="Novo produto">
      <UpsertProductView />
    </AdminPageShell>
  );
}
