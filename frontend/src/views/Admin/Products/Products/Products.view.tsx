"use client";

import { DataTable, TablePagination } from "@/components/Table";
import { routes } from "@routes";
import { CircleDollarSign, ListTree, Plus } from "lucide-react";
import Link from "next/link";
import { DeleteProductDialog } from "./components/DeleteProductDialog";
import { ProductsFilters } from "./components/ProductsFilters";
import { ProductsLogic } from "./Products.logic";

export function AdminProductsView() {
  const { data, methods } = ProductsLogic();

  const totalLabel =
    data.meta.total === 1
      ? "1 produto encontrado"
      : `${data.meta.total} produtos encontrados`;

  const emptyMessage = data.hasActiveFilters ? (
    <>Nenhum produto encontrado com os filtros aplicados.</>
  ) : (
    <>Nenhum produto cadastrado. Use &quot;Novo produto&quot; para adicionar.</>
  );

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-kyowa-muted">{totalLabel}</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            href={routes.products.descriptors.href}
            className="inline-flex items-center justify-center gap-2 border border-kyowa-border bg-white px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-kyowa-ink transition hover:bg-kyowa-surface"
          >
            <ListTree className="h-4 w-4" strokeWidth={2} />
            Descritores
          </Link>
          <Link
            href={routes.products.updatePrices.href}
            className="inline-flex items-center justify-center gap-2 border border-kyowa-border bg-white px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-kyowa-ink transition hover:bg-kyowa-surface"
          >
            <CircleDollarSign className="h-4 w-4" strokeWidth={2} />
            Atualizar Preços
          </Link>
          <Link
            href={routes.products.new}
            className="inline-flex items-center justify-center gap-2 bg-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-kyowa-maroon-dark"
          >
            <Plus className="h-4 w-4" strokeWidth={2} />
            Novo produto
          </Link>
        </div>
      </div>

      <ProductsFilters onChange={methods.onListFiltersChange} />

      {data.isError ? (
        <p className="text-sm text-red-600">
          Não foi possível carregar os produtos. Tente novamente.
        </p>
      ) : data.isLoading ? (
        <p className="text-sm text-kyowa-muted">Carregando produtos…</p>
      ) : (
        <>
          <DataTable
            data={data.products}
            columns={data.columns}
            emptyMessage={emptyMessage}
          />
          <TablePagination
            page={data.meta.page}
            totalPages={data.meta.totalPages}
            onPageChange={methods.setPage}
            disabled={data.isFetching}
          />
        </>
      )}

      <DeleteProductDialog
        open={Boolean(data.deleteProduct)}
        product={data.deleteProduct}
        onClose={() => methods.setDeleteProduct(null)}
      />
    </>
  );
}
