"use client";

import { useStoresQuery } from "@/api/Stores/stores.query";
import { formInputClass } from "../FieldStyles";
import { FormField } from "../FormField";
import { useMemo } from "react";

type FormStoreSelectProps = {
  id: string;
  label?: string;
  value: string;
  onChange: (storeId: string) => void;
  className?: string;
  emptyOptionLabel?: string;
  disabled?: boolean;
};

export function FormStoreSelect({
  id,
  label = "Loja",
  value,
  onChange,
  className,
  emptyOptionLabel = "Todas",
  disabled = false,
}: FormStoreSelectProps) {
  const { data: stores = [], isLoading } = useStoresQuery();

  const storeOptions = useMemo(
    () =>
      [...stores].sort((a, b) => a.name.localeCompare(b.name, "pt-BR")),
    [stores],
  );

  const isDisabled = disabled || isLoading;

  return (
    <FormField label={label} htmlFor={id} className={className}>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={formInputClass}
        disabled={isDisabled}
      >
        <option value="">
          {isLoading ? "Carregando…" : emptyOptionLabel}
        </option>
        {storeOptions.map((store) => (
          <option key={store.id} value={store.id}>
            {store.name}
          </option>
        ))}
      </select>
    </FormField>
  );
}
