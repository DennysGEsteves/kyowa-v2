"use client";

import { AdminPageShell } from "@/layout/PageShell";
import { AdminProductsView } from "@/views/Admin/Products/Products/Products.view";

export default function ProdutosPage() {
  return (
    <AdminPageShell title="Produtos">
      <AdminProductsView />
    </AdminPageShell>
  );
}
