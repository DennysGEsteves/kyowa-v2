"use client";

import { DeleteUserDialog } from "./components/DeleteUserDialog";
import { UpsertUserModal } from "./components/UpsertUserModal";
import { Plus } from "lucide-react";
import { UsersLogic } from "./Users.logic";
import { DataTable } from "@/components/Table";

export function RegistersUsersView() {
  const { data, methods } = UsersLogic();

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-kyowa-muted">
          {data.users.length}{" "}
          {data.users.length === 1
            ? "usuário cadastrado"
            : "usuários cadastrados"}
        </p>
        <button
          type="button"
          onClick={methods.openCreate}
          className="inline-flex items-center justify-center gap-2 bg-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-kyowa-maroon-dark"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Novo usuário
        </button>
      </div>

      <DataTable
        data={data.users}
        columns={data.columns}
        emptyMessage={
          <>
            Nenhum usuário cadastrado. Use &quot;Novo usuário&quot; para
            adicionar.
          </>
        }
      />

      <UpsertUserModal
        open={data.formOpen}
        user={data.editingUser}
        onClose={(reload) => {
          methods.setFormOpen(false);
          if (reload) methods.refetchUsers();
        }}
      />

      <DeleteUserDialog
        open={Boolean(data.deleteUser)}
        user={data.deleteUser}
        onClose={(reload?: boolean) => {
          methods.setDeleteUser(null);
          if (reload) methods.refetchUsers();
        }}
      />
    </>
  );
}
