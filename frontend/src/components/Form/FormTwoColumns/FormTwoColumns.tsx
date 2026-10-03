import { Children, type ReactNode } from "react";
import { formColumn } from "../formLayout";

type FormTwoColumnsProps = {
  children: ReactNode;
};

export function FormTwoColumns({ children }: FormTwoColumnsProps) {
  const columns = Children.toArray(children);

  if (columns.length === 1) {
    return <>{columns[0]}</>;
  }

  const [left, ...rightColumns] = columns;
  const right = (
    <>
      {rightColumns.map((column, index) => (
        <div key={index} className={index > 0 ? "mt-6" : undefined}>
          {column}
        </div>
      ))}
    </>
  );

  return (
    <>
      <div className="flex flex-col gap-8 md:hidden">
        <div className="border-b border-kyowa-border pb-8">{left}</div>
        <div>{right}</div>
      </div>

      <div className="hidden md:grid md:grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] md:items-stretch">
        <div className="pr-8">{left}</div>
        <div className="bg-kyowa-border" role="presentation" aria-hidden />
        <div className="pl-8">{right}</div>
      </div>
    </>
  );
}

type FormColumnProps = {
  children: ReactNode;
  className?: string;
};

export function FormColumn({ children, className = "" }: FormColumnProps) {
  return <div className={`${formColumn} ${className}`.trim()}>{children}</div>;
}
