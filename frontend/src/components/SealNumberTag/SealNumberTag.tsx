import type { ReactNode } from "react";

type SealNumberTagProps = {
  number?: number;
  children?: ReactNode;
  className?: string;
};

const tagClass =
  "inline-flex items-center rounded-sm border border-kyowa-border bg-kyowa-surface px-2 py-1 text-sm font-medium text-kyowa-ink";

export function SealNumberTag({
  number,
  children,
  className,
}: SealNumberTagProps) {
  const content = children ?? number;

  return (
    <span className={className ? `${tagClass} ${className}` : tagClass}>
      {content}
    </span>
  );
}