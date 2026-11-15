import { isSaleClosed, type Sale } from "@entities";

type SalePaidBadgeProps = {
  paid: boolean;
  compact?: boolean;
  openLabel?: string;
  paidLabel?: string;
};

const openBadgeClass =
  "inline-flex rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-sm font-semibold text-sky-800";

const paidBadgeClass =
  "inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-sm font-semibold text-emerald-800";

export function SalePaidBadge({
  paid,
  compact = false,
  openLabel = "Em aberto",
  paidLabel = "Pago",
}: SalePaidBadgeProps) {
  const compactClass = compact ? " !px-2 !py-0.5" : "";

  return (
    <span className={`${paid ? paidBadgeClass : openBadgeClass}${compactClass}`}>
      {paid ? paidLabel : openLabel}
    </span>
  );
}

type SalePaidBadgeForSaleProps = {
  sale: Pick<Sale, "paidAt">;
  compact?: boolean;
};

export function SalePaidBadgeForSale({
  sale,
  compact,
}: SalePaidBadgeForSaleProps) {
  return <SalePaidBadge paid={isSaleClosed(sale)} compact={compact} />;
}