/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRepository } from "@/repositories/repositories.hook";
import type { AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { AutoComplete } from "primereact/autocomplete";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { useMemo, useState } from "react";
import type { ControllerRenderProps, FieldError } from "react-hook-form";

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
    <>
      <div className="mt-6 w-full md:flex md:items-center">
        <div className="md:min-w-36">
          <label
            className="mb-1 block w-40 pr-4 font-bold text-white md:mb-0 md:text-left"
            htmlFor={label}
          >
            {label}
          </label>
        </div>
        <div className="rounded-none md:w-80">
          <AutoComplete
            field="name"
            value={value}
            suggestions={suggestions}
            completeMethod={search}
            forceSelection
            onChange={(e) => {
              const value = e.value;
              value?.mid && field.onChange(value.mid);
              setValue(value);
            }}
          />
        </div>
        {error && (
          <div className="md:w-28">
            <p className="ml-5 text-sm text-red-400">* obrigatório</p>
          </div>
        )}
      </div>
    </>
  );
};

export default FormAutocomplete;
