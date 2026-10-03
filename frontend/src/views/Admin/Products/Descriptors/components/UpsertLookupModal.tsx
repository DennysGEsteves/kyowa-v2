"use client";

import { useApi } from "@/api/api.hook";
import type { ProductLookupTab } from "@/api/ProductLookups";
import { useInvalidateProductLookupQuery } from "@/api/ProductLookups/product-lookups.query";
import { FormActions, FormBody, FormInput } from "@/components/Form";
import type { ProductLookup } from "@entities";
import { FormikProvider, useFormik } from "formik";
import { useEffect } from "react";
import {
  emptyLookupFormValues,
  lookupValidationSchema,
  type LookupFormSchema,
} from "../Lookup.schema";
import {
  formValuesToUpsertLookupDTO,
  lookupToFormValues,
} from "../Lookup.transform";

type UpsertLookupModalProps = {
  open: boolean;
  tab: ProductLookupTab;
  item?: ProductLookup;
  onClose: (reload?: boolean) => void;
};

function UpsertLookupModalBody({
  tab,
  item,
  onClose,
}: Omit<UpsertLookupModalProps, "open">) {
  const { productLookupsApi } = useApi();
  const invalidate = useInvalidateProductLookupQuery(tab.slug);

  const formik = useFormik<LookupFormSchema>({
    enableReinitialize: true,
    initialValues: item ? lookupToFormValues(item) : emptyLookupFormValues,
    validationSchema: lookupValidationSchema,
    onSubmit: (values) => {
      const payload = formValuesToUpsertLookupDTO(values);

      const request = item
        ? productLookupsApi.update(tab.slug, item.id, payload)
        : productLookupsApi.create(tab.slug, payload);

      request.then(() => {
        invalidate();
        onClose(true);
      });
    },
  });

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

  const title = item
    ? `Editar ${tab.singular}`
    : `Nova ${tab.singular}`;

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
        aria-labelledby="lookup-form-title"
        className="relative z-10 flex max-h-[92dvh] w-full max-w-md flex-col overflow-hidden rounded-t-sm bg-white shadow-xl sm:rounded-sm"
      >
        <div className="border-b border-kyowa-border px-5 py-4 sm:px-6">
          <h2
            id="lookup-form-title"
            className="font-serif text-xl text-kyowa-ink"
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
              <FormInput name="name" label="Nome" id="lookup-name" />
            </FormBody>

            <FormActions
              onCancel={() => onClose()}
              submitLabel={item ? "Salvar" : "Adicionar"}
            />
          </form>
        </FormikProvider>
      </div>
    </div>
  );
}

export function UpsertLookupModal({
  open,
  tab,
  item,
  onClose,
}: UpsertLookupModalProps) {
  if (!open) return null;

  const formKey = item ? `edit-${item.id}` : "create";

  return (
    <UpsertLookupModalBody
      key={formKey}
      tab={tab}
      item={item}
      onClose={onClose}
    />
  );
}
