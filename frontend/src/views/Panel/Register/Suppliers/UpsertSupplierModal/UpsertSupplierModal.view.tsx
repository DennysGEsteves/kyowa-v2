"use client";

import { FormModal } from "@/components";
import { FormBtnCancel, FormBtnSubmit, FormInput } from "@/components/Form";
import type { Supplier } from "@/types";
import type { Dispatch, SetStateAction } from "react";
import { Controller } from "react-hook-form";
import { useLogic } from "./UpsertSupplierModal.logic";

export type UpsertSupplierModalType = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  supplier?: Supplier;
};

export const UpsertSupplierModal = (props: UpsertSupplierModalType) => {
  const { data, methods } = useLogic(props);

  return (
    <FormModal
      isOpen={props.openModal}
      onClose={() => props.setOpenModal(false)}
    >
      <FormModal.Header onClose={() => props.setOpenModal(false)}>
        Adicionar novo fornecedor
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
              name="cnpj"
              control={data.control}
              render={({ field }) => (
                <FormInput label="CNPJ" error={data.errors.cnpj} {...field} />
              )}
            />
          </div>
          <div className="md:flex md:items-center">
            <Controller
              name="im"
              control={data.control}
              render={({ field }) => (
                <FormInput label="IM" error={data.errors.im} {...field} />
              )}
            />
          </div>
          <div className="md:flex md:items-center">
            <Controller
              name="ie"
              control={data.control}
              render={({ field }) => (
                <FormInput label="IE" error={data.errors.ie} {...field} />
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

export default UpsertSupplierModal;
