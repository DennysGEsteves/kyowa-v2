"use client";

import { DataTable, TablePagination } from "@/components/Table";
import { routes } from "@routes";
import { Plus } from "lucide-react";
import Link from "next/link";
import { SalesFilters } from "./components/SalesFilters";
import { SalesLogic } from "./Sales.logic";

export function SalesView() {
  const { data, methods } = SalesLogic();

  const totalLabel =
    data.meta.total === 1
      ? "1 venda encontrada"
      : `${data.meta.total} vendas encontradas`;

  const emptyMessage = data.hasActiveFilters ? (
    <>Nenhuma venda encontrada com os filtros aplicados.</>
  ) : (
    <>
      Nenhuma venda cadastrada. Use &quot;Nova venda&quot; para adicionar.
    </>
  );

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-end">
        <Link
          href={routes.sales.new}
          className="inline-flex items-center justify-center gap-2 bg-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-kyowa-maroon-dark"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Nova venda
        </Link>
      </div>

      <SalesFilters onChange={methods.onListFiltersChange} />

      {data.isError ? (
        <p className="text-sm text-red-600">
          Não foi possível carregar as vendas. Tente novamente.
        </p>
      ) : data.isLoading ? (
        <p className="text-sm text-kyowa-muted">Carregando vendas…</p>
      ) : (
        <section aria-label="Lista de vendas">
          <p className="mb-3 text-sm font-medium text-kyowa-ink">
            {totalLabel}
          </p>
          <DataTable
            data={data.sales}
            columns={data.columns}
            emptyMessage={emptyMessage}
          />
          <TablePagination
            page={data.meta.page}
            totalPages={data.meta.totalPages}
            onPageChange={methods.setPage}
            disabled={data.isFetching}
          />
        </section>
      )}
    </>
  );
}
