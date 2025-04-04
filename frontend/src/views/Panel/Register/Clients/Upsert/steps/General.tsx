/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InterestProductType, OriginType } from "@/@types";
import { interestProductMap, originMap } from "@/@types";
import {
  FormAutocomplete,
  FormCheckboxGroup,
  FormDatepicker,
  FormGroup,
  FormInput,
  MultiStepSubmitButton,
} from "@/components";
import type { FieldError } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";

export const GeneralStep = () => {
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
          name="email"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormInput
              error={form.formState.errors.email as FieldError}
              label="Email"
              {...field}
            />
          )}
        />
        <Controller
          name="address"
          control={form.control}
          render={({ field }) => (
            <FormInput
              label="Endereço"
              error={form.formState.errors.address as FieldError}
              {...field}
            />
          )}
        />
        <Controller
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormInput
              label="Telefone"
              error={form.formState.errors.phone as FieldError}
              {...field}
            />
          )}
        />
        <Controller
          name="cpf"
          control={form.control}
          render={({ field }) => (
            <FormInput
              label="CPF"
              error={form.formState.errors.cpf as FieldError}
              {...field}
            />
          )}
        />
        <Controller
          name="rg"
          control={form.control}
          render={({ field }) => (
            <FormInput
              label="RG"
              error={form.formState.errors.rg as FieldError}
              {...field}
            />
          )}
        />
        <Controller
          name="occupation"
          control={form.control}
          render={({ field }) => (
            <FormInput
              label="Profissão"
              error={form.formState.errors.occupation as FieldError | undefined}
              {...field}
            />
          )}
        />
        <Controller
          name="birthday"
          control={form.control}
          render={({ field }) => (
            <FormDatepicker
              label="Data de Nascimento"
              selected={field.value ? new Date(field.value) : null}
              onChange={(date: Date | null) => field.onChange(date)}
            />
          )}
        />
        <Controller
          name="architectId"
          control={form.control}
          render={({ field }) => (
            <FormAutocomplete
              label="Arquiteto"
              error={
                form.formState.errors.architectId as FieldError | undefined
              }
              entity="ARCHITECTS"
              field={field}
            />
          )}
        />
        <Controller
          name="interestProducts"
          control={form.control}
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
        <Controller
          name="origins"
          control={form.control}
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
        <Controller
          name="obs"
          control={form.control}
          render={({ field }) => (
            <FormInput
              label="Obs"
              error={form.formState.errors.obs as FieldError | undefined}
              {...field}
            />
          )}
        />
      </FormGroup>
      <MultiStepSubmitButton label="criar cliente" />
      {/* <MultiStepNextButton onClick={handleNext} label="Próximo" /> */}
    </div>
  );
};
