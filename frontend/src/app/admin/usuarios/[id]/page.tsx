"use client";

import { AdminPageShell } from "@/app/(layout)/PageShell";
import { UpsertUserView } from "@/views/Admin/Registers/Users/UpsertUser";

export default function EditarUsuarioPage() {
  return (
    <AdminPageShell title="Editar usuário">
      <UpsertUserView />
    </AdminPageShell>
  );
}
