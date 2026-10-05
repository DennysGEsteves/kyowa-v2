"use client";

import {
  FormActions,
  FormBody,
  FormCheckbox,
  FormAddressFields,
  FormContactFields,
  FormCpfInput,
  FormInput,
  FormRgInput,
  FormSection,
  FormSectionsColumn,
  FormSectionsGrid,
  FormSelect,
  FormTextarea,
  formFieldGrid2,
} from "@/components/Form";
import { AdminFormLayout } from "@/app/(layout)/AdminFormLayout";
import type { Client, ClientOrigin, InterestProduct } from "@entities";
import { FormikProvider } from "formik";
import { FormEnumCheckboxGroup } from "./FormEnumCheckboxGroup";
import { useUpsertClientLogic } from "./UpsertClient.logic";

type UpsertClientFormProps = {
  client?: Client;
  listHref?: string;
};

export function UpsertClientForm({ client, listHref }: UpsertClientFormProps) {
  const {
    formik,
    architectOptions,
    interestOptions,
    originOptions,
    navigateBack,
    title,
    isEdit,
    backLabel,
    listHref: backHref,
  } = useUpsertClientLogic({ client, listHref });

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
                <FormSection title="Dados gerais">
                  <div className={formFieldGrid2}>
                    <FormInput name="name" label="Nome" id="client-name" />
                    <FormCpfInput name="cpf" label="CPF" id="client-cpf" />
                    <FormRgInput name="rg" label="RG" id="client-rg" />
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
                    <FormInput
                      name="occupation"
                      label="Profissão"
                      id="client-occupation"
                    />
                  </div>
                  <FormSelect
                    name="architectId"
                    label="Arquiteto"
                    id="client-architect"
                    options={architectOptions}
                  />
                </FormSection>

                <FormSection title="Endereço">
                  <FormAddressFields idPrefix="client" />
                </FormSection>

                <FormSection title="Status">
                  <FormCheckbox
                    name="active"
                    label="Cliente ativo"
                    id="client-active"
                  />
                </FormSection>
              </FormSectionsColumn>

              <FormSectionsColumn>
                <FormSection title="Contato">
                  <FormContactFields idPrefix="client" />
                </FormSection>

                <FormSection title="Produtos de interesse">
                  <FormEnumCheckboxGroup<InterestProduct>
                    name="interestProducts"
                    label=""
                    options={interestOptions}
                  />
                </FormSection>

                <FormSection title="Como nos conheceu">
                  <FormEnumCheckboxGroup<ClientOrigin>
                    name="origins"
                    label=""
                    options={originOptions}
                  />
                </FormSection>

                <FormSection title="Observações">
                  <FormTextarea
                    name="obs"
                    label="Observações"
                    id="client-obs"
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
