"use client";

import { FormModal } from "@/components";
import {
  FormBtnAction,
  FormBtnCancel,
  FormBtnDanger,
  FormBtnSubmit,
  FormInput,
  FormSelect,
} from "@/components/Form";
import type { User } from "@/types/user";
import type { Dispatch, SetStateAction } from "react";
import { Controller } from "react-hook-form";
import { useLogic } from "./UpsertUserModal.logic";

export type UpsertUserModalType = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  user?: User;
};

export const UpsertUserModal = (props: UpsertUserModalType) => {
  const { data, methods } = useLogic(props);

  const ChangeActiveValueBtn = data.isUserActive
    ? FormBtnDanger
    : FormBtnAction;

  return (
    <FormModal
      isOpen={props.openModal}
      onClose={() => props.setOpenModal(false)}
    >
      <FormModal.Header onClose={() => props.setOpenModal(false)}>
        Adicionar novo usuário
      </FormModal.Header>
      <form onSubmit={methods.handleSubmit(methods.onSubmit)}>
        <FormModal.Body>
          <div className="md:flex md:items-center">
            <Controller
              name="name"
              control={data.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormInput label="Nome" error={data.errors.name} {...field} />
              )}
            />
          </div>
          <div className="md:flex md:items-center">
            <Controller
              name="email"
              control={data.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormInput error={data.errors.email} label="Email" {...field} />
              )}
            />
          </div>
          <div className="md:flex md:items-center">
            <Controller
              name="phone"
              control={data.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormInput
                  label="Telefone"
                  error={data.errors.phone}
                  {...field}
                />
              )}
            />
          </div>
          <div className="md:flex md:items-center">
            <Controller
              name="login"
              control={data.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormInput label="Login" error={data.errors.login} {...field} />
              )}
            />
          </div>
          <div className="md:flex md:items-center">
            <Controller
              name="role"
              control={data.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormSelect
                  label="Nível"
                  error={data.errors.role}
                  options={[
                    {
                      value: "ADMIN",
                      label: "Admin",
                    },
                    {
                      value: "MANAGER",
                      label: "Gerente",
                    },
                  ]}
                  {...field}
                />
              )}
            />
          </div>
          <div className="md:flex md:items-center">
            <Controller
              name="storeId"
              control={data.control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormSelect
                  label="Loja"
                  error={data.errors.storeId}
                  options={[
                    {
                      value: "f0ewevvsdjvsjdv",
                      label: "Canal 3",
                    },
                    {
                      value: "m9vjs9di923r-09f",
                      label: "Shopping",
                    },
                  ]}
                  {...field}
                />
              )}
            />
          </div>
          <div className="mt-8 flex justify-center">
            <div className="md:w-52">
              <ChangeActiveValueBtn
                label={`${data.isUserActive ? "Inativar" : "Ativar"} usuário`}
                onClick={() => {
                  methods.handleChangeUserActiveStatus(
                    props.user?.id as number,
                  );
                }}
              />
            </div>
          </div>
        </FormModal.Body>
        <FormModal.Footer>
          <div className="w-full gap-4 md:flex md:items-center">
            <div className="md:w-1/2">
              <FormBtnCancel onClick={() => props.setOpenModal(false)} />
            </div>
            <div className="md:w-1/2">
              <FormBtnSubmit
                label={data.isLoading ? "Enviando..." : "Enviar"}
                isLoading={data.isLoading}
              />
            </div>
          </div>
        </FormModal.Footer>
      </form>
    </FormModal>
  );
};

export default UpsertUserModal;
