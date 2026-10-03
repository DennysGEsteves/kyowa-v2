"use client";

import { formInputClass, formLabelClass } from "@/components/Form/FieldStyles";
import { formatCpfBR } from "@/util/masks";
import { useEffect, useState } from "react";

const NAME_DEBOUNCE_MS = 300;

type StatusFilter = "" | "true" | "false";

export type ClientsListFilters = {
  name?: string;
  cpf?: string;
  active?: boolean;
  hasActiveFilters: boolean;
};

type ClientsFiltersProps = {
  onChange: (filters: ClientsListFilters) => void;
};

function resolveActive(status: StatusFilter): boolean | undefined {
  if (status === "true") return true;
  if (status === "false") return false;
  return undefined;
}

export function ClientsFilters({ onChange }: ClientsFiltersProps) {
  const [nameInput, setNameInput] = useState("");
  const [debouncedName, setDebouncedName] = useState("");
  const [cpfInput, setCpfInput] = useState("");
  const [debouncedCpf, setDebouncedCpf] = useState("");
  const [status, setStatus] = useState<StatusFilter>("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedName(nameInput.trim());
    }, NAME_DEBOUNCE_MS);

    return () => window.clearTimeout(timeout);
  }, [nameInput]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedCpf(cpfInput.trim());
    }, NAME_DEBOUNCE_MS);

    return () => window.clearTimeout(timeout);
  }, [cpfInput]);

  useEffect(() => {
    onChange({
      name: debouncedName || undefined,
      cpf: debouncedCpf || undefined,
      active: resolveActive(status),
      hasActiveFilters:
        Boolean(debouncedName) || Boolean(debouncedCpf) || status !== "",
    });
  }, [debouncedName, debouncedCpf, status, onChange]);

  return (
    <div className="mb-4 grid gap-4 rounded-sm border border-kyowa-border bg-white p-4 sm:grid-cols-2 lg:grid-cols-3">
      <div>
        <label htmlFor="clients-filter-name" className={formLabelClass}>
          Nome
        </label>
        <input
          id="clients-filter-name"
          type="search"
          value={nameInput}
          onChange={(event) => setNameInput(event.target.value)}
          placeholder="Buscar por nome"
          className={formInputClass}
          autoComplete="off"
        />
      </div>
      <div>
        <label htmlFor="clients-filter-cpf" className={formLabelClass}>
          CPF
        </label>
        <input
          id="clients-filter-cpf"
          type="search"
          inputMode="numeric"
          value={cpfInput}
          onChange={(event) =>
            setCpfInput(formatCpfBR(event.target.value))
          }
          placeholder="Buscar por CPF"
          className={formInputClass}
          autoComplete="off"
        />
      </div>
      <div>
        <label htmlFor="clients-filter-status" className={formLabelClass}>
          Status
        </label>
        <select
          id="clients-filter-status"
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
