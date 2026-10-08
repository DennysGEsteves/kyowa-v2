"use client";

import {
  formatProductSuggestionLabel,
  ProductNameAutocomplete,
} from "@/components/Form/ProductNameAutocomplete";
import { getFormikFieldError } from "../formikField";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";

type FormProductAutocompleteProps<T extends Record<string, unknown>> = {
  name: keyof T & string;
  label: string;
  id?: string;
  placeholder?: string;
  className?: string;
  /** Texto inicial do campo (ex.: produto já vinculado ao editar). */
  initialDisplayValue?: string;
};

export function FormProductAutocomplete<T extends Record<string, unknown>>({
  name,
  label,
  id,
  placeholder,
  className,
  initialDisplayValue = "",
}: FormProductAutocompleteProps<T>) {
  const { errors, touched, submitCount, setFieldValue, setFieldTouched } =
    useFormikContext<T>();

  const [search, setSearch] = useState(initialDisplayValue);
  const fieldId = id ?? name;

  useEffect(() => {
    setSearch(initialDisplayValue);
  }, [initialDisplayValue]);
  const errorMessage = getFormikFieldError(
    touched,
    errors,
    name,
    submitCount,
  );

  return (
    <ProductNameAutocomplete
      id={fieldId}
      label={label}
      className={className}
      placeholder={placeholder}
      value={search}
      error={errorMessage}
      onChange={(next) => {
        setSearch(next);
        if (initialDisplayValue && next === initialDisplayValue) {
          return;
        }
        void setFieldValue(name, "");
      }}
      onProductSelect={(suggestion) => {
        setSearch(formatProductSuggestionLabel(suggestion));
        void setFieldValue(name, suggestion.id);
        void setFieldTouched(name, true, false);
      }}
    />
  );
}
