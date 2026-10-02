import { FormFieldError } from "../FormFieldError";
import { formLabelClass } from "../FieldStyles";
import type { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
  className?: string;
};

export function FormField({
  label,
  htmlFor,
  error,
  children,
  className = "",
}: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={formLabelClass}>
        {label}
      </label>
      {children}
      <FormFieldError message={error} />
    </div>
  );
}
