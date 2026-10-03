"use client";

import {
  FormActions,
  FormBody,
  FormCheckbox,
  FormColumn,
  FormInput,
  FormPhoneInput,
  FormSelect,
  FormTextarea,
  FormTwoColumns,
  formAddressGridInColumn,
  formFieldGrid2,
  formSectionStack,
  formSectionTitle,
} from "@/components/Form";
import { AdminFormLayout } from "@/layout/AdminFormLayout";
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
            <FormTwoColumns>
              <FormColumn>
                <section className={formSectionStack}>
                  <p className={formSectionTitle}>Dados gerais</p>
                  <div className={formFieldGrid2}>
                    <FormInput name="name" label="Nome" id="client-name" />
                    <FormInput name="cpf" label="CPF" id="client-cpf" />
                    <FormInput name="rg" label="RG" id="client-rg" />
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
                </section>

                <section className={formSectionStack}>
                  <p className={formSectionTitle}>Contato</p>
                  <div className={formFieldGrid2}>
                    <FormInput
                      name="email"
                      label="E-mail"
                      id="client-email"
                      type="email"
                    />
                    <FormPhoneInput name="phone1" label="Telefone 1" id="client-phone1" />
                    <FormPhoneInput name="phone2" label="Telefone 2" id="client-phone2" />
                  </div>
                </section>

                <section className={formSectionStack}>
                  <p className={formSectionTitle}>Endereço</p>
                  <div className={formAddressGridInColumn}>
                    <FormInput name="cep" label="CEP" id="client-cep" />
                    <FormInput
                      name="region"
                      label="UF"
                      id="client-region"
                      placeholder="SP"
                    />
                    <FormInput
                      name="address"
                      label="Endereço"
                      id="client-address"
                      className="sm:col-span-2"
                    />
                    <FormInput name="district" label="Bairro" id="client-district" />
                    <FormInput name="city" label="Cidade" id="client-city" />
                  </div>
                </section>
              </FormColumn>

              <FormColumn>
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
              </FormColumn>
            </FormTwoColumns>
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
