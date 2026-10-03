import type { ReactNode } from "react";
import { formSectionBlock, formSectionTitle } from "../formLayout";

type FormSectionProps = {
  title: string;
  children: ReactNode;
  /** Ex.: `md:col-span-2` para bloco em largura total */
  className?: string;
};

export function FormSection({
  title,
  children,
  className = "",
}: FormSectionProps) {
  return (
    <section className={`${formSectionBlock} ${className}`.trim()}>
      <p className={formSectionTitle}>{title}</p>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
