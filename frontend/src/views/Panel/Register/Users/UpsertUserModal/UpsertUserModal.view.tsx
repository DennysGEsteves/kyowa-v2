"use client";

import { FormModal } from "@/components";
import {
  FormBtnCancel,
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
              render={({ field }) => <FormInput label="Nome" {...field} />}
            />
          </div>
          <div className="md:flex md:items-center">
            <Controller
              name="email"
              control={data.control}
              rules={{ required: true }}
              render={({ field }) => <FormInput label="Email" {...field} />}
            />
          </div>
          <div className="md:flex md:items-center">
            <Controller
              name="phone"
              control={data.control}
              rules={{ required: true }}
              render={({ field }) => <FormInput label="Telefone" {...field} />}
            />
          </div>
          <div className="md:flex md:items-center">
            <Controller
              name="login"
              control={data.control}
              rules={{ required: true }}
              render={({ field }) => <FormInput label="Login" {...field} />}
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
                  options={[
                    {
                      value: "admin",
                      label: "Admin",
                    },
                    {
                      value: "user",
                      label: "Usuário",
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
        </FormModal.Body>
        <FormModal.Footer>
          <div className="w-full gap-4 md:flex md:items-center">
            <div className="md:w-1/2">
              <FormBtnCancel onClose={() => props.setOpenModal(false)} />
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
