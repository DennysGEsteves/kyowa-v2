"use client";

import { useArchitectsQuery } from "@/api/Architects/architects.query";
import { useEntityFromList } from "@/hooks/useEntityFromList";
import { adminRoutes } from "@/routes/adminRoutes";
import {
  AdminFormLoading,
  AdminFormNotFound,
} from "@/views/Admin/components/AdminFormPage";
import { useParams } from "next/navigation";
import { UpsertArchitectForm } from "./UpsertArchitect.form";

export function UpsertArchitectView() {
  const params = useParams();
  const id = params.id as string | undefined;
  const { entity: architect, isLoading, notFound } = useEntityFromList(
    id,
    useArchitectsQuery,
  );

  if (id && isLoading) return <AdminFormLoading />;
  if (notFound) {
    return (
      <AdminFormNotFound
        backHref={adminRoutes.architects.list}
        backLabel="Voltar aos arquitetos"
        message="Arquiteto não encontrado."
      />
    );
  }

  return <UpsertArchitectForm architect={architect} />;
}
