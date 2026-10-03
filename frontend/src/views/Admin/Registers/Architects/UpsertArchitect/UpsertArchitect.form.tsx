"use client";

import {
  FormActions,
  FormBody,
  FormCheckbox,
  FormAddressFields,
  FormColumn,
  FormContactFields,
  FormCpfInput,
  FormInput,
  FormSelect,
  FormTextarea,
  FormTwoColumns,
  formFieldGrid2,
  formSectionStack,
  formSectionTitle,
} from "@/components/Form";
import { AdminFormLayout } from "@/layout/AdminFormLayout";
import type { Architect } from "@entities";
import { FormikProvider } from "formik";
import { useUpsertArchitectLogic } from "./UpsertArchitect.logic";

type UpsertArchitectFormProps = {
  architect?: Architect;
  listHref?: string;
};

export function UpsertArchitectForm({
  architect,
  listHref,
}: UpsertArchitectFormProps) {
  const {
    formik,
    sellerOptions,
    navigateBack,
    title,
    isEdit,
    backLabel,
    listHref: backHref,
  } = useUpsertArchitectLogic({ architect, listHref });

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
                    <FormInput name="name" label="Nome" id="architect-name" />
                    <FormCpfInput name="cpf" label="CPF" id="architect-cpf" />
                    <FormInput
                      name="nasc"
                      label="Data de nascimento"
                      id="architect-nasc"
                      type="date"
                    />
                  </div>
                  <FormSelect
                    name="sellerId"
                    label="Vendedor responsável"
                    id="architect-seller"
                    options={sellerOptions}
                  />
                </section>

                <section className={formSectionStack}>
                  <p className={formSectionTitle}>Contato</p>
                  <FormContactFields idPrefix="architect" />
                </section>
              </FormColumn>

              <FormColumn>
                <section className={formSectionStack}>
                  <p className={formSectionTitle}>Endereço</p>
                  <FormAddressFields idPrefix="architect" />
                </section>

                <FormTextarea name="obs" label="Observações" id="architect-obs" />

                <FormCheckbox
                  name="active"
                  label="Arquiteto ativo"
                  id="architect-active"
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
