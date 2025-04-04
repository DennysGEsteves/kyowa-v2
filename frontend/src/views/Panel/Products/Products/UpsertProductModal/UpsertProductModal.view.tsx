"use client";

import { FormModal } from "@/components";
import {
  FormAutocomplete,
  FormBtnCancel,
  FormBtnSubmit,
  FormInput,
} from "@/components/Form";
import type { Product } from "@/@types/product";
import type { Dispatch, SetStateAction } from "react";
import { Controller } from "react-hook-form";
import { useLogic } from "./UpsertProductModal.logic";

export type UpsertProductModalType = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  product?: Product;
};

export const UpsertProductModal = (props: UpsertProductModalType) => {
  const { data, methods } = useLogic(props);

  return (
    <FormModal
      isOpen={props.openModal}
      onClose={() => props.setOpenModal(false)}
    >
      <FormModal.Header onClose={() => props.setOpenModal(false)}>
        Adicionar novo produto
      </FormModal.Header>
      <form onSubmit={methods.handleSubmit(methods.onSubmit)}>
        <FormModal.Body>
          <div className="flex gap-4">
            <div className="border-r border-gray-500 p-2">
              <ol className="relative mt-6 border-s border-gray-500 dark:text-gray-400">
                <li className="mb-10 ms-6  flex flex-col justify-center">
                  <span className="absolute -start-4 flex size-8 items-center justify-center rounded-full bg-green-200 ring-2 ring-green-500 dark:bg-green-900 ">
                    <svg
                      className="size-3.5 text-green-500 dark:text-green-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                  </span>
                  <h3 className="text-xl font-bold leading-tight">
                    Dados do produto
                  </h3>
                </li>
                <li className="mb-10 ms-6  flex flex-col justify-center">
                  <span className="absolute -start-4 flex size-8 items-center justify-center rounded-full bg-gray-600 text-white ring-2 ring-gray-500 ">
                    <span>2</span>
                  </span>
                  <h3 className="text-xl font-bold leading-tight">
                    Descritores
                  </h3>
                </li>
                <li className="mb-10 ms-6  flex flex-col justify-center">
                  <span className="absolute -start-4 flex size-8 items-center justify-center rounded-full bg-gray-600 text-white ring-2 ring-gray-500 ">
                    <span>3</span>
                  </span>
                  <h3 className="text-xl font-bold leading-tight">Lacres</h3>
                </li>
              </ol>
            </div>
            <div>
              <div className="md:flex md:items-center">
                <Controller
                  name="name"
                  control={data.control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormInput
                      label="Nome"
                      error={data.errors.name}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="md:flex md:items-center">
                <Controller
                  name="fantasyName"
                  rules={{ required: true }}
                  control={data.control}
                  render={({ field }) => (
                    <FormInput
                      label="Nome fantasia"
                      error={data.errors.fantasyName}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="md:flex md:items-center">
                <Controller
                  name="ref"
                  control={data.control}
                  render={({ field }) => (
                    <FormInput label="Ref" error={data.errors.ref} {...field} />
                  )}
                />
              </div>
              <div className="md:flex md:items-center">
                <Controller
                  name="ncm"
                  control={data.control}
                  render={({ field }) => (
                    <FormInput label="NCM" error={data.errors.ncm} {...field} />
                  )}
                />
              </div>
              <div className="md:flex md:items-center">
                <Controller
                  name="cst"
                  control={data.control}
                  render={({ field }) => (
                    <FormInput label="CST" error={data.errors.cst} {...field} />
                  )}
                />
              </div>
              <div className="md:flex md:items-center">
                <Controller
                  name="ean"
                  control={data.control}
                  render={({ field }) => (
                    <FormInput label="EAN" error={data.errors.ean} {...field} />
                  )}
                />
              </div>
              <div className="md:flex md:items-center">
                <Controller
                  name="buyBrice"
                  control={data.control}
                  render={({ field }) => (
                    <FormInput
                      label="VAlor de compra"
                      error={data.errors.buyBrice}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="md:flex md:items-center">
                <Controller
                  name="sellPrice"
                  control={data.control}
                  render={({ field }) => (
                    <FormInput
                      label="Valor de venda"
                      error={data.errors.sellPrice}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="md:flex md:items-center">
                <Controller
                  name="hasSeals"
                  control={data.control}
                  render={({ field }) => (
                    <FormInput
                      label="Possui lacres?"
                      error={data.errors.hasSeals}
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="md:flex md:items-center">
                <Controller
                  name="supplierId"
                  control={data.control}
                  render={({ field }) => (
                    <FormAutocomplete
                      label="Fornecedor"
                      error={data.errors.supplierId}
                      entity="SUPPLIERS"
                      field={field}
                    />
                  )}
                />
              </div>
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

export default UpsertProductModal;
