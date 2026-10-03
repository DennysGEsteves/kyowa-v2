"use client";

import { formInputClass, formLabelClass } from "@/components/Form/FieldStyles";
import { useEffect, useState } from "react";

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

function resolveActive(status: StatusFilter): boolean | undefined {
  if (status === "true") return true;
  if (status === "false") return false;
  return undefined;
}

export function ArchitectsFilters({ onChange }: ArchitectsFiltersProps) {
  const [nameInput, setNameInput] = useState("");
  const [debouncedName, setDebouncedName] = useState("");
  const [status, setStatus] = useState<StatusFilter>("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedName(nameInput.trim());
    }, NAME_DEBOUNCE_MS);

    return () => window.clearTimeout(timeout);
  }, [nameInput]);

  useEffect(() => {
    onChange({
      name: debouncedName || undefined,
      active: resolveActive(status),
      hasActiveFilters: Boolean(debouncedName) || status !== "",
    });
  }, [debouncedName, status, onChange]);

  return (
    <div className="mb-4 grid gap-4 rounded-sm border border-kyowa-border bg-white p-4 sm:grid-cols-2 lg:grid-cols-3">
      <div>
        <label htmlFor="architects-filter-name" className={formLabelClass}>
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
        <label htmlFor="architects-filter-status" className={formLabelClass}>
          Status
        </label>
        <select
          id="architects-filter-status"
          value={status}
          onChange={(event) => setStatus(event.target.value as StatusFilter)}
          className={formInputClass}
        >
          <option value="">Todos</option>
          <option value="true">Ativo</option>
          <option value="false">Inativo</option>
        </select>
      </div>
    </div>
  );
}
