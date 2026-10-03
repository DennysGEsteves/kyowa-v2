"use client";

import { useApi } from "@/api/api.hook";
import { useInvalidateProvidersQuery } from "@/api/Providers/providers.query";
import {
  FormActions,
  FormBody,
  FormCheckbox,
  FormInput,
  FormSelect,
  FormTextarea,
} from "@/components/Form";
import {
  providerTypeLabels,
  providerTypes,
  type Provider,
} from "@entities";
import { FormikProvider, useFormik } from "formik";
import { useEffect, useMemo } from "react";
import {
  emptyProviderFormValues,
  providerValidationSchema,
  type ProviderFormSchema,
} from "../Providers.schema";
import {
  formValuesToUpsertProviderDTO,
  providerToFormValues,
} from "../Providers.transform";

type UpsertProviderModalProps = {
  open: boolean;
  provider?: Provider;
  onClose: (reload?: boolean) => void;
};

function UpsertProviderModalBody({
  provider,
  onClose,
}: Omit<UpsertProviderModalProps, "open">) {
  const { providersApi } = useApi();
  const invalidateProviders = useInvalidateProvidersQuery();

  const formik = useFormik<ProviderFormSchema>({
    initialValues: provider
      ? providerToFormValues(provider)
      : emptyProviderFormValues,
    validationSchema: providerValidationSchema,
    onSubmit: (values) => onSubmit(values),
  });

  const typeOptions = useMemo(
    () => [
      { value: "", label: "Selecione" },
      ...providerTypes.map((type) => ({
        value: type,
        label: providerTypeLabels[type],
      })),
    ],
    [],
  );

  const onSubmit = (values: ProviderFormSchema) => {
    const payload = formValuesToUpsertProviderDTO(values);

    if (provider) {
      providersApi.update(provider.id, payload).then(() => {
        invalidateProviders();
        onClose(true);
      });
    } else {
      providersApi.create(payload).then(() => {
        invalidateProviders();
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

  const title = provider ? "Editar fornecedor" : "Novo fornecedor";

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
        aria-labelledby="provider-form-title"
        className="relative z-10 flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-sm bg-white shadow-xl sm:max-h-[90vh] sm:rounded-sm"
      >
        <div className="border-b border-kyowa-border px-5 py-4 sm:px-6">
          <h2
            id="provider-form-title"
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
                Dados gerais
              </p>

              <FormInput name="name" label="Nome / Razão social" id="provider-name" />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormInput
                  name="cnpj"
                  label="CNPJ"
                  id="provider-cnpj"
                  placeholder="00.000.000/0000-00"
                />
                <FormSelect
                  name="type"
                  label="Tipo"
                  id="provider-type"
                  options={typeOptions}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormInput name="ie" label="Inscrição estadual" id="provider-ie" />
                <FormInput name="im" label="Inscrição municipal" id="provider-im" />
              </div>

              <p className="pt-2 text-xs font-semibold uppercase tracking-wider text-kyowa-muted">
                Contato
              </p>

              <FormInput
                name="email"
                label="E-mail"
                id="provider-email"
                type="email"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormInput name="phone1" label="Telefone 1" id="provider-phone1" />
                <FormInput name="phone2" label="Telefone 2" id="provider-phone2" />
              </div>

              <p className="pt-2 text-xs font-semibold uppercase tracking-wider text-kyowa-muted">
                Endereço
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <FormInput name="cep" label="CEP" id="provider-cep" />
                <FormInput
                  name="address"
                  label="Endereço"
                  id="provider-address"
                  className="sm:col-span-2"
                />
                <FormInput name="district" label="Bairro" id="provider-district" />
                <FormInput name="city" label="Cidade" id="provider-city" />
                <FormInput
                  name="region"
                  label="UF"
                  id="provider-region"
                  placeholder="SP"
                />
              </div>

              <FormTextarea name="obs" label="Observações" id="provider-obs" />

              <FormCheckbox
                name="active"
                label="Fornecedor ativo"
                id="provider-active"
              />
            </FormBody>

            <FormActions
              onCancel={() => onClose()}
              submitLabel={provider ? "Salvar" : "Adicionar"}
            />
          </form>
        </FormikProvider>
      </div>
    </div>
  );
}

export function UpsertProviderModal({
  open,
  provider,
  onClose,
}: UpsertProviderModalProps) {
  if (!open) return null;

  const formKey = provider ? `edit-${provider.id}` : "create";

  return (
    <UpsertProviderModalBody
      key={formKey}
      provider={provider}
      onClose={onClose}
    />
  );
}
