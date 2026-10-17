"use client";

import { DataTable, TablePagination } from "@/components/Table";
import { routes } from "@routes";
import { Plus } from "lucide-react";
import Link from "next/link";
import { BudgetsFilters } from "./components/BudgetsFilters";
import { BudgetsLogic } from "./Budgets.logic";

export function BudgetsView() {
  const { data, methods } = BudgetsLogic();

  const totalLabel =
    data.meta.total === 1
      ? "1 orçamento encontrado"
      : `${data.meta.total} orçamentos encontrados`;

  const emptyMessage = data.hasActiveFilters ? (
    <>Nenhum orçamento encontrado com os filtros aplicados.</>
  ) : (
    <>
      Nenhum orçamento cadastrado. Use &quot;Novo orçamento&quot; para
      adicionar.
    </>
  );

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-end">
        <Link
          href={routes.budgets.new}
          className="inline-flex items-center justify-center gap-2 bg-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-kyowa-maroon-dark"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Novo orçamento
        </Link>
      </div>

      <BudgetsFilters onChange={methods.onListFiltersChange} />

      {data.isError ? (
        <p className="text-sm text-red-600">
          Não foi possível carregar os orçamentos. Tente novamente.
        </p>
      ) : data.isLoading ? (
        <p className="text-sm text-kyowa-muted">Carregando orçamentos…</p>
      ) : (
        <section aria-label="Lista de orçamentos">
          <p className="mb-3 text-sm font-medium text-kyowa-ink">
            {totalLabel}
          </p>
          <DataTable
            data={data.budgets}
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
