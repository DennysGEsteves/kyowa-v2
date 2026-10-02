"use client";

import { useApi } from "@/api/api.hook";
import { useInvalidateUsersQuery } from "@/api/Users/users.query";
import { ActionButton } from "@/components/ActionButton";
import type { User } from "@entities";
import { useEffect } from "react";

type DeleteUserDialogProps = {
  open: boolean;
  user: User | null;
  onClose: () => void;
};

export function DeleteUserDialog({
  open,
  user,
  onClose,
}: DeleteUserDialogProps) {
  const { usersApi } = useApi();
  const invalidateUsers = useInvalidateUsersQuery();

  const onConfirm = () => {
    usersApi.remove(user!.id).then(() => {
      invalidateUsers();
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

  if (!open || !user) return null;

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
        aria-labelledby="delete-user-title"
        className="relative z-10 w-full max-w-md rounded-t-sm bg-white p-5 shadow-xl sm:rounded-sm sm:p-6"
      >
        <h2
          id="delete-user-title"
          className="font-serif text-xl text-kyowa-ink"
        >
          Remover usuário
        </h2>
        <p className="mt-3 text-sm text-kyowa-muted">
          Tem certeza que deseja remover{" "}
          <span className="font-medium text-kyowa-ink">{user.name}</span>? Esta
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
