"use client";

import {
  FormCurrencyInput,
  FormInput,
  FormSelect,
  formSectionBlock,
  formSectionTitle,
  type FormSelectOption,
} from "@/components/Form";
import { useFormikContext } from "formik";
import { Plus, Trash2 } from "lucide-react";
import type { BudgetFormSchema } from "./UpsertBudget.schema";
import { emptyCheckoutItem } from "./UpsertBudget.schema";

type BudgetCheckoutSectionProps = {
  categoryOptions: FormSelectOption[];
};

/** Altura mínima para input + linha de erro no grid desktop */
const checkoutFieldClass = "min-w-0 lg:min-h-14";

export function BudgetCheckoutSection({
  categoryOptions,
}: BudgetCheckoutSectionProps) {
  const { values, setFieldValue } = useFormikContext<BudgetFormSchema>();

  function addLine() {
    void setFieldValue("checkout", [...values.checkout, emptyCheckoutItem]);
  }

  function removeLine(index: number) {
    void setFieldValue(
      "checkout",
      values.checkout.filter((_, itemIndex) => itemIndex !== index),
    );
  }

  return (
    <section
      className={`${formSectionBlock} border-l-4 border-l-kyowa-maroon`}
    >
      <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
        <p className={`${formSectionTitle} mb-0`}>Checkout</p>
        <button
          type="button"
          onClick={addLine}
          className="inline-flex items-center justify-center gap-2 border border-kyowa-border bg-white px-3 py-2 text-sm font-medium text-kyowa-ink transition hover:bg-kyowa-surface"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Adicionar item
        </button>
      </div>

      {values.checkout.length === 0 ? (
        <p className="rounded-sm border border-dashed border-kyowa-border bg-kyowa-surface px-4 py-8 text-center text-sm text-kyowa-muted">
          Nenhum item no checkout. Use &quot;Adicionar item&quot; para incluir
          linhas.
        </p>
      ) : (
        <div className="overflow-hidden rounded-sm border border-kyowa-border bg-kyowa-surface">
          <div
            className="hidden border-b border-kyowa-border bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-kyowa-muted lg:grid lg:grid-cols-[2.5rem_minmax(0,1.5fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_2.5rem] lg:gap-3"
            aria-hidden
          >
            <span>#</span>
            <span>Descrição</span>
            <span>Categoria</span>
            <span>Quantidade</span>
            <span>Preço R$</span>
            <span className="text-right">Ação</span>
          </div>

          <ul className="divide-y divide-kyowa-border">
            {values.checkout.map((_, index) => (
              <li
                key={`checkout-${index}`}
                className="px-4 py-4 lg:grid lg:grid-cols-[2.5rem_minmax(0,1.5fr)_minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_2.5rem] lg:items-start lg:gap-3 lg:[&_label]:sr-only"
              >
                <span
                  className="mb-3 inline-flex h-8 w-8 shrink-0 items-center justify-center self-start bg-kyowa-maroon text-xs font-semibold text-white lg:mb-0 lg:mt-0.5"
                  aria-hidden
                >
                  {index + 1}
                </span>

                <FormInput
                  name={`checkout.${index}.description`}
                  label="Descrição"
                  className={checkoutFieldClass}
                />
                <FormSelect
                  name={`checkout.${index}.categoryId`}
                  label="Categoria"
                  options={categoryOptions}
                  className={checkoutFieldClass}
                />
                <FormInput
                  name={`checkout.${index}.quantity`}
                  label="Quantidade"
                  type="number"
                  min={0}
                  className={checkoutFieldClass}
                />
                <FormCurrencyInput
                  name={`checkout.${index}.price`}
                  label="Preço"
                  className={checkoutFieldClass}
                />

                <div className="mt-3 flex justify-end self-start lg:mt-0.5">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-red-600 hover:underline lg:p-1"
                    onClick={() => removeLine(index)}
                    aria-label={`Remover item ${index + 1}`}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                    <span className="lg:hidden">Remover</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
