"use client";

import { useUsersQuery } from "@/api/Users/users.query";
import { useEntityFromList } from "@/hooks/useEntityFromList";
import { routes } from "@routes";
import {
  AdminFormLoading,
  AdminFormNotFound,
} from "@/components/Form";
import { useParams } from "next/navigation";
import { UpsertUserForm } from "./UpsertUser.form";

export function UpsertUserView() {
  const params = useParams();
  const id = params.id as string | undefined;
  const {
    entity: user,
    isLoading,
    notFound,
  } = useEntityFromList(id, useUsersQuery);

  if (id && isLoading) return <AdminFormLoading />;
  if (notFound) {
    return (
      <AdminFormNotFound
        backHref={routes.users.href}
        backLabel="Voltar aos usuários"
        message="Usuário não encontrado."
      />
    );
  }

  return <UpsertUserForm user={user} />;
}
