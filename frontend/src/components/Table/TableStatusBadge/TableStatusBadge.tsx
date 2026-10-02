type TableStatusBadgeProps = {
  active: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
};

export function TableStatusBadge({
  active,
  activeLabel = "Ativo",
  inactiveLabel = "Inativo",
}: TableStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
        active
          ? "bg-emerald-50 text-emerald-700"
          : "bg-zinc-100 text-zinc-600"
      }`}
    >
      {active ? activeLabel : inactiveLabel}
    </span>
  );
}
