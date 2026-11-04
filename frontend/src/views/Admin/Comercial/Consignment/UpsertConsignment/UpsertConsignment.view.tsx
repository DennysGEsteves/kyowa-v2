"use client";

import { useSaleDetailQuery } from "@/api/Sales/sales.query";
import { AdminFormLoading, AdminFormNotFound } from "@/components/Form";
import { routes } from "@routes";
import { useParams } from "next/navigation";
import { UpsertConsignmentForm } from "./components/Form/UpsertConsignmentForm";

export function UpsertConsignmentView() {
  const params = useParams();
  const id = params.id as string | undefined;

  const {
    data: sale,
    isLoading,
    isError,
  } = useSaleDetailQuery(id ?? null, {
    enabled: Boolean(id),
  });

  if (!id) {
    return <UpsertConsignmentForm />;
  }

  if (isLoading) {
    return <AdminFormLoading />;
  }

  if (isError || !sale || sale.type !== "consignment") {
    return (
      <AdminFormNotFound
        backHref={routes.consignment.href}
        backLabel="Voltar à consignação"
        message="Consignação não encontrada."
      />
    );
  }

  return <UpsertConsignmentForm sale={sale} />;
}
