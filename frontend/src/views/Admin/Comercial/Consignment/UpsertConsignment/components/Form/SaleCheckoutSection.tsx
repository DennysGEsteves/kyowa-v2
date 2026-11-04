"use client";

import { SealsApi } from "@/api/Seals";
import {
  FormCurrencyInput,
  FormInput,
  formSectionBlock,
  formSectionTitle,
  type FormSelectOption,
} from "@/components/Form";
import { getFormikFieldError } from "@/components/Form/formikField";
import { formInputClass, formLabelClass } from "@/components/Form/FieldStyles";
import { FormFieldError } from "@/components/Form/FormFieldError";
import type { Product } from "@entities";
import { formatCurrencyBRLFromNumber } from "@/utils/masks";
import { useFormikContext } from "formik";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ConsignmentFormSchema } from "../../UpsertConsignment.schema";
import { emptyCheckoutItem } from "../../UpsertConsignment.schema";
import { formatSealLinkedProductLabel } from "../../UpsertConsignment.transform";

type SaleCheckoutSectionProps = {
  categoryOptions: FormSelectOption[];
  products: Product[];
};

const checkoutFieldClass = "min-w-0";
const checkoutInputClass = "bg-white";
const checkoutLockedInputClass = `${checkoutInputClass} !bg-white`;
const SEAL_LOOKUP_DEBOUNCE_MS = 400;
const sealsApi = SealsApi();

function formatProductOptionLabel(product: Product): string {
  const namePart =
    product.fantasyName && product.fantasyName !== product.name
      ? `${product.name} (${product.fantasyName})`
      : product.name;
  const pricePart =
    product.sellPrice != null
      ? `R$ ${formatCurrencyBRLFromNumber(product.sellPrice)}`
      : "—";
  return `${namePart} - ${pricePart}`;
}

