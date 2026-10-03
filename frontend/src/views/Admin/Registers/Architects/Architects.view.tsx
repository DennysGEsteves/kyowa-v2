"use client";

import { DataTable } from "@/components/Table";
import { Plus } from "lucide-react";
import { ArchitectsLogic } from "./Architects.logic";
import { DeleteArchitectDialog } from "./components/DeleteArchitectDialog";
import { UpsertArchitectModal } from "./components/UpsertArchitectModal";

export function RegistersArchitectsView() {
  const { data, methods } = ArchitectsLogic();

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-kyowa-muted">
          {data.architects.length}{" "}
          {data.architects.length === 1
            ? "arquiteto cadastrado"
            : "arquitetos cadastrados"}
        </p>
        <button
          type="button"
          onClick={methods.openCreate}
          className="inline-flex items-center justify-center gap-2 bg-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-kyowa-maroon-dark"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Novo arquiteto
        </button>
      </div>

      <DataTable
        data={data.architects}
        columns={data.columns}
        emptyMessage={
          <>
            Nenhum arquiteto cadastrado. Use &quot;Novo arquiteto&quot; para
            adicionar.
          </>
        }
      />

      <UpsertArchitectModal
        open={data.formOpen}
        architect={data.editingArchitect}
        onClose={(reload) => {
          methods.setFormOpen(false);
          if (reload) methods.refetchArchitects();
        }}
      />

      <DeleteArchitectDialog
        open={Boolean(data.deleteArchitect)}
        architect={data.deleteArchitect}
        onClose={() => methods.setDeleteArchitect(null)}
      />
    </>
  );
}
