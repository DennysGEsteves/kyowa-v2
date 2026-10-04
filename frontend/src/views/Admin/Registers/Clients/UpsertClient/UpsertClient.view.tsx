"use client";

import { useClientsQuery } from "@/api/Clients/clients.query";
import { useEntityFromList } from "@/hooks/useEntityFromList";
import { adminRoutes } from "@/routes/adminRoutes";
import {
  AdminFormLoading,
  AdminFormNotFound,
} from "@/views/Admin/components/AdminFormPage";
import { useParams } from "next/navigation";
import { UpsertClientForm } from "./UpsertClient.form";

export function UpsertClientView() {
  const params = useParams();
  const id = params.id as string | undefined;
  const {
    entity: client,
    isLoading,
    notFound,
  } = useEntityFromList(id, useClientsQuery);

  if (id && isLoading) return <AdminFormLoading />;
  if (notFound) {
    return (
      <AdminFormNotFound
        backHref={adminRoutes.clients.href}
        backLabel="Voltar aos clientes"
        message="Cliente não encontrado."
      />
    );
  }

  return <UpsertClientForm client={client} />;
}
