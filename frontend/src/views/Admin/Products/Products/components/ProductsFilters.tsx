"use client";

import { formInputClass, formLabelClass } from "@/components/Form/FieldStyles";
import { useEffect, useState } from "react";

const NAME_DEBOUNCE_MS = 300;

export type ProductsListFilters = {
  name?: string;
  hasActiveFilters: boolean;
};

type ProductsFiltersProps = {
  onChange: (filters: ProductsListFilters) => void;
};

export function ProductsFilters({ onChange }: ProductsFiltersProps) {
  const [nameInput, setNameInput] = useState("");
  const [debouncedName, setDebouncedName] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedName(nameInput.trim());
    }, NAME_DEBOUNCE_MS);

    return () => window.clearTimeout(timeout);
  }, [nameInput]);

  useEffect(() => {
    onChange({
      name: debouncedName || undefined,
      hasActiveFilters: Boolean(debouncedName),
    });
  }, [debouncedName, onChange]);

  return (
    <div className="mb-4 rounded-sm border border-kyowa-border bg-white p-4">
      <div className="max-w-md">
        <label htmlFor="products-filter-name" className={formLabelClass}>
          Nome
        </label>
        <input
          id="products-filter-name"
          type="search"
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
          placeholder="Buscar por nome"
          className={formInputClass}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
