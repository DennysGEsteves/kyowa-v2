import type { ReactNode } from "react";

export type TableCardFieldItem = {
  label: string;
  value: ReactNode;
  className?: string;
};

type TableCardFieldsProps = {
  fields: TableCardFieldItem[];
};

export function TableCardFields({ fields }: TableCardFieldsProps) {
  return (
    <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
      {fields.map((field) => (
        <div key={field.label} className={field.className}>
          <dt className="text-xs uppercase tracking-wide text-kyowa-muted">
            {field.label}
          </dt>
          <dd className="text-kyowa-ink">{field.value}</dd>
        </div>
      ))}
    </dl>
  );
}
