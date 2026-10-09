"use client";

import { useApi } from "@/api/api.hook";
import { useInvalidateSealsQuery } from "@/api/Seals/seals.query";
import {
  FormActions,
  FormBody,
  FormInput,
  FormProductAutocomplete,
  FormSection,
  FormSelect,
  type FormSelectOption,
} from "@/components/Form";
import type { SealDetail } from "@entities";
import { FormikProvider, useFormik } from "formik";
import {
  sealDetailValidationSchema,
  type SealDetailFormSchema,
} from "./SealDetail.schema";

type SealDetailEditFormProps = {
  seal: SealDetail;
  sealId: string;
  productDisplayValue: string;
  storeOptions: FormSelectOption[];
  onSaved: () => Promise<unknown>;
  onCancel: () => void;
};

function sealToFormValues(seal: SealDetail): SealDetailFormSchema {
  return {
    number: String(seal.number),
    storeId: seal.storeId,
    productId: seal.productId,
  };
}

export function SealDetailEditForm({
  seal,
  sealId,
  productDisplayValue,
  storeOptions,
  onSaved,
  onCancel,
}: SealDetailEditFormProps) {
  const { sealsApi } = useApi();
  const invalidateSeals = useInvalidateSealsQuery();

  const formik = useFormik<SealDetailFormSchema>({
    enableReinitialize: true,
    initialValues: sealToFormValues(seal),
    validationSchema: sealDetailValidationSchema,
    onSubmit: async (values, helpers) => {
      const number = Number(String(values.number ?? "").trim());

      try {
        await sealsApi.update(sealId, {
          number,
          storeId: values.storeId,
          productId: values.productId,
        });
        invalidateSeals();
        await onSaved();
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col"
        noValidate
      >
        <FormBody className="px-0 py-0">
          <FormSection title="Alterar lacre">
            <FormInput
              name="number"
              label="Novo Lacre"
              id="seal-new-number"
              type="number"
              min={1}
            />
            <FormSelect
              name="storeId"
              label="Loja"
              id="seal-store"
              options={storeOptions}
            />
            <FormProductAutocomplete
              name="productId"
              label="Produto"
              id="seal-product"
              placeholder="Buscar produto por nome"
              initialDisplayValue={productDisplayValue}
            />
          </FormSection>
        </FormBody>
        <FormActions
          submitLabel={formik.isSubmitting ? "Salvando…" : "Salvar"}
          onCancel={onCancel}
          cancelLabel="Cancelar"
        />
      </form>
    </FormikProvider>
  );
}
