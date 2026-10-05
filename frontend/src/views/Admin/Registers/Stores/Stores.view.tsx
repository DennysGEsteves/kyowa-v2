"use client";

import { DataTable } from "@/components/Table";
import { adminRoutes } from "@routes";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DeleteStoreDialog } from "./components/DeleteStoreDialog";
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
        <Link
          href={adminRoutes.stores.new}
          className="inline-flex items-center justify-center gap-2 bg-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-kyowa-maroon-dark"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Nova loja
        </Link>
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

      <DeleteStoreDialog
        open={Boolean(data.deleteStore)}
        store={data.deleteStore}
        onClose={() => methods.setDeleteStore(null)}
      />
    </>
  );
}
