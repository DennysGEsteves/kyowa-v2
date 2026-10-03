"use client";

import { KyowaLogo } from "@images";
import { LoginForm } from "./components/LoginForm";
import { LoginLogic } from "./Login.logic";

export function LoginView() {
  const { data, methods } = LoginLogic();

  return (
    <div className="w-full max-w-md rounded-sm border border-kyowa-border bg-white p-6 shadow-sm sm:p-10">
      <div className="mb-8 flex justify-center sm:mb-10">
        <KyowaLogo />
      </div>

      <h1 className="font-serif text-xl text-kyowa-ink sm:text-2xl">
        Área administrativa
      </h1>
      <p className="mt-2 text-sm text-kyowa-muted">
        Entre com seu e-mail e senha para continuar.
      </p>

      <LoginForm
        onSubmit={methods.handleSubmit}
        isPending={data.isPending}
        errorMessage={data.errorMessage}
      />
    </div>
  );
}
