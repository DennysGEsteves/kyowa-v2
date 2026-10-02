import type { ReactNode } from "react";

type TableCardHeaderProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  trailing?: ReactNode;
};

export function TableCardHeader({
  title,
  subtitle,
  trailing,
}: TableCardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="font-medium text-kyowa-ink">{title}</p>
        {subtitle ? (
          <p className="mt-1 truncate text-sm text-kyowa-muted">{subtitle}</p>
        ) : null}
      </div>
      {trailing}
    </div>
  );
}
