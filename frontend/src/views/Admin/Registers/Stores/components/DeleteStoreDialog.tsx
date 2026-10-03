"use client";

import { useApi } from "@/api/api.hook";
import { useInvalidateStoresQuery } from "@/api/Stores/stores.query";
import { ActionButton } from "@/components/Form/ActionButton";
import type { Store } from "@entities";
import { useEffect } from "react";

type DeleteStoreDialogProps = {
  open: boolean;
  store: Store | null;
  onClose: () => void;
};

export function DeleteStoreDialog({
  open,
  store,
  onClose,
}: DeleteStoreDialogProps) {
  const { storesApi } = useApi();
  const invalidateStores = useInvalidateStoresQuery();

  const onConfirm = () => {
    storesApi.remove(store!.id).then(() => {
      invalidateStores();
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

  if (!open || !store) return null;

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
        aria-labelledby="delete-store-title"
        className="relative z-10 w-full max-w-md rounded-t-sm bg-white p-5 shadow-xl sm:rounded-sm sm:p-6"
      >
        <h2
          id="delete-store-title"
          className="font-serif text-xl text-kyowa-ink"
        >
          Remover loja
        </h2>
        <p className="mt-3 text-sm text-kyowa-muted">
          Tem certeza que deseja remover{" "}
          <span className="font-medium text-kyowa-ink">{store.name}</span>? Esta
          ação não pode ser desfeita nesta visualização.
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
