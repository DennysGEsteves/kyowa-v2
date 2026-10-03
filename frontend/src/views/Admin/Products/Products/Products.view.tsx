"use client";

import { DataTable } from "@/components/Table";
import Link from "next/link";
import { ListTree, Plus } from "lucide-react";
import { DeleteProductDialog } from "./components/DeleteProductDialog";
import { UpsertProductModal } from "./components/UpsertProductModal";
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
            href="/admin/produtos/descritores"
            className="inline-flex items-center justify-center gap-2 border border-kyowa-border bg-white px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-kyowa-ink transition hover:bg-kyowa-surface"
          >
            <ListTree className="h-4 w-4" strokeWidth={2} />
            Descritores
          </Link>
          <button
            type="button"
            onClick={methods.openCreate}
            className="inline-flex items-center justify-center gap-2 bg-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-kyowa-maroon-dark"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            Novo produto
          </button>
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

      <UpsertProductModal
        open={data.formOpen}
        product={data.editingProduct}
        onClose={(reload) => {
          methods.setFormOpen(false);
          if (reload) methods.refetchProducts();
        }}
      />

      <DeleteProductDialog
        open={Boolean(data.deleteProduct)}
        product={data.deleteProduct}
        onClose={() => methods.setDeleteProduct(null)}
      />
    </>
  );
}
