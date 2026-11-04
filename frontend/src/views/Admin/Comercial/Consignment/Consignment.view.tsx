"use client";

import { DataTable, TablePagination } from "@/components/Table";
import { routes } from "@routes";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ConsignmentFilters } from "./components/ConsignmentFilters";
import { ConsignmentLogic } from "./Consignment.logic";

export function ConsignmentView() {
  const { data, methods } = ConsignmentLogic();

  const totalLabel =
    data.meta.total === 1
      ? "1 consignação encontrada"
      : `${data.meta.total} consignações encontradas`;

  const emptyMessage = data.hasActiveFilters ? (
    <>Nenhuma consignação encontrada com os filtros aplicados.</>
  ) : (
    <>
      Nenhuma consignação cadastrada. Use &quot;Nova consignação&quot; para
      adicionar.
    </>
  );

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-end">
        <Link
          href={routes.consignment.new}
          className="inline-flex items-center justify-center gap-2 bg-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-kyowa-maroon-dark"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Nova consignação
        </Link>
      </div>

      <ConsignmentFilters onChange={methods.onListFiltersChange} />

      {data.isError ? (
        <p className="text-sm text-red-600">
          Não foi possível carregar as consignações. Tente novamente.
        </p>
      ) : data.isLoading ? (
        <p className="text-sm text-kyowa-muted">Carregando consignações…</p>
      ) : (
        <section aria-label="Lista de consignações">
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
