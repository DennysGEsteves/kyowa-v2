"use client";

import { ArchitectNameAutocomplete } from "@/components/Form/ArchitectNameAutocomplete";
import { getFormikFieldError } from "../formikField";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";

type FormArchitectAutocompleteProps<T extends Record<string, unknown>> = {
  name: keyof T & string;
  label: string;
  id?: string;
  placeholder?: string;
  className?: string;
  initialDisplayValue?: string;
};

export function FormArchitectAutocomplete<T extends Record<string, unknown>>({
  name,
  label,
  id,
  placeholder,
  className,
  initialDisplayValue = "",
}: FormArchitectAutocompleteProps<T>) {
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
    <ArchitectNameAutocomplete
      id={fieldId}
      label={label}
      className={className}
      placeholder={placeholder}
      value={search}
      error={errorMessage}
      onChange={(next) => {
        setSearch(next);
        if (!next.trim()) {
          void setFieldValue(name, "");
          return;
        }
        if (initialDisplayValue && next === initialDisplayValue) {
          return;
        }
        void setFieldValue(name, "");
      }}
      onArchitectSelect={(suggestion) => {
        setSearch(suggestion.name);
        void setFieldValue(name, suggestion.id);
        void setFieldTouched(name, true, false);
      }}
    />
  );
}
