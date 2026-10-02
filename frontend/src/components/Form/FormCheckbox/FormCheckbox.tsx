"use client";

import { useFormikContext } from "formik";
import { FormFieldError } from "../FormFieldError";

type FormCheckboxProps<T extends Record<string, unknown>> = {
  name: keyof T & string;
  label: string;
  id?: string;
  className?: string;
};

export function FormCheckbox<T extends Record<string, unknown>>({
  name,
  label,
  id,
  className = "",
}: FormCheckboxProps<T>) {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<T>();

  const fieldId = id ?? name;
  const fieldError = touched[name] && errors[name];
  const errorMessage = fieldError ? String(errors[name]) : undefined;

  return (
    <div className={className}>
      <label
        htmlFor={fieldId}
        className="flex cursor-pointer items-center gap-3 text-sm text-kyowa-ink"
      >
        <input
          id={fieldId}
          type="checkbox"
          name={name}
          checked={Boolean(values[name])}
          onChange={handleChange}
          onBlur={handleBlur}
          className="h-4 w-4 rounded border-kyowa-border text-kyowa-maroon focus:ring-kyowa-maroon"
        />
        {label}
      </label>
      <FormFieldError message={errorMessage} />
    </div>
  );
}
