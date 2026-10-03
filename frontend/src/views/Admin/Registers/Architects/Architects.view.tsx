"use client";

import { DataTable, TablePagination } from "@/components/Table";
import { adminRoutes } from "@/routes/adminRoutes";
import { ArchitectsFilters } from "./components/ArchitectsFilters";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ArchitectsLogic } from "./Architects.logic";
import { DeleteArchitectDialog } from "./components/DeleteArchitectDialog";

export function RegistersArchitectsView() {
  const { data, methods } = ArchitectsLogic();

  const totalLabel =
    data.meta.total === 1
      ? "1 arquiteto encontrado"
      : `${data.meta.total} arquitetos encontrados`;

  const emptyMessage = data.hasActiveFilters ? (
    <>Nenhum arquiteto encontrado com os filtros aplicados.</>
  ) : (
    <>
      Nenhum arquiteto cadastrado. Use &quot;Novo arquiteto&quot; para adicionar.
    </>
  );

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-kyowa-muted">{totalLabel}</p>
        <Link
          href={adminRoutes.architects.new}
          className="inline-flex items-center justify-center gap-2 bg-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-kyowa-maroon-dark"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Novo arquiteto
        </Link>
      </div>

      <ArchitectsFilters onChange={methods.onListFiltersChange} />

      {data.isError ? (
        <p className="text-sm text-red-600">
          Não foi possível carregar os arquitetos. Tente novamente.
        </p>
      ) : data.isLoading ? (
        <p className="text-sm text-kyowa-muted">Carregando arquitetos…</p>
      ) : (
        <>
          <DataTable
            data={data.architects}
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

      <DeleteArchitectDialog
        open={Boolean(data.deleteArchitect)}
        architect={data.deleteArchitect}
        onClose={() => methods.setDeleteArchitect(null)}
      />
    </>
  );
}
