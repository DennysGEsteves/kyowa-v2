"use client";

import { useApi } from "@/api/api.hook";
import { useInvalidateStoresQuery } from "@/api/Stores/stores.query";
import { useUsersQuery } from "@/api/Users/users.query";
import {
  FormActions,
  FormBody,
  FormInput,
  FormSelect,
  FormTextarea,
} from "@/components/Form";
import { permissionLabels, type Store } from "@entities";
import { FormikProvider, useFormik } from "formik";
import { useEffect, useMemo } from "react";
import {
  emptyStoreFormValues,
  formValuesToUpsertStoreDTO,
  storeToFormValues,
  storeValidationSchema,
  type StoreFormSchema,
} from "../Stores.schema";

type UpsertStoreModalProps = {
  open: boolean;
  store?: Store;
  onClose: (reload?: boolean) => void;
};

function UpsertStoreModalBody({
  store,
  onClose,
}: Omit<UpsertStoreModalProps, "open">) {
  const { storesApi } = useApi();
  const invalidateStores = useInvalidateStoresQuery();
  const { data: users = [] } = useUsersQuery();

  const formik = useFormik<StoreFormSchema>({
    initialValues: store ? storeToFormValues(store) : emptyStoreFormValues,
    validationSchema: storeValidationSchema,
    onSubmit: (values) => onSubmit(values),
  });

  const managerOptions = useMemo(
    () => [
      { value: "", label: "Nenhum" },
      ...users
        .filter((user) => user.active)
        .filter((user) => user.permission === "manager")
        .map((user) => ({
          value: user.id,
          label: `${user.name} (${permissionLabels[user.permission]})`,
        })),
    ],
    [users],
  );

  const onSubmit = (values: StoreFormSchema) => {
    if (store) {
      const payload = formValuesToUpsertStoreDTO(values, true);
      storesApi.update(store.id, payload).then(() => {
        invalidateStores();
        onClose(true);
      });
    } else {
      const payload = formValuesToUpsertStoreDTO(values);
      storesApi.create(payload).then(() => {
        invalidateStores();
        onClose(true);
      });
    }
  };

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const title = store ? "Editar loja" : "Nova loja";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 bg-black/50"
        onClick={() => onClose()}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="store-form-title"
        className="relative z-10 flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-sm bg-white shadow-xl sm:max-h-[90vh] sm:rounded-sm"
      >
        <div className="border-b border-kyowa-border px-5 py-4 sm:px-6">
          <h2
            id="store-form-title"
            className="font-serif text-xl text-kyowa-ink sm:text-2xl"
          >
            {title}
          </h2>
        </div>

        <FormikProvider value={formik}>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-1 flex-col overflow-hidden"
            noValidate
          >
            <FormBody>
              <p className="text-xs font-semibold uppercase tracking-wider text-kyowa-muted">
                Dados gerais
              </p>

              <FormInput name="name" label="Nome da loja" id="store-name" />

              <FormSelect
                name="managerId"
                label="Gerente responsável"
                id="store-manager"
                options={managerOptions}
              />

              <p className="pt-2 text-xs font-semibold uppercase tracking-wider text-kyowa-muted">
                Contato
              </p>

              <FormInput
                name="email"
                label="E-mail"
                id="store-email"
                type="email"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormInput name="phone1" label="Telefone 1" id="store-phone1" />
                <FormInput name="phone2" label="Telefone 2" id="store-phone2" />
              </div>

              <p className="pt-2 text-xs font-semibold uppercase tracking-wider text-kyowa-muted">
                Endereço
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <FormInput name="cep" label="CEP" id="store-cep" />
                <FormInput
                  name="address"
                  label="Endereço"
                  id="store-address"
                  className="sm:col-span-2"
                />
                <FormInput name="district" label="Bairro" id="store-district" />
                <FormInput name="city" label="Cidade" id="store-city" />
                <FormInput
                  name="region"
                  label="UF"
                  id="store-region"
                  placeholder="SP"
                />
              </div>

              <FormTextarea name="obs" label="Observações" id="store-obs" />
            </FormBody>

            <FormActions
              onCancel={() => onClose()}
              submitLabel={store ? "Salvar" : "Adicionar"}
            />
          </form>
        </FormikProvider>
      </div>
    </div>
  );
}

export function UpsertStoreModal({
  open,
  store,
  onClose,
}: UpsertStoreModalProps) {
  if (!open) return null;

  const formKey = store ? `edit-${store.id}` : "create";

  return <UpsertStoreModalBody key={formKey} store={store} onClose={onClose} />;
}
