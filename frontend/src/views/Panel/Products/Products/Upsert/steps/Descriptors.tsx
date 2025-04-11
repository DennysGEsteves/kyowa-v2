/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormAutocomplete,
  FormGroup,
  FormInput,
  MultiStepSubmitButton,
} from "@/components";
import type { FieldError } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";

export const DescriptorsStep = () => {
  const form = useFormContext();

  return (
    <div>
      <FormGroup>
        <Controller
          name="name"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormInput
              label="Nome"
              error={form.formState.errors.name as FieldError}
              {...field}
            />
          )}
        />
        <Controller
          name="fantasyName"
          rules={{ required: true }}
          control={form.control}
          render={({ field }) => (
            <FormInput
              label="Nome fantasia"
              error={form.formState.errors.fantasyName as FieldError}
              {...field}
            />
          )}
        />
        <Controller
          name="ref"
          control={form.control}
          render={({ field }) => (
            <FormInput
              label="Ref"
              error={form.formState.errors.ref as FieldError}
              {...field}
            />
          )}
        />
        <Controller
          name="ncm"
          control={form.control}
          render={({ field }) => (
            <FormInput
              label="NCM"
              error={form.formState.errors.ncm as FieldError}
              {...field}
            />
          )}
        />
        <Controller
          name="cst"
          control={form.control}
          render={({ field }) => (
            <FormInput
              label="CST"
              error={form.formState.errors.cst as FieldError}
              {...field}
            />
          )}
        />
        <Controller
          name="ean"
          control={form.control}
          render={({ field }) => (
            <FormInput
              label="EAN"
              error={form.formState.errors.ean as FieldError}
              {...field}
            />
          )}
        />
        <Controller
          name="buyBrice"
          control={form.control}
          render={({ field }) => (
            <FormInput
              label="VAlor de compra"
              error={form.formState.errors.buyBrice as FieldError}
              {...field}
            />
          )}
        />
        <Controller
          name="sellPrice"
          control={form.control}
          render={({ field }) => (
            <FormInput
              label="Valor de venda"
              error={form.formState.errors.sellPrice as FieldError}
              {...field}
            />
          )}
        />
        <Controller
          name="hasSeals"
          control={form.control}
          render={({ field }) => (
            <FormInput
              label="Possui lacres?"
              error={form.formState.errors.hasSeals as FieldError}
              {...field}
            />
          )}
        />
        <Controller
          name="supplierId"
          control={form.control}
          render={({ field }) => (
            <FormAutocomplete
              label="Fornecedor"
              error={form.formState.errors.supplierId as FieldError}
              entity="SUPPLIERS"
              field={field}
            />
          )}
        />
      </FormGroup>
      <MultiStepSubmitButton label="criar usuário" />
    </div>
  );
};
