"use client";

import { useFormikContext } from "formik";
import type { HTMLInputTypeAttribute } from "react";
import { FormField } from "../FormField";
import { getFieldClassName } from "../FieldStyles";

type FormInputProps = {
  name: string;
  label: string;
  id?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  min?: number;
  className?: string;
  parseValue?: (raw: string) => unknown;
};

export function FormInput({
  name,
  label,
  id,
  type = "text",
  placeholder,
  min,
  className,
  parseValue,
}: FormInputProps) {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    useFormikContext();

  const fieldId = id ?? name;
  const fieldError =
    touched[name as keyof typeof touched] &&
    errors[name as keyof typeof errors];
  const errorMessage = fieldError
    ? String(errors[name as keyof typeof errors])
    : undefined;

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
        value={(values as Record<string, unknown>)[name] as string | number}
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
