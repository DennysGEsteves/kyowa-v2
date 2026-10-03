"use client";

import { DataTable } from "@/components/Table";
import { Plus } from "lucide-react";
import { ClientsLogic } from "./Clients.logic";
import { DeleteClientDialog } from "./components/DeleteClientDialog";
import { UpsertClientModal } from "./components/UpsertClientModal";

export function RegistersClientsView() {
  const { data, methods } = ClientsLogic();

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-kyowa-muted">
          {data.clients.length}{" "}
          {data.clients.length === 1
            ? "cliente cadastrado"
            : "clientes cadastrados"}
        </p>
        <button
          type="button"
          onClick={methods.openCreate}
          className="inline-flex items-center justify-center gap-2 bg-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-kyowa-maroon-dark"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Novo cliente
        </button>
      </div>

      <DataTable
        data={data.clients}
        columns={data.columns}
        emptyMessage={
          <>
            Nenhum cliente cadastrado. Use &quot;Novo cliente&quot; para
            adicionar.
          </>
        }
      />

      <UpsertClientModal
        open={data.formOpen}
        client={data.editingClient}
        onClose={(reload) => {
          methods.setFormOpen(false);
          if (reload) methods.refetchClients();
        }}
      />

      <DeleteClientDialog
        open={Boolean(data.deleteClient)}
        client={data.deleteClient}
        onClose={() => methods.setDeleteClient(null)}
      />
    </>
  );
}
