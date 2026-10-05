"use client";

import { AdminPageShell } from "@/app/(layout)/PageShell";
import { RegistersUsersView } from "@/views/Admin/Registers/Users/Users.view";

export default function UsuariosPage() {
  return (
    <AdminPageShell title="Usuários">
      <RegistersUsersView />
    </AdminPageShell>
  );
}
