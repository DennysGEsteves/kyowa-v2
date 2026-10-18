"use client";

import { ProductNameAutocomplete } from "@/components/Form/ProductNameAutocomplete";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const NAME_DEBOUNCE_MS = 300;

export type ProductsListFilters = {
  name?: string;
  hasActiveFilters: boolean;
};

type ProductsFiltersProps = {
  onChange: (filters: ProductsListFilters) => void;
};

type FilterGroupProps = {
  title: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

const filterSectionClass =
  "mb-6 rounded-sm border border-kyowa-border bg-white px-3 py-2 shadow-md sm:px-4 sm:py-2.5 [&_input]:border-kyowa-border/80 [&_input]:bg-kyowa-surface/70 [&_input]:px-2.5 [&_input]:py-1.5 [&_input]:text-sm [&_label]:mb-0.5 [&_label]:text-xs [&_select]:border-kyowa-border/80 [&_select]:bg-kyowa-surface/70 [&_select]:px-2.5 [&_select]:py-1.5 [&_select]:text-sm";

function FilterGroup({
  title,
  children,
  className = "",
  contentClassName = "grid gap-2 sm:grid-cols-2",
}: FilterGroupProps) {
  return (
    <div
      className={`rounded-sm border border-kyowa-border/70 bg-kyowa-surface/35 p-2 sm:p-2.5 ${className}`}
    >
      <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-kyowa-muted">
        {title}
      </p>
      <div className={contentClassName}>{children}</div>
    </div>
  );
}

export function ProductsFilters({ onChange }: ProductsFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [debouncedName, setDebouncedName] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedName(nameInput.trim());
    }, NAME_DEBOUNCE_MS);

    return () => window.clearTimeout(timeout);
  }, [nameInput]);

  const activeFilterCount = useMemo(
    () => (nameInput.trim() ? 1 : 0),
    [nameInput],
  );

  const clearFilters = useCallback(() => {
    setNameInput("");
    setDebouncedName("");
  }, []);

  useEffect(() => {
    onChange({
      name: debouncedName || undefined,
      hasActiveFilters: activeFilterCount > 0,
    });
  }, [debouncedName, activeFilterCount, onChange]);

  return (
    <section className={filterSectionClass} aria-label="Filtros de produtos">
      <div
        className={`flex items-center gap-2 ${isOpen ? "mb-2 border-b border-kyowa-border/60 pb-2" : ""}`}
      >
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="flex min-w-0 flex-1 items-center gap-2 text-left"
          aria-expanded={isOpen}
        >
          <SlidersHorizontal
            className="h-4 w-4 shrink-0 text-kyowa-muted"
            aria-hidden
          />
          <span className="text-sm font-semibold text-kyowa-ink">Filtros</span>
          {activeFilterCount > 0 ? (
            <span className="rounded-full bg-kyowa-maroon/10 px-2 py-0.5 text-xs font-semibold text-kyowa-maroon">
              {activeFilterCount} ativo{activeFilterCount === 1 ? "" : "s"}
            </span>
          ) : null}
          <ChevronDown
            className={`ml-auto h-4 w-4 shrink-0 text-kyowa-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
            aria-hidden
          />
        </button>
      </div>

      {isOpen ? (
        <div className="grid gap-2">
          <FilterGroup title="Produto" contentClassName="grid gap-2">
            <div className="max-w-md">
              <ProductNameAutocomplete
                id="products-filter-name"
                label="Nome"
                value={nameInput}
                onChange={setNameInput}
                placeholder="Buscar por nome"
              />
            </div>
          </FilterGroup>

          <div className="flex justify-end border-t border-kyowa-border/60 pt-2">
            <button
              type="button"
              onClick={clearFilters}
              disabled={activeFilterCount === 0}
              className="text-xs font-semibold uppercase tracking-wide text-kyowa-maroon transition hover:text-kyowa-maroon-dark disabled:cursor-not-allowed disabled:text-kyowa-muted disabled:hover:text-kyowa-muted"
            >
              Limpar filtros
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
