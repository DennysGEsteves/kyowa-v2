"use client";

import { useSaleDetailQuery } from "@/api/Sales/sales.query";
import { AdminFormLoading, AdminFormNotFound } from "@/components/Form";
import { routes } from "@routes";
import { useParams } from "next/navigation";
import { UpsertSalesForm } from "./components/Form/UpsertSalesForm";

export function UpsertSalesView() {
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
    return <UpsertSalesForm />;
  }

  if (isLoading) {
    return <AdminFormLoading />;
  }

  if (isError || !sale || sale.type !== "sale") {
    return (
      <AdminFormNotFound
        backHref={routes.sales.href}
        backLabel="Voltar às vendas"
        message="Venda não encontrada."
      />
    );
  }

  return <UpsertSalesForm sale={sale} />;
}
