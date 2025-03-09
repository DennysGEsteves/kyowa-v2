"use client";

import { FormModal } from "@/components";
import {
  FormBtnCancel,
  FormBtnSubmit,
  FormCheckboxGroup,
  FormDatepicker,
  FormInput,
  FormSelect,
} from "@/components/Form";
import type { InterestProductType, OriginType } from "@/types/client";
import { interestProductMap, originMap, type Client } from "@/types/client";
import type { Dispatch, SetStateAction } from "react";
import { Controller } from "react-hook-form";
import { useLogic } from "./UpsertClientModal.logic";

export type UpsertClientModalType = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  client?: Client;
};

export const UpsertClientModal = (props: UpsertClientModalType) => {
  const { data, methods } = useLogic(props);

  return (
    <FormModal
      isOpen={props.openModal}
      onClose={() => props.setOpenModal(false)}
    >
      <FormModal.Header onClose={() => props.setOpenModal(false)}>
        Adicionar novo cliente
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
              name="rg"
              control={data.control}
              render={({ field }) => (
                <FormInput label="RG" error={data.errors.rg} {...field} />
              )}
            />
          </div>
          <div className="md:flex md:items-center">
            <Controller
              name="occupation"
              control={data.control}
              render={({ field }) => (
                <FormInput
                  label="Profissão"
                  error={data.errors.occupation}
                  {...field}
                />
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
                  selected={field.value ? new Date(field.value) : new Date()}
                  onChange={(date: Date) => field.onChange(date)}
                />
              )}
            />
          </div>
          <div className="md:flex md:items-center">
            <Controller
              name="architectId"
              control={data.control}
              render={({ field }) => (
                <FormSelect
                  label="Arquiteto"
                  error={data.errors.architectId}
                  options={[]}
                  // options={data.managers.map((manager: User) => ({
                  //   value: manager.mid,
                  //   label: manager.name,
                  // }))}
                  {...field}
                />
              )}
            />
          </div>
          <div className="md:flex md:items-center">
            <Controller
              name="interestProducts"
              control={data.control}
              render={({ field }) => (
                <FormCheckboxGroup
                  label="Produtos de interesse"
                  options={Object.keys(interestProductMap).map((id) => ({
                    name: interestProductMap[id as InterestProductType],
                    id,
                  }))}
                  field={field}
                />
              )}
            />
          </div>
          <div className="md:flex md:items-center">
            <Controller
              name="origins"
              control={data.control}
              render={({ field }) => (
                <FormCheckboxGroup
                  label="Procedência"
                  options={Object.keys(originMap).map((id) => ({
                    name: originMap[id as OriginType],
                    id,
                  }))}
                  field={field}
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

export default UpsertClientModal;
