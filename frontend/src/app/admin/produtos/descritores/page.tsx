"use client";

import { AdminPageShell } from "@/layout/PageShell";
import { ProductDescriptorsView } from "@/views/Admin/Products/Descriptors/Descriptors.view";

export default function ProdutosDescritoresPage() {
  return (
    <AdminPageShell title="Descritores de produto">
      <ProductDescriptorsView />
    </AdminPageShell>
  );
}
