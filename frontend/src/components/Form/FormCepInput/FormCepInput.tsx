"use client";

import type { FormAddressAutofillFields } from "@/components/Form/formAddressAutofill";
import { digitsOnly, formatCepBR } from "@/utils/masks";
import { fetchAddressByCep } from "@/utils/viacep";
import { getFormikFieldError, getFormikFieldValue } from "../formikField";
import { useFormikContext } from "formik";
import { useCallback, useRef } from "react";
import { FormField } from "../FormField";
import { getFieldClassName } from "../FieldStyles";

type FormCepInputProps = {
  name: string;
  label: string;
  id?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  autofillAddressFields?: FormAddressAutofillFields;
};

export function FormCepInput({
  name,
  label,
  id,
  placeholder = "00000-000",
  className,
  disabled = false,
  autofillAddressFields,
}: FormCepInputProps) {
  const { values, errors, touched, handleBlur, setFieldValue } =
    useFormikContext();

  const lastFetchedCepRef = useRef<string | null>(null);
  const fetchInFlightRef = useRef<string | null>(null);

  const fieldId = id ?? name;
  const errorMessage = getFormikFieldError(touched, errors, name);
  const fieldError = Boolean(errorMessage);

  const rawValue = getFormikFieldValue(values, name);
  const displayValue =
    typeof rawValue === "string" ? formatCepBR(rawValue) : "";

  const autofillFromCep = useCallback(
    async (cepValue: string) => {
      if (!autofillAddressFields) return;

      const digits = digitsOnly(cepValue);
      if (digits.length !== 8) {
        lastFetchedCepRef.current = null;
        return;
      }

      if (
        digits === lastFetchedCepRef.current ||
        digits === fetchInFlightRef.current
      ) {
        return;
      }

      fetchInFlightRef.current = digits;
      const address = await fetchAddressByCep(digits);
      fetchInFlightRef.current = null;

      if (!address) {
        return;
      }

      lastFetchedCepRef.current = digits;
      await Promise.all([
        setFieldValue(autofillAddressFields.street, address.street),
        setFieldValue(autofillAddressFields.district, address.district),
        setFieldValue(autofillAddressFields.city, address.city),
        setFieldValue(autofillAddressFields.region, address.region),
      ]);
    },
    [autofillAddressFields, setFieldValue],
  );

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
        autoComplete="postal-code"
        placeholder={placeholder}
        value={displayValue}
        onChange={(event) => {
          const formatted = formatCepBR(event.target.value);
          setFieldValue(name, formatted);
          void autofillFromCep(formatted);
        }}
        onBlur={(event) => {
          handleBlur(event);
          void autofillFromCep(event.target.value);
        }}
        disabled={disabled}
        className={getFieldClassName(Boolean(fieldError))}
      />
    </FormField>
  );
}
