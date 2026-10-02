"use client";

import { useFormikContext } from "formik";
import type { HTMLInputTypeAttribute } from "react";
import { FormField } from "../FormField";
import { getFieldClassName } from "../FieldStyles";

type FormInputProps<T extends Record<string, unknown>> = {
  name: keyof T & string;
  label: string;
  id?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  min?: number;
  className?: string;
  parseValue?: (raw: string) => T[keyof T];
};

export function FormInput<T extends Record<string, unknown>>({
  name,
  label,
  id,
  type = "text",
  placeholder,
  min,
  className,
  parseValue,
}: FormInputProps<T>) {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
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
      <input
        id={fieldId}
        name={name}
        type={type}
        min={min}
        placeholder={placeholder}
        value={values[name] as string | number}
        onChange={
          parseValue
            ? (event) => setFieldValue(name, parseValue(event.target.value))
            : handleChange
        }
        onBlur={handleBlur}
        className={getFieldClassName(Boolean(fieldError))}
      />
    </FormField>
  );
}
