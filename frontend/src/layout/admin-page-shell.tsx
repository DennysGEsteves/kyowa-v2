"use client";

import { useAuth } from "@/contexts/Auth/auth-provider";
import { AdminHeader } from "./admin-header";
import type { ReactNode } from "react";

type AdminPageShellProps = {
  title: string;
  children?: ReactNode;
};

export function AdminPageShell({ title, children }: AdminPageShellProps) {
  const user = useAuth();

  return (
    <>
      <AdminHeader title={title} user={user} />
      <main className="flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        {children}
      </main>
    </>
  );
}

export function AdminPlaceholder() {
  return (
    <div className="rounded-sm border border-dashed border-kyowa-border bg-white px-4 py-12 text-center text-sm text-kyowa-muted sm:px-6 sm:py-16">
      Conteúdo em desenvolvimento.
    </div>
  );
}
