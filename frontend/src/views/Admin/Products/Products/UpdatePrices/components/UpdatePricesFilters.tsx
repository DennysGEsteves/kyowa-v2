"use client";

import { formInputClass, formLabelClass } from "@/components/Form/FieldStyles";
import { ProductNameAutocomplete } from "@/components/Form/ProductNameAutocomplete";
import type { ProductLookup } from "@entities";
import { useCallback, useState } from "react";

export type UpdatePricesListFilters = {
  name?: string;
  providerName?: string;
  categoryId?: string;
  hasActiveFilters: boolean;
};

type UpdatePricesFiltersProps = {
  categories: ProductLookup[];
  onSearch: (filters: UpdatePricesListFilters) => void;
  isSearching?: boolean;
};

export function UpdatePricesFilters({
  categories,
  onSearch,
  isSearching = false,
}: UpdatePricesFiltersProps) {
  const [nameInput, setNameInput] = useState("");
  const [providerNameInput, setProviderNameInput] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const submit = useCallback(() => {
    const name = nameInput.trim();
    const providerName = providerNameInput.trim();

    onSearch({
      name: name || undefined,
      providerName: providerName || undefined,
      categoryId: categoryId || undefined,
      hasActiveFilters: Boolean(name || providerName || categoryId),
    });
  }, [categoryId, nameInput, onSearch, providerNameInput]);

  return (
    <form
      className="mb-4 rounded-sm border border-kyowa-border bg-white p-4"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <ProductNameAutocomplete
            id="update-prices-filter-name"
            label="Nome do produto"
            value={nameInput}
            onChange={setNameInput}
          />
        </div>
        <div>
          <label
            htmlFor="update-prices-filter-provider"
            className={formLabelClass}
          >
            Nome do fornecedor
          </label>
          <input
            id="update-prices-filter-provider"
            type="search"
            value={providerNameInput}
            onChange={(event) => setProviderNameInput(event.target.value)}
            placeholder="Buscar por fornecedor"
            className={formInputClass}
            autoComplete="off"
          />
        </div>
        <div>
          <label
            htmlFor="update-prices-filter-category"
            className={formLabelClass}
          >
            Categoria
          </label>
          <select
            id="update-prices-filter-category"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            className={formInputClass}
          >
            <option value="">Todas</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <span className={`${formLabelClass} invisible`} aria-hidden="true">
            Buscar
          </span>
          <button
            type="submit"
            disabled={isSearching}
            className={`${formInputClass} border-kyowa-maroon bg-kyowa-maroon font-semibold uppercase tracking-wide text-white transition hover:bg-kyowa-maroon-dark focus:border-kyowa-maroon disabled:cursor-not-allowed disabled:opacity-60`}
          >
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
}
