"use client";

import { AdminPageShell } from "@/layout/PageShell";
import { RegistersClientsView } from "@/views/Admin/Registers/Clients/Clients.view";

export default function ClientesPage() {
  return (
    <AdminPageShell title="Clientes">
      <RegistersClientsView />
    </AdminPageShell>
  );
}
