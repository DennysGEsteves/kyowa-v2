"use client";

import { useFormikContext } from "formik";
import { FormFieldError } from "../FormFieldError";

type FormToggleProps<T extends Record<string, unknown>> = {
  name: keyof T & string;
  label: string;
  id?: string;
  className?: string;
  disabled?: boolean;
};

export function FormToggle<T extends Record<string, unknown>>({
  name,
  label,
  id,
  className = "",
  disabled = false,
}: FormToggleProps<T>) {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<T>();

  const fieldId = id ?? name;
  const fieldError = touched[name] && errors[name];
  const errorMessage = fieldError ? String(errors[name]) : undefined;
  const checked = Boolean(values[name]);

  return (
    <div className={className}>
      <label
        htmlFor={fieldId}
        className={`flex items-center justify-between gap-4 ${
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        }`}
      >
        <span className="text-sm font-medium text-kyowa-ink">{label}</span>
        <span className="relative inline-flex h-7 w-12 shrink-0">
          <input
            id={fieldId}
            type="checkbox"
            role="switch"
            name={name}
            checked={checked}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            aria-checked={checked}
            className="peer sr-only"
          />
          <span
            aria-hidden
            className="absolute inset-0 rounded-full border border-kyowa-border bg-kyowa-surface transition-colors peer-checked:border-kyowa-maroon peer-checked:bg-kyowa-maroon peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-kyowa-maroon peer-disabled:cursor-not-allowed"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute left-0.5 top-0.5 block h-6 w-6 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-5"
          />
        </span>
      </label>
      <FormFieldError message={errorMessage} />
    </div>
  );
}
