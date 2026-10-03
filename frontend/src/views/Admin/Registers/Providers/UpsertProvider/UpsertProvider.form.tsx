"use client";

import {
  FormActions,
  FormBody,
  FormCheckbox,
  FormAddressFields,
  FormColumn,
  FormContactFields,
  FormInput,
  FormSelect,
  FormTextarea,
  FormTwoColumns,
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
                  <FormContactFields idPrefix="provider" />
                </section>
              </FormColumn>

              <FormColumn>
                <section className={formSectionStack}>
                  <p className={formSectionTitle}>Endereço</p>
                  <FormAddressFields idPrefix="provider" />
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
