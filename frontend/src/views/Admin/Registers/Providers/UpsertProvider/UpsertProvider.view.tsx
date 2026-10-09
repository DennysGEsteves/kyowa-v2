"use client";

import { useProvidersQuery } from "@/api/Providers/providers.query";
import { useEntityFromList } from "@/hooks/useEntityFromList";
import { routes } from "@routes";
import {
  AdminFormLoading,
  AdminFormNotFound,
} from "@/components/Form";
import { useParams } from "next/navigation";
import { UpsertProviderForm } from "./UpsertProvider.form";

export function UpsertProviderView() {
  const params = useParams();
  const id = params.id as string | undefined;
  const {
    entity: provider,
    isLoading,
    notFound,
  } = useEntityFromList(id, useProvidersQuery);

  if (id && isLoading) return <AdminFormLoading />;
  if (notFound) {
    return (
      <AdminFormNotFound
        backHref={routes.providers.href}
        backLabel="Voltar aos fornecedores"
        message="Fornecedor não encontrado."
      />
    );
  }

  return <UpsertProviderForm provider={provider} />;
}
