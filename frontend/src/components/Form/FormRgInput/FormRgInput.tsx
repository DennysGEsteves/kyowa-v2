"use client";

import { formatRgBR } from "@/util/masks";
import { getFormikFieldError, getFormikFieldValue } from "../formikField";
import { useFormikContext } from "formik";
import { FormField } from "../FormField";
import { getFieldClassName } from "../FieldStyles";

type FormRgInputProps = {
  name: string;
  label: string;
  id?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export function FormRgInput({
  name,
  label,
  id,
  placeholder = "00.000.000-0",
  className,
  disabled = false,
}: FormRgInputProps) {
  const { values, errors, touched, handleBlur, setFieldValue } =
    useFormikContext();

  const fieldId = id ?? name;
  const errorMessage = getFormikFieldError(touched, errors, name);
  const fieldError = Boolean(errorMessage);

  const rawValue = getFormikFieldValue(values, name);
  const displayValue =
    typeof rawValue === "string" ? formatRgBR(rawValue) : "";

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
        autoComplete="off"
        placeholder={placeholder}
        value={displayValue}
        onChange={(event) =>
          setFieldValue(name, formatRgBR(event.target.value))
        }
        onBlur={handleBlur}
        disabled={disabled}
        className={getFieldClassName(Boolean(fieldError))}
      />
    </FormField>
  );
}
