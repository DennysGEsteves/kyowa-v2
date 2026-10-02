"use client";

import type { Provider } from "@entities/provider";
import { useEffect } from "react";

type DeleteProviderDialogProps = {
  open: boolean;
  provider: Provider | null;
  onClose: () => void;
  onConfirm: () => void;
};

export function DeleteProviderDialog({
  open,
  provider,
  onClose,
  onConfirm,
}: DeleteProviderDialogProps) {
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

  if (!open || !provider) return null;

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
        aria-labelledby="delete-provider-title"
        className="relative z-10 w-full max-w-md rounded-t-sm bg-white p-5 shadow-xl sm:rounded-sm sm:p-6"
      >
        <h2
          id="delete-provider-title"
          className="font-serif text-xl text-kyowa-ink"
        >
          Remover fornecedor
        </h2>
        <p className="mt-3 text-sm text-kyowa-muted">
          Tem certeza que deseja remover{" "}
          <span className="font-medium text-kyowa-ink">{provider.name}</span>?
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-medium text-kyowa-muted hover:text-kyowa-ink"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-red-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-800"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
}
