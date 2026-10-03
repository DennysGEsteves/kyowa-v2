"use client";

import { formatCpfBR } from "@/util/masks";
import { getFormikFieldError, getFormikFieldValue } from "../formikField";
import { useFormikContext } from "formik";
import { FormField } from "../FormField";
import { getFieldClassName } from "../FieldStyles";

type FormCpfInputProps = {
  name: string;
  label: string;
  id?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export function FormCpfInput({
  name,
  label,
  id,
  placeholder = "000.000.000-00",
  className,
  disabled = false,
}: FormCpfInputProps) {
  const { values, errors, touched, handleBlur, setFieldValue } =
    useFormikContext();

  const fieldId = id ?? name;
  const errorMessage = getFormikFieldError(touched, errors, name);
  const fieldError = Boolean(errorMessage);

  const rawValue = getFormikFieldValue(values, name);
  const displayValue =
    typeof rawValue === "string" ? formatCpfBR(rawValue) : "";

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
        inputMode="numeric"
        autoComplete="off"
        placeholder={placeholder}
        value={displayValue}
        onChange={(event) =>
          setFieldValue(name, formatCpfBR(event.target.value))
        }
        onBlur={handleBlur}
        disabled={disabled}
        className={getFieldClassName(Boolean(fieldError))}
      />
    </FormField>
  );
}
