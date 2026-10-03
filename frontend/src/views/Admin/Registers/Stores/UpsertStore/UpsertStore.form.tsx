"use client";

import {
  FormActions,
  FormBody,
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
            <FormTwoColumns>
              <FormColumn>
                <section className={formSectionStack}>
                  <p className={formSectionTitle}>Dados gerais</p>
                  <div className={formFieldGrid2}>
                    <FormInput name="name" label="Nome da loja" id="store-name" />
                    <FormSelect
                      name="managerId"
                      label="Gerente responsável"
                      id="store-manager"
                      options={managerOptions}
                    />
                  </div>
                </section>

                <section className={formSectionStack}>
                  <p className={formSectionTitle}>Contato</p>
                  <FormContactFields idPrefix="store" />
                </section>
              </FormColumn>

              <FormColumn>
                <section className={formSectionStack}>
                  <p className={formSectionTitle}>Endereço</p>
                  <FormAddressFields idPrefix="store" />
                </section>

                <FormTextarea name="obs" label="Observações" id="store-obs" />
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
