"use client";

import { maskCurrencyBRLInput } from "@/utils/masks";
import { getFormikFieldError, getFormikFieldValue } from "../formikField";
import { useFormikContext } from "formik";
import { FormField } from "../FormField";
import { getFieldClassName } from "../FieldStyles";

type FormCurrencyInputProps = {
  name: string;
  label: string;
  id?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export function FormCurrencyInput({
  name,
  label,
  id,
  placeholder = "0,00",
  className,
  disabled = false,
}: FormCurrencyInputProps) {
  const { values, errors, touched, handleBlur, setFieldValue } =
    useFormikContext();

  const fieldId = id ?? name;
  const errorMessage = getFormikFieldError(touched, errors, name);
  const fieldError = Boolean(errorMessage);

  const rawValue = getFormikFieldValue(values, name);
  const displayValue = typeof rawValue === "string" ? rawValue : "";

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
        type="text"
        inputMode="decimal"
        placeholder={placeholder}
        value={displayValue}
        onChange={(event) =>
          setFieldValue(name, maskCurrencyBRLInput(event.target.value))
        }
        onBlur={handleBlur}
        disabled={disabled}
        className={getFieldClassName(Boolean(fieldError))}
      />
    </FormField>
  );
}
