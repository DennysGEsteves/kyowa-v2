"use client";

import { DataTable } from "@/components/Table";
import { adminRoutes } from "@/routes/adminRoutes";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DeleteUserDialog } from "./components/DeleteUserDialog";
import { UsersLogic } from "./Users.logic";

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
        <Link
          href={adminRoutes.users.new}
          className="inline-flex items-center justify-center gap-2 bg-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-kyowa-maroon-dark"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Novo usuário
        </Link>
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
