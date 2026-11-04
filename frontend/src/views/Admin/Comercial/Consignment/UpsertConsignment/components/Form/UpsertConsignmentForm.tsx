"use client";

import { AdminFormLayout } from "@/app/(layout)/AdminFormLayout";
import {
  FormActions,
  FormArchitectAutocomplete,
  FormBody,
  FormCheckbox,
  FormClientAutocomplete,
  FormSection,
  FormSelect,
  FormTextarea,
  formFieldGrid2,
} from "@/components/Form";
import type { Sale } from "@entities";
import { FormikProvider } from "formik";
import { SaleCheckoutSection } from "./SaleCheckoutSection";
import { useUpsertConsignmentLogic } from "../../UpsertConsignment.logic";
import type { ConsignmentFormSchema } from "../../UpsertConsignment.schema";

type UpsertConsignmentFormProps = {
  sale?: Sale;
  listHref?: string;
};

export function UpsertConsignmentForm({
  sale,
  listHref,
}: UpsertConsignmentFormProps) {
  const {
    formik,
    storeOptions,
    sellerOptions,
    clientDisplayValue,
    architectDisplayValue,
    categoryOptions,
    products,
    navigateBack,
    title,
    backLabel,
    listHref: backHref,
    closeConsignmentAsSale,
    isClosingSale,
    isEdit,
  } = useUpsertConsignmentLogic({ sale, listHref });

  return (
    <AdminFormLayout backHref={backHref} backLabel={backLabel}>
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
          <FormBody className="flex flex-col gap-5 sm:gap-6">
            <FormSection title="Dados da consignação">
              <div className={formFieldGrid2}>
                <FormSelect
                  name="storeId"
                  label="Loja"
                  id="consignment-store"
                  options={storeOptions}
                />
                <FormSelect
                  name="sellerId"
                  label="Vendedor"
                  id="consignment-seller"
                  options={sellerOptions}
                />
                <FormClientAutocomplete
                  name="clientId"
                  label="Cliente"
                  id="consignment-client"
                  placeholder="Buscar cliente por nome"
                  initialDisplayValue={clientDisplayValue}
                />
              </div>
            </FormSection>

            <FormSection title="Arquiteto e participação">
              <div className={formFieldGrid2}>
                <FormArchitectAutocomplete
                  name="architectId"
                  label="Arquiteto"
                  id="consignment-architect"
                  placeholder="Buscar arquiteto por nome"
                  initialDisplayValue={architectDisplayValue}
                />
                <FormCheckbox<ConsignmentFormSchema>
                  name="architectParticipation"
                  label="Participação na venda"
                  id="consignment-architect-participation"
                  className="sm:col-span-2"
                />
              </div>
            </FormSection>

            <FormSection title="Observações">
              <div className={formFieldGrid2}>
                <FormTextarea
                  name="obsReceipt"
                  label="Obs. recibo"
                  id="consignment-obs-receipt"
                  rows={4}
                />
                <FormTextarea
                  name="obsInternal"
                  label="Obs. interna"
                  id="consignment-obs-internal"
                  rows={4}
                />
              </div>
            </FormSection>

            <SaleCheckoutSection
              categoryOptions={categoryOptions}
              products={products}
            />
          </FormBody>

          <FormActions
            submitLabel={sale ? "Salvar" : "Criar consignação"}
            onCancel={navigateBack}
            submitDisabled={isClosingSale}
            beforeSubmit={
              isEdit ? (
                <button
                  type="button"
                  onClick={() => void closeConsignmentAsSale()}
                  disabled={isClosingSale || formik.isSubmitting}
                  className="border border-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-kyowa-maroon transition hover:bg-kyowa-maroon/5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isClosingSale ? "Fechando…" : "Fechar venda"}
                </button>
              ) : null
            }
          />
        </form>
      </FormikProvider>
    </AdminFormLayout>
  );
}
