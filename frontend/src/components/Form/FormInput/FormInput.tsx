"use client";

import { getFormikFieldError, getFormikFieldValue } from "../formikField";
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
  disabled?: boolean;
  /** Somente leitura (ex.: preenchido pelo CEP), com aparência de campo travado */
  locked?: boolean;
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
  disabled = false,
  locked = false,
}: FormInputProps) {
  const {
    values,
    errors,
    touched,
    submitCount,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormikContext();

  const fieldId = id ?? name;
  const errorMessage = getFormikFieldError(
    touched,
    errors,
    name,
    submitCount,
  );
  const fieldError = Boolean(errorMessage);

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
        value={(getFormikFieldValue(values, name) as string | number) ?? ""}
        onChange={
          locked
            ? () => {}
            : parseValue
              ? (event) => setFieldValue(name, parseValue(event.target.value))
              : handleChange
        }
        onBlur={handleBlur}
        disabled={disabled}
        readOnly={locked}
        aria-readonly={locked || undefined}
        title={locked ? "Preenchido automaticamente pelo CEP" : undefined}
        className={getFieldClassName(Boolean(fieldError), undefined, {
          locked,
        })}
      />
    </FormField>
  );
}
