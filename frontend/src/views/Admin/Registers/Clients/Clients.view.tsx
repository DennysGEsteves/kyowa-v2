"use client";

import { DataTable, TablePagination } from "@/components/Table";
import { routes } from "@routes";
import { ClientsFilters } from "./components/ClientsFilters";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ClientsLogic } from "./Clients.logic";
import { DeleteClientDialog } from "./components/DeleteClientDialog";

export function RegistersClientsView() {
  const { data, methods } = ClientsLogic();

  const totalLabel =
    data.meta.total === 1
      ? "1 cliente encontrado"
      : `${data.meta.total} clientes encontrados`;

  const emptyMessage = data.hasActiveFilters ? (
    <>Nenhum cliente encontrado com os filtros aplicados.</>
  ) : (
    <>Nenhum cliente cadastrado. Use &quot;Novo cliente&quot; para adicionar.</>
  );

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-kyowa-muted">{totalLabel}</p>
        <Link
          href={routes.clients.new}
          className="inline-flex items-center justify-center gap-2 bg-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-kyowa-maroon-dark"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Novo cliente
        </Link>
      </div>

      <ClientsFilters onChange={methods.onListFiltersChange} />

      {data.isError ? (
        <p className="text-sm text-red-600">
          Não foi possível carregar os clientes. Tente novamente.
        </p>
      ) : data.isLoading ? (
        <p className="text-sm text-kyowa-muted">Carregando clientes…</p>
      ) : (
        <>
          <DataTable
            data={data.clients}
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

      <DeleteClientDialog
        open={Boolean(data.deleteClient)}
        client={data.deleteClient}
        onClose={() => methods.setDeleteClient(null)}
      />
    </>
  );
}
