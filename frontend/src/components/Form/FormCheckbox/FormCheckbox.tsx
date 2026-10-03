"use client";

import { useFormikContext } from "formik";
import { FormFieldError } from "../FormFieldError";

type FormCheckboxProps<T extends Record<string, unknown>> = {
  name: keyof T & string;
  label: string;
  id?: string;
  className?: string;
  disabled?: boolean;
};

export function FormCheckbox<T extends Record<string, unknown>>({
  name,
  label,
  id,
  className = "",
  disabled = false,
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
        className={`flex items-center gap-3 text-sm text-kyowa-ink ${
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        }`}
      >
        <input
          id={fieldId}
          type="checkbox"
          name={name}
          checked={Boolean(values[name])}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          className="h-4 w-4 rounded border-kyowa-border text-kyowa-maroon focus:ring-kyowa-maroon disabled:cursor-not-allowed"
        />
        {label}
      </label>
      <FormFieldError message={errorMessage} />
    </div>
  );
}
