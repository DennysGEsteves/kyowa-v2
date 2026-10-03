"use client";

import { useApi } from "@/api/api.hook";
import { useInvalidateArchitectsQuery } from "@/api/Architects/architects.query";
import { useUsersQuery } from "@/api/Users/users.query";
import {
  FormActions,
  FormBody,
  FormCheckbox,
  FormInput,
  FormSelect,
  FormTextarea,
} from "@/components/Form";
import { permissionLabels, type Architect } from "@entities";
import { FormikProvider, useFormik } from "formik";
import { useEffect, useMemo } from "react";
import {
  architectToFormValues,
  architectValidationSchema,
  emptyArchitectFormValues,
  formValuesToUpsertArchitectDTO,
  type ArchitectFormSchema,
} from "../Architects.schema";

type UpsertArchitectModalProps = {
  open: boolean;
  architect?: Architect;
  onClose: (reload?: boolean) => void;
};

function UpsertArchitectModalBody({
  architect,
  onClose,
}: Omit<UpsertArchitectModalProps, "open">) {
  const { architectsApi } = useApi();
  const invalidateArchitects = useInvalidateArchitectsQuery();
  const { data: users = [] } = useUsersQuery();

  const defaultSellerId =
    architect?.sellerId ?? users.find((user) => user.active)?.id ?? "";

  const formik = useFormik<ArchitectFormSchema>({
    enableReinitialize: true,
    initialValues: architect
      ? architectToFormValues(architect)
      : { ...emptyArchitectFormValues, sellerId: defaultSellerId },
    validationSchema: architectValidationSchema,
    onSubmit: (values) => onSubmit(values),
  });

  const sellerOptions = useMemo(() => {
    const activeUsers = users.filter((user) => user.active);

    if (activeUsers.length === 0) {
      return [{ value: "", label: "Nenhum usuário cadastrado" }];
    }

    return activeUsers.map((user) => ({
      value: user.id,
      label: `${user.name} (${permissionLabels[user.permission]})`,
    }));
  }, [users]);

  const onSubmit = (values: ArchitectFormSchema) => {
    const payload = formValuesToUpsertArchitectDTO(values);

    if (architect) {
      architectsApi.update(architect.id, payload).then(() => {
        invalidateArchitects();
        onClose(true);
      });
    } else {
      architectsApi.create(payload).then(() => {
        invalidateArchitects();
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

  const title = architect ? "Editar arquiteto" : "Novo arquiteto";

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
        aria-labelledby="architect-form-title"
        className="relative z-10 flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-sm bg-white shadow-xl sm:max-h-[90vh] sm:rounded-sm"
      >
        <div className="border-b border-kyowa-border px-5 py-4 sm:px-6">
          <h2
            id="architect-form-title"
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

              <FormInput name="name" label="Nome" id="architect-name" />

              <div className="grid gap-4 sm:grid-cols-2">
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

              <p className="pt-2 text-xs font-semibold uppercase tracking-wider text-kyowa-muted">
                Contato
              </p>

              <FormInput
                name="email"
                label="E-mail"
                id="architect-email"
                type="email"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormInput name="phone1" label="Telefone 1" id="architect-phone1" />
                <FormInput name="phone2" label="Telefone 2" id="architect-phone2" />
              </div>

              <p className="pt-2 text-xs font-semibold uppercase tracking-wider text-kyowa-muted">
                Endereço
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <FormInput name="cep" label="CEP" id="architect-cep" />
                <FormInput
                  name="address"
                  label="Endereço"
                  id="architect-address"
                  className="sm:col-span-2"
                />
                <FormInput name="district" label="Bairro" id="architect-district" />
                <FormInput name="city" label="Cidade" id="architect-city" />
                <FormInput
                  name="region"
                  label="UF"
                  id="architect-region"
                  placeholder="SP"
                />
              </div>

              <FormTextarea name="obs" label="Observações" id="architect-obs" />

              <FormCheckbox
                name="active"
                label="Arquiteto ativo"
                id="architect-active"
              />
            </FormBody>

            <FormActions
              onCancel={() => onClose()}
              submitLabel={architect ? "Salvar" : "Adicionar"}
            />
          </form>
        </FormikProvider>
      </div>
    </div>
  );
}

export function UpsertArchitectModal({
  open,
  architect,
  onClose,
}: UpsertArchitectModalProps) {
  if (!open) return null;

  const formKey = architect ? `edit-${architect.id}` : "create";

  return (
    <UpsertArchitectModalBody
      key={formKey}
      architect={architect}
      onClose={onClose}
    />
  );
}
