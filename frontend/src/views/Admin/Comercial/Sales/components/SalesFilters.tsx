"use client";

import { ArchitectNameAutocomplete } from "@/components/Form/ArchitectNameAutocomplete";
import { ClientNameAutocomplete } from "@/components/Form/ClientNameAutocomplete";
import {
  FormDateInput,
  FormSalesUserSelect,
  FormStoreSelect,
} from "@/components/Form";
import { formInputClass } from "@/components/Form/FieldStyles";
import { parseDateOnlyDdMmYyyyToIso } from "@/utils/date";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export type SalesListFilters = {
  createdAtFrom?: string;
  createdAtTo?: string;
  userId?: string;
  architectId?: string;
  clientId?: string;
  storeId?: string;
  isPaid?: boolean;
  hasActiveFilters: boolean;
};

type SalesFiltersProps = {
  onChange: (filters: SalesListFilters) => void;
};

type FilterGroupProps = {
  title: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

const filterLabelClass = "mb-0.5 block text-xs font-medium text-kyowa-ink";

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

export function SalesFilters({ onChange }: SalesFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [createdAtFrom, setCreatedAtFrom] = useState("");
  const [createdAtTo, setCreatedAtTo] = useState("");
  const [userId, setUserId] = useState("");
  const [architectId, setArchitectId] = useState("");
  const [architectSearch, setArchitectSearch] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientSearch, setClientSearch] = useState("");
  const [storeId, setStoreId] = useState("");
  const [paidFilter, setPaidFilter] = useState<"" | "paid" | "unpaid">("");

  const activeFilterCount = useMemo(
    () =>
      [
        createdAtFrom,
        createdAtTo,
        userId,
        architectId,
        clientId,
        storeId,
        paidFilter,
      ].filter(Boolean).length,
    [
      createdAtFrom,
      createdAtTo,
      userId,
      architectId,
      clientId,
      storeId,
      paidFilter,
    ],
  );

  const clearFilters = useCallback(() => {
    setCreatedAtFrom("");
    setCreatedAtTo("");
    setUserId("");
    setArchitectId("");
    setArchitectSearch("");
    setClientId("");
    setClientSearch("");
    setStoreId("");
    setPaidFilter("");
  }, []);

  useEffect(() => {
    onChange({
      createdAtFrom: parseDateOnlyDdMmYyyyToIso(createdAtFrom) || undefined,
      createdAtTo: parseDateOnlyDdMmYyyyToIso(createdAtTo) || undefined,
      userId: userId || undefined,
      architectId: architectId || undefined,
      clientId: clientId || undefined,
      storeId: storeId || undefined,
      isPaid:
        paidFilter === "paid"
          ? true
          : paidFilter === "unpaid"
            ? false
            : undefined,
      hasActiveFilters: activeFilterCount > 0,
    });
  }, [
    createdAtFrom,
    createdAtTo,
    userId,
    architectId,
    clientId,
    storeId,
    paidFilter,
    activeFilterCount,
    onChange,
  ]);

  return (
    <section
      className="mb-6 rounded-sm border border-kyowa-border bg-white px-3 py-2 shadow-md sm:px-4 sm:py-2.5 [&_input]:border-kyowa-border/80 [&_input]:bg-kyowa-surface/70 [&_input]:px-2.5 [&_input]:py-1.5 [&_input]:text-sm [&_label]:mb-0.5 [&_label]:text-xs [&_select]:border-kyowa-border/80 [&_select]:bg-kyowa-surface/70 [&_select]:px-2.5 [&_select]:py-1.5 [&_select]:text-sm"
      aria-label="Filtros de vendas"
    >
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
        <div className="grid gap-2 lg:grid-cols-12 lg:gap-2.5">
          <FilterGroup
            title="Operação"
            className="lg:col-span-4"
            contentClassName="grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
          >
            <FormSalesUserSelect
              id="sales-filter-seller"
              value={userId}
              onChange={setUserId}
            />
            <FormStoreSelect
              id="sales-filter-store"
              value={storeId}
              onChange={setStoreId}
            />
            <div>
              <label
                htmlFor="sales-filter-paid"
                className={filterLabelClass}
              >
                Pago
              </label>
              <select
                id="sales-filter-paid"
                value={paidFilter}
                onChange={(event) =>
                  setPaidFilter(
                    event.target.value as "" | "paid" | "unpaid",
                  )
                }
                className={formInputClass}
              >
                <option value="">Todos</option>
                <option value="paid">Pago</option>
                <option value="unpaid">Não pago</option>
              </select>
            </div>
          </FilterGroup>

          <FilterGroup
            title="Período"
            className="lg:col-span-3"
            contentClassName="grid grid-cols-2 gap-2"
          >
            <div>
              <label
                htmlFor="sales-filter-created-from"
                className={filterLabelClass}
              >
                De
              </label>
              <FormDateInput
                id="sales-filter-created-from"
                value={createdAtFrom}
                onChange={setCreatedAtFrom}
                className={formInputClass}
              />
            </div>
            <div>
              <label
                htmlFor="sales-filter-created-to"
                className={filterLabelClass}
              >
                Até
              </label>
              <FormDateInput
                id="sales-filter-created-to"
                value={createdAtTo}
                onChange={setCreatedAtTo}
                className={formInputClass}
              />
            </div>
          </FilterGroup>

          <FilterGroup
            title="Cliente e arquiteto"
            className="lg:col-span-5"
            contentClassName="grid gap-2 sm:grid-cols-2"
          >
            <ClientNameAutocomplete
              id="sales-filter-client"
              label="Cliente"
              placeholder="Buscar por nome"
              value={clientSearch}
              onChange={(next) => {
                setClientSearch(next);
                if (!next.trim()) {
                  setClientId("");
                  return;
                }
                setClientId("");
              }}
              onClientSelect={(suggestion) => {
                setClientSearch(suggestion.name);
                setClientId(suggestion.id);
              }}
            />
            <ArchitectNameAutocomplete
              id="sales-filter-architect"
              label="Arquiteto"
              placeholder="Buscar por nome"
              value={architectSearch}
              onChange={(next) => {
                setArchitectSearch(next);
                if (!next.trim()) {
                  setArchitectId("");
                  return;
                }
                setArchitectId("");
              }}
              onArchitectSelect={(suggestion) => {
                setArchitectSearch(suggestion.name);
                setArchitectId(suggestion.id);
              }}
            />
          </FilterGroup>

          <div className="flex justify-end border-t border-kyowa-border/60 pt-2 lg:col-span-12">
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
