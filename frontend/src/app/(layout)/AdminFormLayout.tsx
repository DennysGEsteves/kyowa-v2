import Link from "next/link";
import type { ReactNode } from "react";

type AdminFormLayoutMaxWidth =
  | "md"
  | "lg"
  | "2xl"
  | "3xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "full";

const maxWidthClass: Record<AdminFormLayoutMaxWidth, string> = {
  md: "max-w-md",
  lg: "max-w-lg",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  full: "max-w-none",
};

type AdminFormLayoutProps = {
  backHref: string;
  backLabel: string;
  /** Limita a largura do card; padrão usa toda a área útil */
  maxWidth?: AdminFormLayoutMaxWidth;
  /** Compensa o padding do `main` para o card ir de borda a borda */
  bleed?: boolean;
  children: ReactNode;
};

export function AdminFormLayout({
  backHref,
  backLabel,
  maxWidth = "full",
  bleed = false,
  children,
}: AdminFormLayoutProps) {
  return (
    <>
      <div className="mb-4 sm:mb-6">
        <Link
          href={backHref}
          className="inline-flex items-center justify-center border border-kyowa-border bg-white px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-kyowa-ink transition hover:bg-kyowa-surface"
        >
          {backLabel}
        </Link>
      </div>

      <div className={bleed ? "-mx-4 sm:-mx-6 lg:-mx-8" : undefined}>
        <div
          className={`w-full overflow-hidden rounded-sm border border-kyowa-border bg-white shadow-sm ${maxWidthClass[maxWidth]}`}
        >
          {children}
        </div>
      </div>
    </>
  );
}
