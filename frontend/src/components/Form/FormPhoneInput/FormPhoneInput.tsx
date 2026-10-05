"use client";

import { formatPhoneBR } from "@/utils/masks";
import { getFormikFieldError, getFormikFieldValue } from "../formikField";
import { useFormikContext } from "formik";
import { FormField } from "../FormField";
import { getFieldClassName } from "../FieldStyles";

type FormPhoneInputProps = {
  name: string;
  label: string;
  id?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export function FormPhoneInput({
  name,
  label,
  id,
  placeholder = "(11) 99999-9999",
  className,
  disabled = false,
}: FormPhoneInputProps) {
  const { values, errors, touched, handleBlur, setFieldValue } =
    useFormikContext();

  const fieldId = id ?? name;
  const errorMessage = getFormikFieldError(touched, errors, name);
  const fieldError = Boolean(errorMessage);

  const rawValue = getFormikFieldValue(values, name);
  const displayValue =
    typeof rawValue === "string" ? formatPhoneBR(rawValue) : "";

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
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder={placeholder}
        value={displayValue}
        onChange={(event) =>
          setFieldValue(name, formatPhoneBR(event.target.value))
        }
        onBlur={handleBlur}
        disabled={disabled}
        className={getFieldClassName(Boolean(fieldError))}
      />
    </FormField>
  );
}
