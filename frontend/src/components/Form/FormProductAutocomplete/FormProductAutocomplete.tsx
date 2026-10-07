"use client";

import {
  formatProductSuggestionLabel,
  ProductNameAutocomplete,
} from "@/components/Form/ProductNameAutocomplete";
import { useFormikContext } from "formik";
import { useState } from "react";

type FormProductAutocompleteProps<T extends Record<string, unknown>> = {
  name: keyof T & string;
  label: string;
  id?: string;
  placeholder?: string;
  className?: string;
};

export function FormProductAutocomplete<T extends Record<string, unknown>>({
  name,
  label,
  id,
  placeholder,
  className,
}: FormProductAutocompleteProps<T>) {
  const { errors, touched, setFieldValue, setFieldTouched } =
    useFormikContext<T>();

  const [search, setSearch] = useState("");
  const fieldId = id ?? name;
  const fieldError = touched[name] && errors[name];
  const errorMessage = fieldError ? String(errors[name]) : undefined;

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
