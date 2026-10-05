"use client";

import {
  FormActions,
  FormBody,
  FormCheckbox,
  FormInput,
  FormPhoneInput,
  FormSection,
  FormSectionsColumn,
  FormSectionsGrid,
  FormSelect,
  formFieldGrid2,
} from "@/components/Form";
import { AdminFormLayout } from "@/app/(layout)/AdminFormLayout";
import type { User } from "@entities";
import { FormikProvider } from "formik";
import { useUpsertUserLogic } from "./UpsertUser.logic";

type UpsertUserFormProps = {
  user?: User;
  listHref?: string;
};

export function UpsertUserForm({ user, listHref }: UpsertUserFormProps) {
  const {
    formik,
    permissionOptions,
    storeOptions,
    navigateBack,
    title,
    isEdit,
    backLabel,
    listHref: backHref,
  } = useUpsertUserLogic({ user, listHref });

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
                <FormSection title="Dados pessoais">
                  <div className={formFieldGrid2}>
                    <FormInput name="name" label="Nome" id="user-name" />
                    <FormInput
                      name="email"
                      label="E-mail"
                      id="user-email"
                      type="email"
                    />
                    <FormPhoneInput
                      name="phone"
                      label="Telefone"
                      id="user-phone"
                    />
                    <FormInput name="login" label="Login" id="user-login" />
                  </div>
                </FormSection>
              </FormSectionsColumn>

              <FormSectionsColumn>
                <FormSection title="Acesso">
                  <div className={formFieldGrid2}>
                    <FormSelect
                      name="permission"
                      label="Permissão"
                      id="user-permission"
                      options={permissionOptions}
                    />
                    <FormSelect
                      name="storeId"
                      label="Loja"
                      id="user-store"
                      options={storeOptions}
                    />
                  </div>
                  <FormCheckbox
                    name="active"
                    label="Usuário ativo"
                    id="user-active"
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
