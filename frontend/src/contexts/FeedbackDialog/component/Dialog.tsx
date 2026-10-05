"use client";

import { ActionButton } from "@/components/Form/ActionButton";
import { Modal } from "@/components/Modal";
import type { DialogProps, DialogsProps } from "./Dialog.props";

const alertTypeClass: Record<
  NonNullable<DialogProps["alertType"]>,
  string
> = {
  error: "border-red-200 bg-red-50 text-red-800",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  info: "border-sky-200 bg-sky-50 text-sky-900",
};

function FeedbackDialogItem(dialog: DialogProps) {
  return (
    <Modal.Root
      onClose={() => dialog.onClose(dialog.id)}
      closeButton={dialog.showCloseIcon ?? true}
      open={true}
      title={dialog.title}
      actions={
        <ActionButton
          variant="primary"
          onClick={() => dialog.onClose(dialog.id)}
        >
          {dialog.closeText ?? "Fechar"}
        </ActionButton>
      }
    >
      <div className="space-y-3">
        <p className="text-sm text-kyowa-muted">{dialog.message}</p>
        {dialog.alertMessage ? (
          <p
            className={`rounded-sm border px-3 py-2 text-sm ${
              alertTypeClass[dialog.alertType ?? "error"]
            }`}
          >
            {dialog.alertMessage}
          </p>
        ) : null}
      </div>
    </Modal.Root>
  );
}

export default function Dialog({ dialogs }: DialogsProps) {
  return (
    <div data-testid="dialog-container">
      {dialogs.map((dialog) => (
        <FeedbackDialogItem key={dialog.id} {...dialog} />
      ))}
    </div>
  );
}
