/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Store } from "@/@types";
import {
  FormGroup,
  FormInput,
  FormSelect,
  MultiStepContext,
  MultiStepNextButton,
} from "@/components";
import { useEntitiesContext } from "@/context/Entities.context";
import { useContext } from "react";
import type { FieldError } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";
import { roleOptions } from "../Upsert.props";

export const GeneralStep = () => {
  const form = useFormContext();
  const { stores } = useEntitiesContext();

  const { changeStep } = useContext(MultiStepContext);

  async function handleNext() {
    await form.trigger();

    if (form.formState.isValid) {
      changeStep();
    }
  }

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
          name="phone"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormInput
              label="Telefone"
              error={form.formState.errors.phone as FieldError}
              {...field}
            />
          )}
        />
        <Controller
          name="login"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormInput
              label="Login"
              error={form.formState.errors.login as FieldError}
              {...field}
            />
          )}
        />
        <Controller
          name="role"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormSelect
              label="Nível"
              error={form.formState.errors.role as FieldError}
              options={roleOptions}
              {...field}
            />
          )}
        />
        <Controller
          name="storeId"
          control={form.control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormSelect
              label="Loja"
              error={form.formState.errors.storeId as FieldError}
              options={stores.map((store: Store) => ({
                value: store.mid,
                label: store.name,
              }))}
              {...field}
            />
          )}
        />
      </FormGroup>

      <MultiStepNextButton onClick={handleNext} label="Próximo" />
      {/* {props.user && (
        <div className="mt-8 flex justify-center">
          <div className="md:w-52">
            <ChangeActiveValueBtn
              label={`${data.isUserActive ? "Inativar" : "Ativar"} usuário`}
              onClick={() => {
                methods.handleChangeUserActiveStatus(props.user?.mid as string);
              }}
            />
          </div>
        </div>
      )} */}
    </div>
  );
};
