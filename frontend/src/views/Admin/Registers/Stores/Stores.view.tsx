"use client";

import { DataTable } from "@/components/Table";
import { Plus } from "lucide-react";
import { DeleteStoreDialog } from "./components/DeleteStoreDialog";
import { UpsertStoreModal } from "./components/UpsertStoreModal";
import { StoresLogic } from "./Stores.logic";

export function RegistersStoresView() {
  const { data, methods } = StoresLogic();

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-kyowa-muted">
          {data.stores.length}{" "}
          {data.stores.length === 1 ? "loja cadastrada" : "lojas cadastradas"}
        </p>
        <button
          type="button"
          onClick={methods.openCreate}
          className="inline-flex items-center justify-center gap-2 bg-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-kyowa-maroon-dark"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Nova loja
        </button>
      </div>

      <DataTable
        data={data.stores}
        columns={data.columns}
        emptyMessage={
          <>
            Nenhuma loja cadastrada. Use &quot;Nova loja&quot; para adicionar.
          </>
        }
      />

      <UpsertStoreModal
        open={data.formOpen}
        store={data.editingStore}
        onClose={(reload) => {
          methods.setFormOpen(false);
          if (reload) methods.refetchStores();
        }}
      />

      <DeleteStoreDialog
        open={Boolean(data.deleteStore)}
        store={data.deleteStore}
        onClose={() => methods.setDeleteStore(null)}
      />
    </>
  );
}
