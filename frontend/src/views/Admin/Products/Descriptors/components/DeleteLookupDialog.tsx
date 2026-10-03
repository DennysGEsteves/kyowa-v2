"use client";

import { useApi } from "@/api/api.hook";
import type { ProductLookupTab } from "@/api/ProductLookups";
import { useInvalidateProductLookupQuery } from "@/api/ProductLookups/product-lookups.query";
import { ActionButton } from "@/components/Form/ActionButton";
import type { ProductLookup } from "@entities";
import { useEffect } from "react";

type DeleteLookupDialogProps = {
  open: boolean;
  tab: ProductLookupTab;
  item: ProductLookup | null;
  onClose: () => void;
};

export function DeleteLookupDialog({
  open,
  tab,
  item,
  onClose,
}: DeleteLookupDialogProps) {
  const { productLookupsApi } = useApi();
  const invalidate = useInvalidateProductLookupQuery(tab.slug);

  const onConfirm = () => {
    productLookupsApi.remove(tab.slug, item!.id).then(() => {
      invalidate();
      onClose();
    });
  };

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-lookup-title"
        className="relative z-10 w-full max-w-md rounded-t-sm bg-white p-5 shadow-xl sm:rounded-sm sm:p-6"
      >
        <h2
          id="delete-lookup-title"
          className="font-serif text-xl text-kyowa-ink"
        >
          Remover {tab.singular}
        </h2>
        <p className="mt-3 text-sm text-kyowa-muted">
          Tem certeza que deseja remover{" "}
          <span className="font-medium text-kyowa-ink">{item.name}</span>?
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <ActionButton variant="ghost" onClick={onClose}>
            Cancelar
          </ActionButton>
          <ActionButton variant="danger" onClick={onConfirm}>
            Remover
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
