"use client";

import { useArchitectsQuery } from "@/api/Architects/architects.query";
import { useEntityFromList } from "@/hooks/useEntityFromList";
import { routes } from "@routes";
import {
  AdminFormLoading,
  AdminFormNotFound,
} from "@/components/Form";
import { useParams } from "next/navigation";
import { UpsertArchitectForm } from "./UpsertArchitect.form";

export function UpsertArchitectView() {
  const params = useParams();
  const id = params.id as string | undefined;
  const {
    entity: architect,
    isLoading,
    notFound,
  } = useEntityFromList(id, useArchitectsQuery);

  if (id && isLoading) return <AdminFormLoading />;
  if (notFound) {
    return (
      <AdminFormNotFound
        backHref={routes.architects.href}
        backLabel="Voltar aos arquitetos"
        message="Arquiteto não encontrado."
      />
    );
  }

  return <UpsertArchitectForm architect={architect} />;
}
