/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRepository } from "@/repositories/repositories.hook";
import {
  AutoComplete,
  type AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { useMemo, useState } from "react";
import type { ControllerRenderProps, FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export type FormDatalistProps = {
  label: string;
  error?: FieldError | undefined;
  entity: "ARCHITECTS" | "CLIENTS" | "SUPPLIERS";
  field: ControllerRenderProps<any, any>;
};

const FormAutocomplete = ({
  label,
  entity,
  field,
  error,
}: FormDatalistProps) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const repository = useRepository();

  const getSearchEntityRepository = useMemo(() => {
    switch (entity) {
      case "ARCHITECTS":
        return repository.architectsRepository.getByName;

      case "CLIENTS":
        return repository.clientsRepository.getByName;

      case "SUPPLIERS":
        return repository.suppliersRepository.getByName;

      default:
        return repository.clientsRepository.getByName;
    }
  }, [entity]);

  const search = (e: AutoCompleteCompleteEvent) => {
    getSearchEntityRepository(e.query.toLowerCase()).then((data) => {
      setSuggestions(data || []);
    });
  };

  return (
    <div className="flex w-full flex-col items-start">
      <label className="text-sm font-bold text-gray-700" htmlFor={label}>
        {label}
      </label>
      <div className="flex w-full gap-4">
        <AutoComplete
          field="name"
          value={value}
          suggestions={suggestions}
          completeMethod={search}
          forceSelection
          className="w-full"
          inputClassName={twMerge(
            "w-full appearance-none rounded-md border border-gray-300 px-4 py-2 leading-tight text-gray-700 focus:bg-white focus:outline-none",
            error ? "border-red-500 bg-red-50" : "",
          )}
          onChange={(e) => {
            const value = e.value;
            value?.mid && field.onChange(value.mid);
            setValue(value);
          }}
        />
        <p className="w-1/4 self-center text-sm text-red-500">
          {error && <>* obrigatório</>}
        </p>
      </div>
    </div>
  );
};

export { FormAutocomplete };
