"use client";

import { formInputClass, formLabelClass } from "@/components/Form/FieldStyles";
import { DataTable } from "@/components/Table";
import { Search } from "lucide-react";
import { SealLookupLogic } from "./SealLookup.logic";

export function SealLookupView() {
  const { data, methods } = SealLookupLogic();

  return (
    <>
      <div className="mb-4 rounded-sm border border-kyowa-border bg-white p-4 sm:mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="max-w-xs flex-1">
            <label htmlFor="seal-lookup-number" className={formLabelClass}>
              Número do lacre
            </label>
            <input
              id="seal-lookup-number"
              type="text"
              inputMode="numeric"
              value={data.numberInput}
              onChange={(event) => methods.setNumberInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  methods.handleSearch();
                }
              }}
              className={formInputClass}
              placeholder="Digite o número"
            />
          </div>
          <button
            type="button"
            onClick={methods.handleSearch}
            className="inline-flex items-center justify-center gap-2 bg-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-kyowa-maroon-dark"
          >
            <Search className="h-4 w-4" strokeWidth={2} />
            Buscar
          </button>
        </div>
      </div>

      {data.invalidInput ? (
        <p className="text-sm text-red-600">
          Informe um número de lacra válido (inteiro maior ou igual a 1).
        </p>
      ) : !data.hasSearched ? (
        <p className="text-sm text-kyowa-muted">
          Digite o número do lacre e clique em Buscar.
        </p>
      ) : data.isError ? (
        <p className="text-sm text-red-600">
          Não foi possível buscar o lacre. Tente novamente.
        </p>
      ) : data.isLoading || data.isFetching ? (
        <p className="text-sm text-kyowa-muted">Buscando…</p>
      ) : (
        <DataTable
          data={data.results}
          columns={data.columns}
          emptyMessage={
            <>Nenhum lacre encontrado com esse número.</>
          }
        />
      )}
    </>
  );
}
