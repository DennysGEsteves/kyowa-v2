"use client";

import {
  FormActions,
  FormBody,
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
import type { Store } from "@entities";
import { FormikProvider } from "formik";
import { useUpsertStoreLogic } from "./UpsertStore.logic";

type UpsertStoreFormProps = {
  store?: Store;
  listHref?: string;
};

export function UpsertStoreForm({ store, listHref }: UpsertStoreFormProps) {
  const {
    formik,
    managerOptions,
    navigateBack,
    title,
    isEdit,
    backLabel,
    listHref: backHref,
  } = useUpsertStoreLogic({ store, listHref });

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
                    <FormInput name="name" label="Nome da loja" id="store-name" />
                    <FormSelect
                      name="managerId"
                      label="Gerente responsável"
                      id="store-manager"
                      options={managerOptions}
                    />
                  </div>
                </FormSection>

                <FormSection title="Endereço">
                  <FormAddressFields idPrefix="store" />
                </FormSection>
              </FormSectionsColumn>

              <FormSectionsColumn>
                <FormSection title="Contato">
                  <FormContactFields idPrefix="store" />
                </FormSection>

                <FormSection title="Observações">
                  <FormTextarea name="obs" label="Observações" id="store-obs" />
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
