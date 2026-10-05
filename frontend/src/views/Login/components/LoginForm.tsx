"use client";

import { ActionButton } from "@/components/Form/ActionButton";
import { FormInput } from "@/components/Form";
import {
  loginFormInitialValues,
  loginValidationSchema,
  type LoginFormSchema,
} from "@/views/Login/Login.schema";
import { FormikProvider, useFormik } from "formik";

type LoginFormProps = {
  onSubmit: (values: LoginFormSchema) => void;
  isPending: boolean;
  errorMessage: string | null;
};

export function LoginForm({
  onSubmit,
  isPending,
  errorMessage,
}: LoginFormProps) {
  const formik = useFormik<LoginFormSchema>({
    initialValues: loginFormInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: (values) => onSubmit(values),
  });

  return (
    <FormikProvider value={formik}>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-6 space-y-5 sm:mt-8 sm:space-y-6"
        noValidate
      >
        <FormInput
          name="email"
          label="E-mail"
          id="login-email"
          type="email"
          placeholder="seu@email.com"
        />

        <FormInput
          name="password"
          label="Senha"
          id="login-password"
          type="password"
          placeholder="••••••••"
        />

        {errorMessage ? (
          <p className="rounded-sm bg-red-50 px-3 py-2 text-sm text-red-700">
            {errorMessage}
          </p>
        ) : null}

        <ActionButton
          type="submit"
          variant="primary"
          className="w-full uppercase tracking-wider"
          disabled={isPending}
        >
          {isPending ? "Entrando..." : "Entrar"}
        </ActionButton>
      </form>
    </FormikProvider>
  );
}
