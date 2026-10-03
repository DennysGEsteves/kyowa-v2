"use client";

import { getFormikFieldError, getFormikFieldValue } from "../formikField";
import { useFormikContext } from "formik";
import { FormField } from "../FormField";
import { getFieldClassName } from "../FieldStyles";

type FormTextareaProps = {
  name: string;
  label: string;
  id?: string;
  placeholder?: string;
  rows?: number;
  className?: string;
};

export function FormTextarea({
  name,
  label,
  id,
  placeholder,
  rows = 3,
  className,
}: FormTextareaProps) {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext();

  const fieldId = id ?? name;
  const errorMessage = getFormikFieldError(touched, errors, name);
  const fieldError = Boolean(errorMessage);

  return (
    <FormField
      label={label}
      htmlFor={fieldId}
      error={errorMessage}
      className={className}
    >
      <textarea
        id={fieldId}
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={getFormikFieldValue(values, name) as string}
        onChange={handleChange}
        onBlur={handleBlur}
        className={getFieldClassName(Boolean(fieldError))}
      />
    </FormField>
  );
}
