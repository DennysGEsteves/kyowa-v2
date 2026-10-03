"use client";

import { useProductLookupQuery } from "@/api/ProductLookups/product-lookups.query";
import type { ProductLookupTab } from "@/api/ProductLookups";
import { ActionButton } from "@/components/Form/ActionButton";
import { DataTable, type TableColumn } from "@/components/Table";
import type { ProductLookup } from "@entities";
import { Pencil, Plus, Trash } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { DeleteLookupDialog } from "./DeleteLookupDialog";
import { UpsertLookupModal } from "./UpsertLookupModal";

type LookupTabPanelProps = {
  tab: ProductLookupTab;
};

export function LookupTabPanel({ tab }: LookupTabPanelProps) {
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProductLookup | undefined>();
  const [deleteItem, setDeleteItem] = useState<ProductLookup | null>(null);

  const { data: items = [], refetch } = useProductLookupQuery(tab.slug);

  const openCreate = useCallback(() => {
    setEditingItem(undefined);
    setFormOpen(true);
  }, []);

  const openEdit = useCallback((item: ProductLookup) => {
    setEditingItem(item);
    setFormOpen(true);
  }, []);

  const columns = useMemo((): TableColumn<ProductLookup>[] => {
    return [
      {
        id: "name",
        header: "Nome",
        accessorKey: "name",
        className: "font-medium",
        mobile: { role: "title" },
      },
      {
        id: "actions",
        header: "Ações",
        align: "right",
        mobile: { role: "actions" },
        render: (item) => (
          <div className="flex items-center justify-end gap-1">
            <ActionButton
              variant="ghost"
              className="p-2"
              onClick={() => openEdit(item)}
              aria-label={`Editar ${item.name}`}
            >
              <Pencil className="h-4 w-4 text-kyowa-gold" strokeWidth={1.75} />
            </ActionButton>
            <ActionButton
              variant="ghost"
              className="p-2"
              onClick={() => setDeleteItem(item)}
              aria-label={`Remover ${item.name}`}
            >
              <Trash className="h-4 w-4 text-red-700" strokeWidth={1.75} />
            </ActionButton>
          </div>
        ),
      },
    ];
  }, [openEdit]);

  const newLabel =
    tab.slug === "categories"
      ? "Nova categoria"
      : `Nova ${tab.singular}`;

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-kyowa-muted">
          {items.length}{" "}
          {items.length === 1 ? "registro" : "registros"} em{" "}
          {tab.label.toLowerCase()}
        </p>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 bg-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-kyowa-maroon-dark"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          {newLabel}
        </button>
      </div>

      <DataTable
        data={items}
        columns={columns}
        emptyMessage={
          <>
            Nenhum registro em {tab.label.toLowerCase()}. Use &quot;{newLabel}
            &quot; para adicionar.
          </>
        }
      />

      <UpsertLookupModal
        open={formOpen}
        tab={tab}
        item={editingItem}
        onClose={(reload) => {
          setFormOpen(false);
          if (reload) refetch();
        }}
      />

      <DeleteLookupDialog
        open={Boolean(deleteItem)}
        tab={tab}
        item={deleteItem}
        onClose={() => setDeleteItem(null)}
      />
    </>
  );
}
