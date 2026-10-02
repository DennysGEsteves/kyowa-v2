"use client";

import { useApi } from "@/api/api.hook";
import { useStoresQuery } from "@/api/Stores/stores.query";
import { UpsertUserDTO } from "@/api/Users";
import { useInvalidateUsersQuery } from "@/api/Users/users.query";
import {
  FormActions,
  FormBody,
  FormCheckbox,
  FormInput,
  FormSelect,
} from "@/components/Form";
import { permissionLabels, User, userPermissions } from "@entities";
import {
  formSchema,
  userValidationSchema,
} from "@/views/Admin/Registers/Users/Users.schema";
import { FormikProvider, useFormik } from "formik";
import { useEffect, useMemo } from "react";

type UpsertUserModalProps = {
  open: boolean;
  user?: User;
  onClose: (reload?: boolean) => void;
};

function UpsertUserModalBody({
  user,
  onClose,
}: Omit<UpsertUserModalProps, "open">) {
  const { usersApi } = useApi();
  const invalidateUsers = useInvalidateUsersQuery();
  const { data: stores = [] } = useStoresQuery();

  const defaultStoreId = user?.storeId ?? stores[0]?.id ?? "";

  const formik = useFormik<formSchema>({
    enableReinitialize: true,
    initialValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      login: user?.login ?? "",
      permission: user?.permission ?? "sales",
      storeId: defaultStoreId,
      active: user?.active ?? true,
    },
    validationSchema: userValidationSchema,
    onSubmit: (values) => onSubmit(values),
  });

  const permissionOptions = useMemo(
    () =>
      userPermissions.map((permission) => ({
        value: permission,
        label: permissionLabels[permission],
      })),
    [],
  );

  const storeOptions = useMemo(() => {
    if (stores.length === 0) {
      return [{ value: "", label: "Nenhuma loja cadastrada" }];
    }

    return stores.map((store) => ({
      value: store.id,
      label: store.name,
    }));
  }, [stores]);

  const onSubmit = (values: formSchema) => {
    console.log(values);
    const userData: UpsertUserDTO = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      login: values.login,
      permission: values.permission,
      storeId: values.storeId,
      active: values.active,
    };

    if (user) {
      usersApi.update(user.id, userData).then(() => {
        invalidateUsers();
        onClose(true);
      });
    } else {
      usersApi.create(userData).then(() => {
        invalidateUsers();
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

  const title = user ? "Editar usuário" : "Novo usuário";

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
        aria-labelledby="user-form-title"
        className="relative z-10 flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-sm bg-white shadow-xl sm:max-h-[90vh] sm:rounded-sm"
      >
        <div className="border-b border-kyowa-border px-5 py-4 sm:px-6">
          <h2
            id="user-form-title"
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
              <FormInput name="name" label="Nome" id="user-name" />

              <FormInput
                name="email"
                label="E-mail"
                id="user-email"
                type="email"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormInput
                  name="phone"
                  label="Telefone"
                  id="user-phone"
                  placeholder="(11) 99999-9999"
                />
                <FormInput name="login" label="Login" id="user-login" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
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
            </FormBody>

            <FormActions
              onCancel={() => onClose()}
              submitLabel={user ? "Salvar" : "Adicionar"}
            />
          </form>
        </FormikProvider>
      </div>
    </div>
  );
}

export function UpsertUserModal({ open, user, onClose }: UpsertUserModalProps) {
  if (!open) return null;

  const formKey = user ? `edit-${user.id}` : "create";

  return <UpsertUserModalBody key={formKey} user={user} onClose={onClose} />;
}
