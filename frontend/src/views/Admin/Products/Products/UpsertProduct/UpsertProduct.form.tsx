"use client";

import {
  FormActions,
  FormBody,
  FormCheckbox,
  FormCurrencyInput,
  FormImagePicker,
  FormInput,
  FormSection,
  FormSectionsColumn,
  FormSectionsGrid,
  FormSelect,
  formFieldGrid2,
} from "@/components/Form";
import { AdminFormLayout } from "@/layout/AdminFormLayout";
import type { Product } from "@entities";
import { FormikProvider } from "formik";
import { useUpsertProductLogic } from "./UpsertProduct.logic";

type UpsertProductFormProps = {
  product?: Product;
  listHref?: string;
};

export function UpsertProductForm({
  product,
  listHref,
}: UpsertProductFormProps) {
  const {
    formik,
    sealsEnabled,
    providerOptions,
    categoryOptions,
    unitOptions,
    colorOptions,
    sizeOptions,
    designOptions,
    shapeOptions,
    originOptions,
    modelOptions,
    navigateBack,
    title,
    isEdit,
    backLabel,
    listHref: backHref,
  } = useUpsertProductLogic({ product, listHref });

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
          <FormBody>
            <FormSectionsGrid>
              <FormSectionsColumn>
                <FormSection title="Imagem">
                  <FormImagePicker
                    name="imageFile"
                    label="Foto do produto"
                    id="product-image"
                  />
                </FormSection>

                <FormSection title="Identificação">
                  <div className={formFieldGrid2}>
                    <FormInput name="name" label="Nome" id="product-name" />
                    <FormInput
                      name="fantasyName"
                      label="Nome fantasia"
                      id="product-fantasy-name"
                    />
                    <FormInput name="ref" label="Referência" id="product-ref" />
                    {product ? (
                      <FormSelect
                        name="providerId"
                        label="Fornecedor"
                        id="product-provider"
                        options={providerOptions}
                      />
                    ) : null}
                  </div>
                </FormSection>

                <FormSection title="Preços">
                  <div className={formFieldGrid2}>
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
                </FormSection>

                <FormSection title="Fiscal">
                  <div className={formFieldGrid2}>
                    <FormInput name="ncm" label="NCM" id="product-ncm" />
                    <FormInput name="cst" label="CST" id="product-cst" />
                    <FormInput name="ean" label="EAN" id="product-ean" />
                  </div>
                </FormSection>

                <FormSection title="Estoque e lacres">
                  <FormCheckbox
                    name="hasSeals"
                    label="Possui lacres"
                    id="product-has-seals"
                  />
                  {sealsEnabled ? (
                    <div className={formFieldGrid2}>
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
                    </div>
                  ) : null}
                </FormSection>
              </FormSectionsColumn>

              <FormSectionsColumn>
                <FormSection title="Classificação">
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
                </FormSection>

                <FormSection title="E-commerce">
                  <FormCheckbox
                    name="isEcommerce"
                    label="Disponível no e-commerce"
                    id="product-is-ecommerce"
                    disabled={
                      product?.ezId !== null && product?.ezId !== undefined
                    }
                  />
                </FormSection>
              </FormSectionsColumn>
            </FormSectionsGrid>
          </FormBody>

          <FormActions
            onCancel={navigateBack}
            submitLabel={isEdit ? "Salvar" : "Adicionar"}
          />
        </form>
      </FormikProvider>
    </AdminFormLayout>
  );
}
