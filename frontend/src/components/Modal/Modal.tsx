"use client";

import { X } from "lucide-react";
import { useEffect, useId, type ReactNode } from "react";

export type ModalRootProps = {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  closeButton?: boolean;
};

function ModalRoot({
  open,
  onClose,
  title,
  actions,
  children,
  closeButton = true,
}: ModalRootProps) {
  const titleId = useId();

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        className="relative z-10 w-full max-w-md rounded-t-sm bg-white p-5 shadow-xl sm:rounded-sm sm:p-6"
      >
        {closeButton ? (
          <button
            type="button"
            aria-label="Fechar modal"
            onClick={onClose}
            className="absolute right-3 top-3 rounded-sm p-1.5 text-kyowa-muted transition hover:bg-kyowa-surface hover:text-kyowa-ink sm:right-4 sm:top-4"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        ) : null}

        {title ? (
          <div className={closeButton ? "pr-8" : undefined}>
            <h2
              id={titleId}
              className="font-serif text-xl text-kyowa-ink"
            >
              {title}
            </h2>
          </div>
        ) : null}

        <div className={title ? "mt-3" : undefined}>{children}</div>

        {actions ? <div className="mt-6 flex justify-end">{actions}</div> : null}
      </div>
    </div>
  );
}

export const Modal = {
  Root: ModalRoot,
};
