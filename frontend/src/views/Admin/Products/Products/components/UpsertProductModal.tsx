"use client";

import { useApi } from "@/api/api.hook";
import { useProductLookupsQuery } from "@/api/ProductLookups/product-lookups.query";
import { useInvalidateProductsQuery } from "@/api/Products/products.query";
import { useProvidersQuery } from "@/api/Providers/providers.query";
import {
  FormActions,
  FormBody,
  FormCheckbox,
  FormCurrencyInput,
  FormInput,
  FormSelect,
} from "@/components/Form";
import type { Product, ProductLookup } from "@entities";
import { FormikProvider, useFormik } from "formik";
import { useEffect, useMemo } from "react";
import {
  emptyProductFormValues,
  productValidationSchema,
  type ProductFormSchema,
} from "../Products.schema";
import {
  formValuesToCreateProductDTO,
  formValuesToUpdateProductDTO,
  productToFormValues,
} from "../Products.transform";

type UpsertProductModalProps = {
  open: boolean;
  product?: Product;
  onClose: (reload?: boolean) => void;
};

function lookupSelectOptions(items: ProductLookup[]) {
  return [
    { value: "", label: "Selecione" },
    ...items.map((item) => ({ value: item.id, label: item.name })),
  ];
}

function UpsertProductModalBody({
  product,
  onClose,
}: Omit<UpsertProductModalProps, "open">) {
  const { productsApi } = useApi();
  const invalidateProducts = useInvalidateProductsQuery();
  const lookups = useProductLookupsQuery();
  const { data: providers = [] } = useProvidersQuery();

  const formik = useFormik<ProductFormSchema>({
    enableReinitialize: true,
    initialValues: product
      ? productToFormValues(product)
      : emptyProductFormValues,
    validationSchema: productValidationSchema,
    onSubmit: (values) => onSubmit(values),
  });

  const { values, setFieldValue } = formik;
  const sealsEnabled = values.hasSeals;

  useEffect(() => {
    if (!sealsEnabled) {
      setFieldValue("amountStart", "");
      setFieldValue("amountUnlimited", false);
    }
  }, [sealsEnabled, setFieldValue]);

  const providerOptions = useMemo(
    () => [
      { value: "", label: "Selecione" },
      ...providers.map((provider) => ({
        value: provider.id,
        label: provider.name,
      })),
    ],
    [providers],
  );

  const categoryOptions = useMemo(
    () => lookupSelectOptions(lookups.categories),
    [lookups.categories],
  );
  const unitOptions = useMemo(
    () => lookupSelectOptions(lookups.units),
    [lookups.units],
  );
  const colorOptions = useMemo(
    () => lookupSelectOptions(lookups.colors),
    [lookups.colors],
  );
  const sizeOptions = useMemo(
    () => lookupSelectOptions(lookups.sizes),
    [lookups.sizes],
  );
  const designOptions = useMemo(
    () => lookupSelectOptions(lookups.designs),
    [lookups.designs],
  );
  const shapeOptions = useMemo(
    () => lookupSelectOptions(lookups.shapes),
    [lookups.shapes],
  );
  const originOptions = useMemo(
    () => lookupSelectOptions(lookups.origins),
    [lookups.origins],
  );
  const modelOptions = useMemo(
    () => lookupSelectOptions(lookups.models),
    [lookups.models],
  );

  const onSubmit = (values: ProductFormSchema) => {
    if (product) {
      const payload = formValuesToUpdateProductDTO(values);
      productsApi.update(product.id, payload).then(() => {
        invalidateProducts();
        onClose(true);
      });
    } else {
      const payload = formValuesToCreateProductDTO(values);
      productsApi.create(payload).then(() => {
        invalidateProducts();
        onClose(true);
      });
    }
  };

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const title = product ? "Editar produto" : "Novo produto";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 bg-black/50"
        onClick={() => onClose()}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-form-title"
        className="relative z-10 flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-sm bg-white shadow-xl sm:max-h-[90vh] sm:rounded-sm"
      >
        <div className="border-b border-kyowa-border px-5 py-4 sm:px-6">
          <h2
            id="product-form-title"
            className="font-serif text-xl text-kyowa-ink sm:text-2xl"
          >
            {title}
          </h2>
        </div>

        <FormikProvider value={formik}>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-1 flex-col overflow-hidden"
            noValidate
          >
            <FormBody>
              <p className="text-xs font-semibold uppercase tracking-wider text-kyowa-muted">
                Identificação
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormInput name="name" label="Nome" id="product-name" />
                <FormInput
                  name="fantasyName"
                  label="Nome fantasia"
                  id="product-fantasy-name"
                />
              </div>

              <FormInput name="ref" label="Referência" id="product-ref" />

              {product ? (
                <FormSelect
                  name="providerId"
                  label="Fornecedor"
                  id="product-provider"
                  options={providerOptions}
                />
              ) : null}

              <p className="pt-2 text-xs font-semibold uppercase tracking-wider text-kyowa-muted">
                Classificação
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormSelect
                  name="categoryId"
                  label="Categoria"
                  id="product-category"
                  options={categoryOptions}
                />
                <FormSelect
                  name="unitId"
                  label="Unidade"
                  id="product-unit"
                  options={unitOptions}
                />
                <FormSelect
                  name="colorId"
                  label="Cor"
                  id="product-color"
                  options={colorOptions}
                />
                <FormSelect
                  name="sizeId"
                  label="Tamanho"
                  id="product-size"
                  options={sizeOptions}
                />
                <FormSelect
                  name="designId"
                  label="Desenho"
                  id="product-design"
                  options={designOptions}
                />
                <FormSelect
                  name="shapeId"
                  label="Formato"
                  id="product-shape"
                  options={shapeOptions}
                />
                <FormSelect
                  name="originId"
                  label="Origem"
                  id="product-origin"
                  options={originOptions}
                />
                <FormSelect
                  name="modelId"
                  label="Modelo"
                  id="product-model"
                  options={modelOptions}
                />
              </div>

              <p className="pt-2 text-xs font-semibold uppercase tracking-wider text-kyowa-muted">
                Fiscal
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <FormInput name="ncm" label="NCM" id="product-ncm" />
                <FormInput name="cst" label="CST" id="product-cst" />
                <FormInput name="ean" label="EAN" id="product-ean" />
              </div>

              <p className="pt-2 text-xs font-semibold uppercase tracking-wider text-kyowa-muted">
                Preços
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormCurrencyInput
                  name="buyPrice"
                  label="Preço de compra"
                  id="product-buy-price"
                />
                <FormCurrencyInput
                  name="sellPrice"
                  label="Preço de venda"
                  id="product-sell-price"
                />
              </div>

              <p className="pt-2 text-xs font-semibold uppercase tracking-wider text-kyowa-muted">
                Estoque e lacres
              </p>

              <FormCheckbox
                name="hasSeals"
                label="Possui lacres"
                id="product-has-seals"
              />

              {sealsEnabled ? (
                <>
                  <FormInput
                    name="amountStart"
                    label="Quantidade inicial"
                    id="product-amount-start"
                  />
                  <FormCheckbox
                    name="amountUnlimited"
                    label="Estoque ilimitado"
                    id="product-amount-unlimited"
                  />
                </>
              ) : null}

              <p className="pt-2 text-xs font-semibold uppercase tracking-wider text-kyowa-muted">
                E-commerce
              </p>

              <FormCheckbox
                name="isEcommerce"
                label="Disponível no e-commerce"
                id="product-is-ecommerce"
                disabled={
                  product?.ezId !== null && product?.ezId !== undefined
                }
              />
            </FormBody>

            <FormActions
              onCancel={() => onClose()}
              submitLabel={product ? "Salvar" : "Adicionar"}
            />
          </form>
        </FormikProvider>
      </div>
    </div>
  );
}

export function UpsertProductModal({
  open,
  product,
  onClose,
}: UpsertProductModalProps) {
  if (!open) return null;

  const formKey = product ? `edit-${product.id}` : "create";

  return (
    <UpsertProductModalBody key={formKey} product={product} onClose={onClose} />
  );
}
