"use client";

import { DataTable, TablePagination } from "@/components/Table";
import { adminRoutes } from "@/routes/adminRoutes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { UpdatePricesAdjustmentField } from "./components/UpdatePricesAdjustmentField";
import { UpdatePricesFilters } from "./components/UpdatePricesFilters";
import { UpdatePricesLogic } from "./UpdatePrices.logic";

export function UpdatePricesView() {
  const { data, methods } = UpdatePricesLogic();

  const totalLabel = !data.hasSearched
    ? "Nenhuma busca realizada"
    : data.meta.total === 1
      ? "1 produto encontrado"
      : `${data.meta.total} produtos encontrados`;

  const emptyMessage = !data.hasSearched ? (
    <>
      Preencha os filtros e clique em &quot;Buscar&quot; para listar os
      produtos.
    </>
  ) : data.hasActiveFilters ? (
    <>Nenhum produto encontrado com os filtros aplicados.</>
  ) : (
    <>Nenhum filtro informado. Ajuste os campos e busque novamente.</>
  );

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-kyowa-muted">{totalLabel}</p>
        <Link
          href={adminRoutes.products.href}
          className="inline-flex items-center justify-center gap-2 border border-kyowa-border bg-white px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-kyowa-ink transition hover:bg-kyowa-surface"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          Voltar aos produtos
        </Link>
      </div>

      <UpdatePricesFilters
        key={data.filtersResetKey}
        categories={data.categories}
        onSearch={methods.onSearch}
        isSearching={data.isFetching}
      />

      {data.confirmSuccessMessage ? (
        <p className="mb-4 text-sm text-green-700">{data.confirmSuccessMessage}</p>
      ) : null}
      {data.confirmErrorMessage ? (
        <p className="mb-4 text-sm text-red-600">{data.confirmErrorMessage}</p>
      ) : null}

      {data.isError ? (
        <p className="text-sm text-red-600">
          Não foi possível carregar os produtos. Tente novamente.
        </p>
      ) : data.isLoading ? (
        <p className="text-sm text-kyowa-muted">Carregando produtos…</p>
      ) : (
        <>
          {data.hasSearched ? (
            <UpdatePricesAdjustmentField
              value={data.adjustmentPercent}
              onChange={methods.setAdjustmentPercent}
              onConfirm={methods.onConfirmAdjustment}
              canConfirm={data.canConfirmAdjustment}
              isConfirming={data.isConfirming}
            />
          ) : null}
          <DataTable
            data={data.products}
            columns={data.columns}
            emptyMessage={emptyMessage}
          />
          {data.hasSearched && data.meta.totalPages > 1 ? (
            <TablePagination
              page={data.meta.page}
              totalPages={data.meta.totalPages}
              onPageChange={methods.setPage}
              disabled={data.isFetching}
            />
          ) : null}
        </>
      )}
    </>
  );
}
