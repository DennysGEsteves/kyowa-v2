import {
  normalizeSealStatus,
  sealStatusLabels,
  type SealStatus,
} from "@entities";

type SealStatusBadgeProps = {
  status: string | SealStatus;
  compact?: boolean;
};

const statusBadgeClass: Record<SealStatus, string> = {
  stock:
    "inline-flex rounded-sm border border-kyowa-border bg-kyowa-surface px-2 py-0.5 text-sm font-semibold text-kyowa-muted",
  sale:
    "inline-flex rounded-sm border border-sky-200 bg-sky-50 px-2 py-0.5 text-sm font-semibold text-sky-800",
};

export function SealStatusBadge({
  status,
  compact = false,
}: SealStatusBadgeProps) {
  const normalized = normalizeSealStatus(status);

  return (
    <span
      className={`${statusBadgeClass[normalized]}${compact ? " !px-2 !py-0.5" : ""}`}
    >
      {sealStatusLabels[normalized]}
    </span>
  );
}