/* eslint-disable @typescript-eslint/no-explicit-any */
import type { User } from "@/@types";
import {
  FormDatepicker,
  FormGroup,
  FormInput,
  FormSelect,
  MultiStepSubmitButton,
} from "@/components";
import { useEntitiesContext } from "@/context/Entities.context";
import type { FieldError } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";

export const GeneralStep = () => {
  const form = useFormContext();

  const { managers } = useEntitiesContext();

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
          name="sellerId"
          control={form.control}
          render={({ field }) => (
            <FormSelect
              label="Vendedor"
              error={form.formState.errors.sellerId as FieldError | undefined}
              options={managers.map((manager: User) => ({
                value: manager.mid,
                label: manager.name,
              }))}
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
      <MultiStepSubmitButton label="criar cliente" />
      {/* <MultiStepNextButton onClick={handleNext} label="Próximo" /> */}
    </div>
  );
};
