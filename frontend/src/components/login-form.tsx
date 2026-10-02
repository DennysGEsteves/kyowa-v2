"use client";

import { getClientSession, setClientSession } from "@util/auth/session";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { KyowaLogo } from "./kyowa-logo";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (getClientSession()) {
      router.replace("/admin/usuarios");
    }
  }, [router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nameFromEmail = email.split("@")[0]?.replace(/\./g, " ") ?? "Usuário";

    setClientSession({
      id: "session",
      email,
      name: nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1),
      permission: "admin",
      storeId: 1,
      active: true,
    });

    router.push("/admin/usuarios");
  }

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

      <form
        className="mt-6 space-y-5 sm:mt-8 sm:space-y-6"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-kyowa-ink"
          >
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full border-b border-kyowa-border bg-transparent px-1 py-2.5 text-base text-kyowa-ink outline-none transition focus:border-kyowa-maroon sm:text-sm"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-kyowa-ink"
          >
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full border-b border-kyowa-border bg-transparent px-1 py-2.5 text-base text-kyowa-ink outline-none transition focus:border-kyowa-maroon sm:text-sm"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-kyowa-maroon py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-kyowa-maroon-dark sm:py-3"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
