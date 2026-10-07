"use client";

import { AdminFormLayout } from "@/app/(layout)/AdminFormLayout";
import {
  FormActions,
  FormBody,
  FormSection,
  FormProductAutocomplete,
  FormSealNumberTags,
  FormSelect,
} from "@/components/Form";
import { FormikProvider } from "formik";
import { useUpsertStockLogic } from "./UpsertStock.logic";

type UpsertStockFormProps = {
  listHref?: string;
};

export function UpsertStockForm({ listHref }: UpsertStockFormProps) {
  const {
    formik,
    storeOptions,
    navigateBack,
    title,
    backLabel,
    listHref: backHref,
  } = useUpsertStockLogic({ listHref });

  return (
    <AdminFormLayout backHref={backHref} backLabel={backLabel} maxWidth="3xl">
      <div className="border-b border-kyowa-border px-5 py-4 sm:px-6">
        <h2 className="font-serif text-xl text-kyowa-ink sm:text-2xl">
          {title}
        </h2>
      </div>

      <FormikProvider value={formik}>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col"
          noValidate
        >
          <FormBody>
            <FormSection title="Dados do lançamento">
              <FormProductAutocomplete
                name="productId"
                label="Produto"
                id="stock-product"
                placeholder="Buscar produto por nome"
              />
              <FormSelect
                name="storeId"
                label="Loja"
                id="stock-store"
                options={storeOptions}
              />
              <FormSealNumberTags
                name="sealNumbers"
                label="Números dos lacres"
                id="stock-seal-numbers"
              />
              <p className="text-xs text-kyowa-muted">
                Pressione Enter ou Tab para adicionar cada número. Cada lacra
                será cadastrado em estoque para o produto e loja selecionados.
              </p>
            </FormSection>
          </FormBody>

          <FormActions
            submitLabel="Salvar lançamento"
            onCancel={navigateBack}
          />
        </form>
      </FormikProvider>
    </AdminFormLayout>
  );
}
