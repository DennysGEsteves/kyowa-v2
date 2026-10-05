"use client";

import { AdminPageShell } from "@/app/(layout)/PageShell";
import { UpsertUserView } from "@/views/Admin/Registers/Users/UpsertUser";

export default function NovoUsuarioPage() {
  return (
    <AdminPageShell title="Novo usuário">
      <UpsertUserView />
    </AdminPageShell>
  );
}
