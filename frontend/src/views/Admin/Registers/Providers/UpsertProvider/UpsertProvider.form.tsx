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
import type { Provider } from "@entities";
import { FormikProvider } from "formik";
import { useUpsertProviderLogic } from "./UpsertProvider.logic";

type UpsertProviderFormProps = {
  provider?: Provider;
  listHref?: string;
};

export function UpsertProviderForm({
  provider,
  listHref,
}: UpsertProviderFormProps) {
  const {
    formik,
    typeOptions,
    navigateBack,
    title,
    isEdit,
    backLabel,
    listHref: backHref,
  } = useUpsertProviderLogic({ provider, listHref });

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
                  <FormInput
                    name="name"
                    label="Nome / Razão social"
                    id="provider-name"
                  />
                  <div className={formFieldGrid2}>
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
                    <FormInput name="ie" label="Inscrição estadual" id="provider-ie" />
                    <FormInput name="im" label="Inscrição municipal" id="provider-im" />
                  </div>
                </section>

                <section className={formSectionStack}>
                  <p className={formSectionTitle}>Contato</p>
                  <div className={formFieldGrid2}>
                    <FormInput
                      name="email"
                      label="E-mail"
                      id="provider-email"
                      type="email"
                    />
                    <FormPhoneInput name="phone1" label="Telefone 1" id="provider-phone1" />
                    <FormPhoneInput name="phone2" label="Telefone 2" id="provider-phone2" />
                  </div>
                </section>
              </FormColumn>

              <FormColumn>
                <section className={formSectionStack}>
                  <p className={formSectionTitle}>Endereço</p>
                  <div className={formAddressGridInColumn}>
                    <FormInput name="cep" label="CEP" id="provider-cep" />
                    <FormInput
                      name="region"
                      label="UF"
                      id="provider-region"
                      placeholder="SP"
                    />
                    <FormInput
                      name="address"
                      label="Endereço"
                      id="provider-address"
                      className="sm:col-span-2"
                    />
                    <FormInput name="district" label="Bairro" id="provider-district" />
                    <FormInput name="city" label="Cidade" id="provider-city" />
                  </div>
                </section>

                <FormTextarea name="obs" label="Observações" id="provider-obs" />

                <FormCheckbox
                  name="active"
                  label="Fornecedor ativo"
                  id="provider-active"
                />
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
