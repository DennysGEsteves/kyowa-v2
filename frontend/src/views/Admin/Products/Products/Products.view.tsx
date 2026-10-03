"use client";

import { DataTable } from "@/components/Table";
import { adminRoutes } from "@/routes/adminRoutes";
import { ListTree, Plus } from "lucide-react";
import Link from "next/link";
import { DeleteProductDialog } from "./components/DeleteProductDialog";
import { ProductsLogic } from "./Products.logic";

export function AdminProductsView() {
  const { data, methods } = ProductsLogic();

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-kyowa-muted">
          {data.products.length}{" "}
          {data.products.length === 1
            ? "produto cadastrado"
            : "produtos cadastrados"}
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            href={adminRoutes.products.descriptors.list}
            className="inline-flex items-center justify-center gap-2 border border-kyowa-border bg-white px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-kyowa-ink transition hover:bg-kyowa-surface"
          >
            <ListTree className="h-4 w-4" strokeWidth={2} />
            Descritores
          </Link>
          <Link
            href={adminRoutes.products.new}
            className="inline-flex items-center justify-center gap-2 bg-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-kyowa-maroon-dark"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            Novo produto
          </Link>
        </div>
      </div>

      <DataTable
        data={data.products}
        columns={data.columns}
        emptyMessage={
          <>
            Nenhum produto cadastrado. Use &quot;Novo produto&quot; para
            adicionar.
          </>
        }
      />

      <DeleteProductDialog
        open={Boolean(data.deleteProduct)}
        product={data.deleteProduct}
        onClose={() => methods.setDeleteProduct(null)}
      />
    </>
  );
}
