"use client";

import { DataTable } from "@/components/Table";
import { Plus } from "lucide-react";
import { DeleteProviderDialog } from "./components/DeleteProviderDialog";
import { UpsertProviderModal } from "./components/UpsertProviderModal";
import { ProvidersLogic } from "./Providers.logic";

export function RegistersProvidersView() {
  const { data, methods } = ProvidersLogic();

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-kyowa-muted">
          {data.providers.length}{" "}
          {data.providers.length === 1
            ? "fornecedor cadastrado"
            : "fornecedores cadastrados"}
        </p>
        <button
          type="button"
          onClick={methods.openCreate}
          className="inline-flex items-center justify-center gap-2 bg-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-kyowa-maroon-dark"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Novo fornecedor
        </button>
      </div>

      <DataTable
        data={data.providers}
        columns={data.columns}
        emptyMessage={
          <>
            Nenhum fornecedor cadastrado. Use &quot;Novo fornecedor&quot; para
            adicionar.
          </>
        }
      />

      <UpsertProviderModal
        open={data.formOpen}
        provider={data.editingProvider}
        onClose={(reload) => {
          methods.setFormOpen(false);
          if (reload) methods.refetchProviders();
        }}
      />

      <DeleteProviderDialog
        open={Boolean(data.deleteProvider)}
        provider={data.deleteProvider}
        onClose={() => methods.setDeleteProvider(null)}
      />
    </>
  );
}
