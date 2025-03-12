"use client";

import { FormModal } from "@/components";
import {
  FormBtnCancel,
  FormBtnSubmit,
  FormDatepicker,
  FormInput,
  FormSelect,
} from "@/components/Form";
import type { User } from "@/types";
import type { Architect } from "@/types/architect";
import type { Dispatch, SetStateAction } from "react";
import { Controller } from "react-hook-form";
import { useLogic } from "./UpsertArchitectModal.logic";

export type UpsertArchitectModalType = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  architect?: Architect;
};

export const UpsertArchitectModal = (props: UpsertArchitectModalType) => {
  const { data, methods } = useLogic(props);

  return (
    <FormModal
      isOpen={props.openModal}
      onClose={() => props.setOpenModal(false)}
    >
      <FormModal.Header onClose={() => props.setOpenModal(false)}>
        Adicionar novo arquiteto
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
              name="address"
              control={data.control}
              render={({ field }) => (
                <FormInput
                  label="Endereço"
                  error={data.errors.address}
                  {...field}
                />
              )}
            />
          </div>
          <div className="md:flex md:items-center">
            <Controller
              name="phone"
              control={data.control}
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
              name="cpf"
              control={data.control}
              render={({ field }) => (
                <FormInput label="CPF" error={data.errors.cpf} {...field} />
              )}
            />
          </div>
          <div className="md:flex md:items-center">
            <Controller
              name="birthday"
              control={data.control}
              render={({ field }) => (
                <FormDatepicker
                  label="Data de Nascimento"
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date: Date) => field.onChange(date)}
                />
              )}
            />
          </div>
          <div className="md:flex md:items-center">
            <Controller
              name="sellerId"
              control={data.control}
              render={({ field }) => (
                <FormSelect
                  label="Vendedor"
                  error={data.errors.sellerId}
                  options={data.managers.map((manager: User) => ({
                    value: manager.mid,
                    label: manager.name,
                  }))}
                  {...field}
                />
              )}
            />
          </div>
          <div className="md:flex md:items-center">
            <Controller
              name="obs"
              control={data.control}
              render={({ field }) => (
                <FormInput label="Obs" error={data.errors.obs} {...field} />
              )}
            />
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

export default UpsertArchitectModal;
