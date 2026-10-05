"use client";

import { useStoresQuery } from "@/api/Stores/stores.query";
import { useEntityFromList } from "@/hooks/useEntityFromList";
import { routes } from "@routes";
import {
  AdminFormLoading,
  AdminFormNotFound,
} from "@/views/Admin/components/AdminFormPage";
import { useParams } from "next/navigation";
import { UpsertStoreForm } from "./UpsertStore.form";

export function UpsertStoreView() {
  const params = useParams();
  const id = params.id as string | undefined;
  const {
    entity: store,
    isLoading,
    notFound,
  } = useEntityFromList(id, useStoresQuery);

  if (id && isLoading) return <AdminFormLoading />;
  if (notFound) {
    return (
      <AdminFormNotFound
        backHref={routes.stores.href}
        backLabel="Voltar às lojas"
        message="Loja não encontrada."
      />
    );
  }

  return <UpsertStoreForm store={store} />;
}
