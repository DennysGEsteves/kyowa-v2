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
                    <FormInput name="cpf" label="CPF" id="architect-cpf" />
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
                  <div className={formFieldGrid2}>
                    <FormInput
                      name="email"
                      label="E-mail"
                      id="architect-email"
                      type="email"
                    />
                    <FormPhoneInput name="phone1" label="Telefone 1" id="architect-phone1" />
                    <FormPhoneInput name="phone2" label="Telefone 2" id="architect-phone2" />
                  </div>
                </section>
              </FormColumn>

              <FormColumn>
                <section className={formSectionStack}>
                  <p className={formSectionTitle}>Endereço</p>
                  <div className={formAddressGridInColumn}>
                    <FormInput name="cep" label="CEP" id="architect-cep" />
                    <FormInput
                      name="region"
                      label="UF"
                      id="architect-region"
                      placeholder="SP"
                    />
                    <FormInput
                      name="address"
                      label="Endereço"
                      id="architect-address"
                      className="sm:col-span-2"
                    />
                    <FormInput name="district" label="Bairro" id="architect-district" />
                    <FormInput name="city" label="Cidade" id="architect-city" />
                  </div>
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
