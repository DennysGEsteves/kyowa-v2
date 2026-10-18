"use client";

import { formInputClass } from "@/components/Form/FieldStyles";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const NAME_DEBOUNCE_MS = 300;

type StatusFilter = "" | "true" | "false";

export type ArchitectsListFilters = {
  name?: string;
  active?: boolean;
  hasActiveFilters: boolean;
};

type ArchitectsFiltersProps = {
  onChange: (filters: ArchitectsListFilters) => void;
};

type FilterGroupProps = {
  title: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

const filterLabelClass = "mb-0.5 block text-xs font-medium text-kyowa-ink";

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

function resolveActive(status: StatusFilter): boolean | undefined {
  if (status === "true") return true;
  if (status === "false") return false;
  return undefined;
}

export function ArchitectsFilters({ onChange }: ArchitectsFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [debouncedName, setDebouncedName] = useState("");
  const [status, setStatus] = useState<StatusFilter>("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedName(nameInput.trim());
    }, NAME_DEBOUNCE_MS);

    return () => window.clearTimeout(timeout);
  }, [nameInput]);

  const activeFilterCount = useMemo(
    () => [nameInput.trim(), status].filter(Boolean).length,
    [nameInput, status],
  );

  const clearFilters = useCallback(() => {
    setNameInput("");
    setDebouncedName("");
    setStatus("");
  }, []);

  useEffect(() => {
    onChange({
      name: debouncedName || undefined,
      active: resolveActive(status),
      hasActiveFilters: activeFilterCount > 0,
    });
  }, [debouncedName, status, activeFilterCount, onChange]);

  return (
    <section className={filterSectionClass} aria-label="Filtros de arquitetos">
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
          <FilterGroup title="Arquiteto" contentClassName="grid gap-2 sm:grid-cols-2">
            <div>
              <label
                htmlFor="architects-filter-name"
                className={filterLabelClass}
              >
                Nome
              </label>
              <input
                id="architects-filter-name"
                type="search"
                value={nameInput}
                onChange={(event) => setNameInput(event.target.value)}
                placeholder="Buscar por nome"
                className={formInputClass}
                autoComplete="off"
              />
            </div>
            <div>
              <label
                htmlFor="architects-filter-status"
                className={filterLabelClass}
              >
                Status
              </label>
              <select
                id="architects-filter-status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as StatusFilter)
                }
                className={formInputClass}
              >
                <option value="">Todos</option>
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
              </select>
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
