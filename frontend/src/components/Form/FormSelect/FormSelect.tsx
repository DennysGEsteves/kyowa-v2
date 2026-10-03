"use client";

import { useFormikContext } from "formik";
import { FormField } from "../FormField";
import { getFieldClassName } from "../FieldStyles";

export type FormSelectOption = {
  value: string;
  label: string;
};

/** Valor da opção em branco (sem relação / não enviado na API). */
export const FORM_SELECT_EMPTY_VALUE = "";

export const formSelectEmptyOption: FormSelectOption = {
  value: FORM_SELECT_EMPTY_VALUE,
  label: "",
};

function withEmptyOption(options: FormSelectOption[]): FormSelectOption[] {
  if (options.some((option) => option.value === FORM_SELECT_EMPTY_VALUE)) {
    return options;
  }

  return [formSelectEmptyOption, ...options];
}

type FormSelectProps<T extends Record<string, unknown>> = {
  name: keyof T & string;
  label: string;
  id?: string;
  options: FormSelectOption[];
  className?: string;
  /** Inclui opção em branco no topo (padrão em criações com valor `""`). */
  allowEmpty?: boolean;
};

export function FormSelect<T extends Record<string, unknown>>({
  name,
  label,
  id,
  options,
  className,
  allowEmpty = true,
}: FormSelectProps<T>) {
  const { values, errors, touched, handleChange, handleBlur } =
    useFormikContext<T>();

  const fieldId = id ?? name;
  const fieldError = touched[name] && errors[name];
  const errorMessage = fieldError ? String(errors[name]) : undefined;
  const selectOptions = allowEmpty ? withEmptyOption(options) : options;
  const rawValue = values[name];
  const selectValue =
    rawValue === null || rawValue === undefined
      ? FORM_SELECT_EMPTY_VALUE
      : String(rawValue);

  return (
    <FormField
      label={label}
      htmlFor={fieldId}
      error={errorMessage}
      className={className}
    >
      <select
        id={fieldId}
        name={name}
        value={selectValue}
        onChange={handleChange}
        onBlur={handleBlur}
        className={getFieldClassName(Boolean(fieldError))}
      >
        {selectOptions.map((option, index) => (
          <option
            key={
              option.value === FORM_SELECT_EMPTY_VALUE
                ? "__empty__"
                : option.value || `option-${index}`
            }
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}