function CheckoutSealFields({
  index,
  products,
}: {
  index: number;
  products: Product[];
}) {
  const { values, errors, touched, submitCount, setFieldValue } =
    useFormikContext<ConsignmentFormSchema>();
  const [lookupHint, setLookupHint] = useState<string | null>(null);
  const [isLookingUp, setIsLookingUp] = useState(false);

  const productError = getFormikFieldError(
    touched,
    errors,
    `checkout.${index}.productId`,
    submitCount,
  );

  const line = values.checkout[index];
  const sealNumberRaw = String(line?.sealId ?? "").trim();
  const storeId = values.storeId;

  useEffect(() => {
    const parsed = Number(sealNumberRaw);
    if (!sealNumberRaw || !Number.isInteger(parsed) || parsed < 1) {
      setLookupHint(null);
      setIsLookingUp(false);
      return;
    }

    let cancelled = false;
    const timeout = window.setTimeout(() => {
      setIsLookingUp(true);
      setLookupHint(null);

      sealsApi
        .searchByNumber(parsed)
        .then((results) => {
          if (cancelled) return;

          const inStock = results.filter((item) => item.status === "stock");
          const match =
            inStock.find((item) => item.storeId === storeId) ?? inStock[0];

          if (!match) {
            void setFieldValue(`checkout.${index}.sealProductName`, "");
            void setFieldValue(`checkout.${index}.productId`, "");
            void setFieldValue(`checkout.${index}.value`, "");
            setLookupHint("Lacre não encontrado no estoque para esta loja.");
            return;
          }

          void setFieldValue(
            `checkout.${index}.sealProductName`,
            formatSealLinkedProductLabel(
              match.productId,
              match.productName,
              match.sellPrice,
              products,
            ),
          );
          void setFieldValue(`checkout.${index}.productId`, match.productId);
          const sellPrice =
            match.sellPrice ??
            products.find((entry) => entry.id === match.productId)?.sellPrice ??
            null;
          if (sellPrice != null) {
            void setFieldValue(
              `checkout.${index}.value`,
              formatCurrencyBRLFromNumber(sellPrice),
            );
          }
          setLookupHint(null);
        })
        .catch(() => {
          if (cancelled) return;
          void setFieldValue(`checkout.${index}.sealProductName`, "");
          void setFieldValue(`checkout.${index}.productId`, "");
          void setFieldValue(`checkout.${index}.value`, "");
          setLookupHint("Não foi possível consultar o lacre. Tente novamente.");
        })
        .finally(() => {
          if (!cancelled) {
            setIsLookingUp(false);
          }
        });
    }, SEAL_LOOKUP_DEBOUNCE_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [index, products, sealNumberRaw, setFieldValue, storeId]);

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <FormInput
          name={`checkout.${index}.sealId`}
          label="Nº lacre"
          id={`checkout-${index}-seal-id`}
          type="text"
          placeholder="Ex.: 12345"
          inputClassName={checkoutInputClass}
        />
        <FormInput
          name={`checkout.${index}.sealProductName`}
          label="Produto"
          id={`checkout-${index}-seal-product`}
          placeholder="Preenchido ao informar o lacre"
          locked
          inputClassName={checkoutLockedInputClass}
        />
        <FormCurrencyInput
          name={`checkout.${index}.value`}
          label="Valor R$"
          id={`checkout-${index}-value`}
          inputClassName={checkoutInputClass}
        />
      </div>
      {isLookingUp ? (
        <p className="text-xs text-kyowa-muted">Consultando lacre no estoque…</p>
      ) : null}
      {lookupHint ? (
        <p className="text-xs text-amber-800">{lookupHint}</p>
      ) : null}
      <FormFieldError message={productError} />
    </div>
  );
}

function CheckoutProductField({
  index,
  products,
}: {
  index: number;
  products: Product[];
}) {
  const { values, errors, touched, submitCount, setFieldValue } =
    useFormikContext<ConsignmentFormSchema>();

  const line = values.checkout[index];
  const categoryId = line?.categoryId ?? "";
  const fieldName = `checkout.${index}.productId`;
  const productError = getFormikFieldError(
    touched,
    errors,
    fieldName,
    submitCount,
  );
  const value = line?.productId ?? "";

  const productOptions = useMemo(
    () =>
      products
        .filter((product) => product.categoryId === categoryId)
        .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))
        .map((product) => ({
          value: product.id,
          label: formatProductOptionLabel(product),
        })),
    [products, categoryId],
  );

  return (
    <div className={checkoutFieldClass}>
      <label htmlFor={`checkout-${index}-product`} className={formLabelClass}>
        Produto
      </label>
      <select
        id={`checkout-${index}-product`}
        name={fieldName}
        value={value}
        disabled={!categoryId}
        onChange={(event) => {
          const nextProductId = event.target.value;
          void setFieldValue(fieldName, nextProductId);
          const product = products.find((entry) => entry.id === nextProductId);
          if (product?.sellPrice != null) {
            void setFieldValue(
              `checkout.${index}.value`,
              formatCurrencyBRLFromNumber(product.sellPrice),
            );
          } else if (!nextProductId) {
            void setFieldValue(`checkout.${index}.value`, "");
          }
        }}
        className={`${formInputClass} ${checkoutInputClass} ${!categoryId ? "cursor-not-allowed opacity-60" : ""}`}
        aria-invalid={Boolean(productError)}
      >
        <option value="">
          {categoryId ? "Selecione…" : "Selecione uma categoria antes"}
        </option>
        {productOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FormFieldError message={productError} />
    </div>
  );
}

