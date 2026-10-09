"use client";

import { AdminFormLayout } from "@/app/(layout)/AdminFormLayout";
import {
  FormActions,
  FormArchitectAutocomplete,
  FormBody,
  FormClientAutocomplete,
  FormInput,
  FormSection,
  FormSelect,
  FormTextarea,
  formFieldGrid2,
} from "@/components/Form";
import type { Budget } from "@entities";
import { routes } from "@routes";
import { FormikProvider } from "formik";
import { FileText } from "lucide-react";
import { openReceiptWindow } from "@/views/Admin/Comercial/Budgets/BudgetReceipt";
import { BudgetCheckoutSection } from "./BudgetCheckoutSection";
import { BudgetHistoryTimeline } from "./BudgetHistoryTimeline";
import { useUpsertBudgetLogic } from "./UpsertBudget.logic";

type UpsertBudgetFormProps = {
  budget?: Budget;
  listHref?: string;
};

export function UpsertBudgetForm({ budget, listHref }: UpsertBudgetFormProps) {
  const {
    formik,
    storeOptions,
    clientDisplayValue,
    architectDisplayValue,
    categoryOptions,
    statusOptions,
    closingAtOptions,
    closingLevelOptions,
    navigateBack,
    title,
    backLabel,
    listHref: backHref,
    historyItems,
    historyLookups,
  } = useUpsertBudgetLogic({ budget, listHref });

  return (
    <AdminFormLayout backHref={backHref} backLabel={backLabel}>
      <div className="flex flex-col gap-3 border-b border-kyowa-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <h2 className="font-serif text-xl text-kyowa-ink sm:text-2xl">
          {title}
        </h2>
        {budget ? (
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 bg-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-kyowa-maroon-dark"
            onClick={() =>
              openReceiptWindow(routes.budgets.receipt(budget.id))
            }
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
            <div
              className={
                budget
                  ? "grid gap-6 lg:grid-cols-2 lg:items-start"
                  : undefined
              }
            >
              <FormSection
                title="Dados do orçamento"
                className={budget ? "min-w-0" : undefined}
              >
                <div className={formFieldGrid2}>
                  <FormSelect
                    name="storeId"
                    label="Loja"
                    id="budget-store"
                    options={storeOptions}
                  />
                  <FormClientAutocomplete
                    name="clientId"
                    label="Cliente"
                    id="budget-client"
                    placeholder="Buscar cliente por nome"
                    initialDisplayValue={clientDisplayValue}
                  />
                  <FormArchitectAutocomplete
                    name="architectId"
                    label="Arquiteto"
                    id="budget-architect"
                    placeholder="Buscar arquiteto por nome"
                    initialDisplayValue={architectDisplayValue}
                  />
                  <FormSelect
                    name="status"
                    label="Status"
                    id="budget-status"
                    options={statusOptions}
                  />
                  <FormSelect
                    name="closingAt"
                    label="Prazo de fechamento"
                    id="budget-closing-at"
                    options={closingAtOptions}
                  />
                  <FormSelect
                    name="closingLevel"
                    label="Nível de fechamento"
                    id="budget-closing-level"
                    options={closingLevelOptions}
                  />
                  <FormInput
                    name="lostReasons"
                    label="Motivo da perda"
                    id="budget-lost-reasons"
                  />
                  <div className="sm:col-span-2">
                    <FormTextarea
                      name="obs"
                      label="Observações"
                      id="budget-obs"
                      rows={4}
                    />
                  </div>
                </div>
              </FormSection>

              {budget ? (
                <div className="min-w-0">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-kyowa-muted sm:mb-4">
                    Histórico
                  </h3>
                  <BudgetHistoryTimeline
                    items={historyItems}
                    lookups={historyLookups}
                  />
                </div>
              ) : null}
            </div>

            <BudgetCheckoutSection categoryOptions={categoryOptions} />
          </FormBody>

          <FormActions
            submitLabel={budget ? "Salvar" : "Criar orçamento"}
            onCancel={navigateBack}
          />
        </form>
      </FormikProvider>
    </AdminFormLayout>
  );
}
