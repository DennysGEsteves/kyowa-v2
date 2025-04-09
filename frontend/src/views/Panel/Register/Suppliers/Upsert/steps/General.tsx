/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormGroup, FormInput, MultiStepSubmitButton } from "@/components";
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
          name="cnpj"
          control={form.control}
          render={({ field }) => (
            <FormInput
              label="CNPJ"
              error={form.formState.errors.cnpj as FieldError}
              {...field}
            />
          )}
        />
        <Controller
          name="im"
          control={form.control}
          render={({ field }) => (
            <FormInput
              label="IM"
              error={form.formState.errors.im as FieldError}
              {...field}
            />
          )}
        />
        <Controller
          name="ie"
          control={form.control}
          render={({ field }) => (
            <FormInput
              label="IE"
              error={form.formState.errors.ie as FieldError}
              {...field}
            />
          )}
        />
        <Controller
          name="obs"
          control={form.control}
          render={({ field }) => (
            <FormInput
              label="Obs"
              error={form.formState.errors.obs as FieldError}
              {...field}
            />
          )}
        />
      </FormGroup>
      <MultiStepSubmitButton label="criar fornecedor" />
    </div>
  );
};
