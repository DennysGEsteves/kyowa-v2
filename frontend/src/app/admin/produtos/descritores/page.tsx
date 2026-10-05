"use client";

import { AdminPageShell } from "@/app/(layout)/PageShell";
import { ProductDescriptorsView } from "@/views/Admin/Products/Products/Descriptors/Descriptors.view";

export default function ProdutosDescritoresPage() {
  return (
    <AdminPageShell title="Descritores de produto">
      <ProductDescriptorsView />
    </AdminPageShell>
  );
}
