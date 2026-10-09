import Link from "next/link";

export function AdminFormLoading() {
  return (
    <p className="text-sm text-kyowa-muted">Carregando formulário…</p>
  );
}

type AdminFormNotFoundProps = {
  backHref: string;
  backLabel: string;
  message: string;
};

export function AdminFormNotFound({
  backHref,
  backLabel,
  message,
}: AdminFormNotFoundProps) {
  return (
    <div className="space-y-4">
      <Link
        href={backHref}
        className="inline-flex items-center justify-center border border-kyowa-border bg-white px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-kyowa-ink transition hover:bg-kyowa-surface"
      >
        {backLabel}
      </Link>
      <p className="text-sm text-kyowa-muted">{message}</p>
    </div>
  );
}