function CheckoutCategoryField({
  index,
  categoryOptions,
}: {
  index: number;
  categoryOptions: FormSelectOption[];
}) {
  const { values, errors, touched, submitCount, setFieldValue } =
    useFormikContext<ConsignmentFormSchema>();

  const fieldName = `checkout.${index}.categoryId`;
  const errorMessage = getFormikFieldError(
    touched,
    errors,
    fieldName,
    submitCount,
  );
  const value = values.checkout[index]?.categoryId ?? "";

  return (
    <div className={checkoutFieldClass}>
      <label htmlFor={`checkout-${index}-category`} className={formLabelClass}>
        Categoria
      </label>
      <select
        id={`checkout-${index}-category`}
        name={fieldName}
        value={value}
        onChange={(event) => {
          const nextCategoryId = event.target.value;
          void setFieldValue(fieldName, nextCategoryId);
          void setFieldValue(`checkout.${index}.productId`, "");
        }}
        className={`${formInputClass} ${checkoutInputClass}`}
        aria-invalid={Boolean(errorMessage)}
      >
        <option value="">Selecione…</option>
        {categoryOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FormFieldError message={errorMessage} />
    </div>
  );
}

export function SaleCheckoutSection({
  categoryOptions,
  products,
}: SaleCheckoutSectionProps) {
  const { values, errors, touched, submitCount, setFieldValue } =
    useFormikContext<ConsignmentFormSchema>();

  function addLine() {
    void setFieldValue("checkout", [...values.checkout, emptyCheckoutItem]);
  }

  function removeLine(index: number) {
    void setFieldValue(
      "checkout",
      values.checkout.filter((_, itemIndex) => itemIndex !== index),
    );
  }

  function clearSealLookupFields(index: number) {
    void setFieldValue(`checkout.${index}.sealProductName`, "");
    void setFieldValue(`checkout.${index}.productId`, "");
  }

  function clearNoSealFields(index: number) {
    void setFieldValue(`checkout.${index}.categoryId`, "");
    void setFieldValue(`checkout.${index}.productId`, "");
    void setFieldValue(`checkout.${index}.quantity`, "");
  }

  function chooseSealType(index: number, hasSeal: boolean) {
    void setFieldValue(`checkout.${index}.hasSeal`, hasSeal);
    void setFieldValue(`checkout.${index}.sealId`, "");
    void setFieldValue(`checkout.${index}.value`, "");
    clearSealLookupFields(index);
    clearNoSealFields(index);
    if (!hasSeal) {
      void setFieldValue(`checkout.${index}.quantity`, "1");
    }
  }

  function resetSealChoice(index: number) {
    void setFieldValue(`checkout.${index}.hasSeal`, null);
    void setFieldValue(`checkout.${index}.sealId`, "");
    void setFieldValue(`checkout.${index}.value`, "");
    clearSealLookupFields(index);
    clearNoSealFields(index);
  }

  return (
    <section className={`${formSectionBlock} border-l-4 border-l-kyowa-maroon`}>
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
          Nenhum item no checkout.
        </p>
      ) : (
        <ul className="space-y-4">
          {values.checkout.map((line, index) => {
            const sealChoiceError = getFormikFieldError(
              touched,
              errors,
              `checkout.${index}.hasSeal`,
              submitCount,
            );

            return (
              <li
                key={`checkout-${index}`}
                className="rounded-sm border border-kyowa-border bg-kyowa-surface/50 p-4"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase text-kyowa-muted">
                    Item {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeLine(index)}
                    className="inline-flex p-2 text-red-700 hover:bg-white"
                    aria-label={`Remover item ${index + 1}`}
                  >
                    <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                </div>

                {line?.hasSeal === null ? (
                  <div className="rounded-sm border border-dashed border-kyowa-border bg-white px-4 py-4">
                    <p className="mb-3 text-sm font-medium text-kyowa-ink">
                      Este item tem lacre?
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => chooseSealType(index, true)}
                        className="border border-kyowa-border bg-kyowa-surface px-4 py-2 text-sm font-medium text-kyowa-ink transition hover:border-kyowa-maroon hover:text-kyowa-maroon"
                      >
                        Com lacre
                      </button>
                      <button
                        type="button"
                        onClick={() => chooseSealType(index, false)}
                        className="border border-kyowa-border bg-kyowa-surface px-4 py-2 text-sm font-medium text-kyowa-ink transition hover:border-kyowa-maroon hover:text-kyowa-maroon"
                      >
                        Sem lacre
                      </button>
                    </div>
                    <FormFieldError message={sealChoiceError} />
                  </div>
                ) : (
                  <>
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm text-kyowa-muted">
                        {line.hasSeal ? "Item com lacre" : "Item sem lacre"}
                      </span>
                      <button
                        type="button"
                        onClick={() => resetSealChoice(index)}
                        className="text-xs font-semibold uppercase tracking-wide text-kyowa-maroon hover:underline"
                      >
                        Alterar tipo
                      </button>
                    </div>

                    {line.hasSeal ? (
                      <CheckoutSealFields index={index} products={products} />
                    ) : (
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        <CheckoutCategoryField
                          index={index}
                          categoryOptions={categoryOptions}
                        />
                        <CheckoutProductField index={index} products={products} />
                        <FormInput
                          name={`checkout.${index}.quantity`}
                          label="Quantidade"
                          id={`checkout-${index}-quantity`}
                          type="number"
                          min={1}
                          className={checkoutFieldClass}
                          inputClassName={checkoutInputClass}
                        />
                        <FormCurrencyInput
                          name={`checkout.${index}.value`}
                          label="Valor R$"
                          id={`checkout-${index}-value`}
                          className={checkoutFieldClass}
                          inputClassName={checkoutInputClass}
                        />
                      </div>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
