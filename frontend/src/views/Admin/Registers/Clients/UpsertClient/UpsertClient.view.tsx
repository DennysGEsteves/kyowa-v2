"use client";

import { useClientsQuery } from "@/api/Clients/clients.query";
import { useEntityFromList } from "@/hooks/useEntityFromList";
import { routes } from "@routes";
import {
  AdminFormLoading,
  AdminFormNotFound,
} from "@/components/Form";
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
        backHref={routes.clients.href}
        backLabel="Voltar aos clientes"
        message="Cliente não encontrado."
      />
    );
  }

  return <UpsertClientForm client={client} />;
}
