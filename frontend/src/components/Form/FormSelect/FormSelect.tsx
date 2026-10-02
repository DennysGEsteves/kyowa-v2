"use client";

import { useFormikContext } from "formik";
import { FormField } from "../FormField";
import { getFieldClassName } from "../FieldStyles";

export type FormSelectOption = {
  value: string;
  label: string;
};

type FormSelectProps<T extends Record<string, unknown>> = {
  name: keyof T & string;
  label: string;
  id?: string;
  options: FormSelectOption[];
  className?: string;
};

export function FormSelect<T extends Record<string, unknown>>({
  name,
  label,
  id,
  options,
  className,
}: FormSelectProps<T>) {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<T>();

  const fieldId = id ?? name;
  const fieldError = touched[name] && errors[name];
  const errorMessage = fieldError ? String(errors[name]) : undefined;

  return (
    <FormField
      label={label}
      htmlFor={fieldId}
      error={errorMessage}
      className={className}
    >
      <select
        id={fieldId}
        name={name}
        value={values[name] as string}
        onChange={handleChange}
        onBlur={handleBlur}
        className={getFieldClassName(Boolean(fieldError))}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}
