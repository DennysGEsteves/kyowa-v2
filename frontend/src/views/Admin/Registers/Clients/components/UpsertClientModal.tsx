"use client";

import { useArchitectsQuery } from "@/api/Architects/architects.query";
import { useApi } from "@/api/api.hook";
import { useInvalidateClientsQuery } from "@/api/Clients/clients.query";
import {
  FormActions,
  FormBody,
  FormCheckbox,
  FormInput,
  FormSelect,
  FormTextarea,
} from "@/components/Form";
import {
  clientOriginLabels,
  clientOrigins,
  interestProductLabels,
  interestProducts,
  type Client,
  type ClientOrigin,
  type InterestProduct,
} from "@entities";
import { FormikProvider, useFormik } from "formik";
import { useEffect, useMemo } from "react";
import {
  clientToFormValues,
  clientValidationSchema,
  emptyClientFormValues,
  formValuesToUpsertClientDTO,
  type ClientFormSchema,
} from "../Clients.schema";
import { FormEnumCheckboxGroup } from "./FormEnumCheckboxGroup";

type UpsertClientModalProps = {
  open: boolean;
  client?: Client;
  onClose: (reload?: boolean) => void;
};

function UpsertClientModalBody({
  client,
  onClose,
}: Omit<UpsertClientModalProps, "open">) {
  const { clientsApi } = useApi();
  const invalidateClients = useInvalidateClientsQuery();
  const { data: architects = [] } = useArchitectsQuery();

  const formik = useFormik<ClientFormSchema>({
    enableReinitialize: true,
    initialValues: client
      ? clientToFormValues(client)
      : emptyClientFormValues,
    validationSchema: clientValidationSchema,
    onSubmit: (values) => onSubmit(values),
  });

  const architectOptions = useMemo(
    () => [
      { value: "", label: "Nenhum" },
      ...architects.map((architect) => ({
        value: architect.id,
        label: architect.name,
      })),
    ],
    [architects],
  );

  const interestOptions = useMemo(
    () =>
      interestProducts.map((product) => ({
        value: product,
        label: interestProductLabels[product],
      })),
    [],
  );

  const originOptions = useMemo(
    () =>
      clientOrigins.map((origin) => ({
        value: origin,
        label: clientOriginLabels[origin],
      })),
    [],
  );

  const onSubmit = (values: ClientFormSchema) => {
    if (client) {
      const payload = formValuesToUpsertClientDTO(values, true);
      clientsApi.update(client.id, payload).then(() => {
        invalidateClients();
        onClose(true);
      });
    } else {
      const payload = formValuesToUpsertClientDTO(values);
      clientsApi.create(payload).then(() => {
        invalidateClients();
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

  const title = client ? "Editar cliente" : "Novo cliente";

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
        aria-labelledby="client-form-title"
        className="relative z-10 flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-sm bg-white shadow-xl sm:max-h-[90vh] sm:rounded-sm"
      >
        <div className="border-b border-kyowa-border px-5 py-4 sm:px-6">
          <h2
            id="client-form-title"
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

              <FormInput name="name" label="Nome" id="client-name" />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormInput name="cpf" label="CPF" id="client-cpf" />
                <FormInput name="rg" label="RG" id="client-rg" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormInput
                  name="nasc"
                  label="Data de nascimento"
                  id="client-nasc"
                  type="date"
                />
                <FormInput
                  name="entry"
                  label="Data de entrada"
                  id="client-entry"
                  type="date"
                />
              </div>

              <FormInput name="occupation" label="Profissão" id="client-occupation" />

              <FormSelect
                name="architectId"
                label="Arquiteto"
                id="client-architect"
                options={architectOptions}
              />

              <p className="pt-2 text-xs font-semibold uppercase tracking-wider text-kyowa-muted">
                Contato
              </p>

              <FormInput
                name="email"
                label="E-mail"
                id="client-email"
                type="email"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormInput name="phone1" label="Telefone 1" id="client-phone1" />
                <FormInput name="phone2" label="Telefone 2" id="client-phone2" />
              </div>

              <p className="pt-2 text-xs font-semibold uppercase tracking-wider text-kyowa-muted">
                Endereço
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <FormInput name="cep" label="CEP" id="client-cep" />
                <FormInput
                  name="address"
                  label="Endereço"
                  id="client-address"
                  className="sm:col-span-2"
                />
                <FormInput name="district" label="Bairro" id="client-district" />
                <FormInput name="city" label="Cidade" id="client-city" />
                <FormInput
                  name="region"
                  label="UF"
                  id="client-region"
                  placeholder="SP"
                />
              </div>

              <FormEnumCheckboxGroup<InterestProduct>
                name="interestProducts"
                label="Produtos de interesse"
                options={interestOptions}
              />

              <FormEnumCheckboxGroup<ClientOrigin>
                name="origins"
                label="Como nos conheceu"
                options={originOptions}
              />

              <FormTextarea name="obs" label="Observações" id="client-obs" />

              <FormCheckbox name="active" label="Cliente ativo" id="client-active" />
            </FormBody>

            <FormActions
              onCancel={() => onClose()}
              submitLabel={client ? "Salvar" : "Adicionar"}
            />
          </form>
        </FormikProvider>
      </div>
    </div>
  );
}

export function UpsertClientModal({
  open,
  client,
  onClose,
}: UpsertClientModalProps) {
  if (!open) return null;

  const formKey = client ? `edit-${client.id}` : "create";

  return (
    <UpsertClientModalBody key={formKey} client={client} onClose={onClose} />
  );
}
