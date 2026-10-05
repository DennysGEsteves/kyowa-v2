"use client";

import { DataTable, TablePagination } from "@/components/Table";
import { adminRoutes } from "@routes";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DeleteProviderDialog } from "./components/DeleteProviderDialog";
import { ProvidersFilters } from "./components/ProvidersFilters";
import { ProvidersLogic } from "./Providers.logic";

export function RegistersProvidersView() {
  const { data, methods } = ProvidersLogic();

  const totalLabel =
    data.meta.total === 1
      ? "1 fornecedor encontrado"
      : `${data.meta.total} fornecedores encontrados`;

  const emptyMessage = data.hasActiveFilters ? (
    <>Nenhum fornecedor encontrado com os filtros aplicados.</>
  ) : (
    <>
      Nenhum fornecedor cadastrado. Use &quot;Novo fornecedor&quot; para
      adicionar.
    </>
  );

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-kyowa-muted">{totalLabel}</p>
        <Link
          href={adminRoutes.providers.new}
          className="inline-flex items-center justify-center gap-2 bg-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-kyowa-maroon-dark"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Novo fornecedor
        </Link>
      </div>

      <ProvidersFilters onChange={methods.onListFiltersChange} />

      {data.isError ? (
        <p className="text-sm text-red-600">
          Não foi possível carregar os fornecedores. Tente novamente.
        </p>
      ) : data.isLoading ? (
        <p className="text-sm text-kyowa-muted">Carregando fornecedores…</p>
      ) : (
        <>
          <DataTable
            data={data.providers}
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

      <DeleteProviderDialog
        open={Boolean(data.deleteProvider)}
        provider={data.deleteProvider}
        onClose={() => methods.setDeleteProvider(null)}
      />
    </>
  );
}
