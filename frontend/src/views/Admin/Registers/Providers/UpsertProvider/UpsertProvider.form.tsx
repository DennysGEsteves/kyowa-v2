"use client";

import {
  FormActions,
  FormBody,
  FormCheckbox,
  FormAddressFields,
  FormContactFields,
  FormInput,
  FormSection,
  FormSectionsColumn,
  FormSectionsGrid,
  FormSelect,
  FormTextarea,
  formFieldGrid2,
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
            <FormSectionsGrid>
              <FormSectionsColumn>
                <FormSection title="Dados gerais">
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
                    <FormInput
                      name="ie"
                      label="Inscrição estadual"
                      id="provider-ie"
                    />
                    <FormInput
                      name="im"
                      label="Inscrição municipal"
                      id="provider-im"
                    />
                  </div>
                </FormSection>

                <FormSection title="Endereço">
                  <FormAddressFields idPrefix="provider" />
                </FormSection>

                <FormSection title="Status">
                  <FormCheckbox
                    name="active"
                    label="Fornecedor ativo"
                    id="provider-active"
                  />
                </FormSection>
              </FormSectionsColumn>

              <FormSectionsColumn>
                <FormSection title="Contato">
                  <FormContactFields idPrefix="provider" />
                </FormSection>

                <FormSection title="Observações">
                  <FormTextarea
                    name="obs"
                    label="Observações"
                    id="provider-obs"
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
