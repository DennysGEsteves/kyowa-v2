"use client";

import { useProductsQuery } from "@/api/Products/products.query";
import { useEntityFromList } from "@/hooks/useEntityFromList";
import { routes } from "@routes";
import {
  AdminFormLoading,
  AdminFormNotFound,
} from "@/components/Form";
import { useParams } from "next/navigation";
import { UpsertProductForm } from "./UpsertProduct.form";

export function UpsertProductView() {
  const params = useParams();
  const id = params.id as string | undefined;
  const {
    entity: product,
    isLoading,
    notFound,
  } = useEntityFromList(id, useProductsQuery);

  if (id && isLoading) return <AdminFormLoading />;
  if (notFound) {
    return (
      <AdminFormNotFound
        backHref={routes.products.href}
        backLabel="Voltar aos produtos"
        message="Produto não encontrado."
      />
    );
  }

  return <UpsertProductForm product={product} />;
}
