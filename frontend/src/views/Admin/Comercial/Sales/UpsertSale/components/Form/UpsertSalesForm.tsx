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
  FormToggle,
  formFieldGrid2,
} from "@/components/Form";
import { isSaleClosed, type Sale } from "@entities";
import { FormikProvider } from "formik";
import { FileText } from "lucide-react";
import { openSaleReceipt } from "../../../SaleReceipt";
import { SaleCheckoutSection } from "./SaleCheckoutSection";
import { useUpsertSalesLogic } from "../../UpsertSale.logic";
import type { SalesFormSchema } from "../../UpsertSale.schema";

type UpsertSalesFormProps = {
  sale?: Sale;
  listHref?: string;
};

export function UpsertSalesForm({
  sale,
  listHref,
}: UpsertSalesFormProps) {
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
  } = useUpsertSalesLogic({ sale, listHref });

  const showReceiptButton = Boolean(sale && isSaleClosed(sale));

  return (
    <AdminFormLayout backHref={backHref} backLabel={backLabel}>
      <div className="flex flex-col gap-3 border-b border-kyowa-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <h2 className="font-serif text-xl text-kyowa-ink sm:text-2xl">
          {title}
        </h2>
        {showReceiptButton ? (
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 bg-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-kyowa-maroon-dark"
            onClick={() => openSaleReceipt(sale!.id)}
          >
            <FileText className="h-4 w-4" strokeWidth={2} aria-hidden />
            Ver recibo
          </button>
        ) : null}
      </div>

      <FormikProvider value={formik}>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col"
          noValidate
        >
          <FormBody className="flex flex-col gap-5 sm:gap-6">
            <FormSection title="Dados da venda">
              <div className={formFieldGrid2}>
                <FormSelect
                  name="storeId"
                  label="Loja"
                  id="sales-store"
                  options={storeOptions}
                />
                <FormSelect
                  name="sellerId"
                  label="Vendedor"
                  id="sales-seller"
                  options={sellerOptions}
                />
                <FormClientAutocomplete
                  name="clientId"
                  label="Cliente"
                  id="sales-client"
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
                  id="sales-architect"
                  placeholder="Buscar arquiteto por nome"
                  initialDisplayValue={architectDisplayValue}
                />
                <FormCheckbox<SalesFormSchema>
                  name="architectParticipation"
                  label="Participação na venda"
                  id="sales-architect-participation"
                  className="sm:col-span-2"
                />
              </div>
            </FormSection>

            <FormSection title="Pagamento">
              <FormToggle<SalesFormSchema>
                name="isPaid"
                label="Pago"
                id="sales-is-paid"
              />
            </FormSection>

            <FormSection title="Observações">
              <div className={formFieldGrid2}>
                <FormTextarea
                  name="obsReceipt"
                  label="Obs. recibo"
                  id="sales-obs-receipt"
                  rows={4}
                />
                <FormTextarea
                  name="obsInternal"
                  label="Obs. interna"
                  id="sales-obs-internal"
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
            submitLabel={sale ? "Salvar" : "Criar venda"}
            onCancel={navigateBack}
          />
        </form>
      </FormikProvider>
    </AdminFormLayout>
  );
}
