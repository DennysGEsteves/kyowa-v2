"use client";

import { useFormikContext } from "formik";
import { getFormikFieldError, getFormikFieldValue } from "../formikField";
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

type FormSelectProps = {
  name: string;
  label: string;
  id?: string;
  options: FormSelectOption[];
  className?: string;
  /** Inclui opção em branco no topo (padrão em criações com valor `""`). */
  allowEmpty?: boolean;
};

export function FormSelect({
  name,
  label,
  id,
  options,
  className,
  allowEmpty = true,
}: FormSelectProps) {
  const { values, errors, touched, submitCount, handleChange, handleBlur } =
    useFormikContext();

  const fieldId = id ?? name;
  const errorMessage = getFormikFieldError(
    touched,
    errors,
    name,
    submitCount,
  );
  const fieldError = Boolean(errorMessage);
  const selectOptions = allowEmpty ? withEmptyOption(options) : options;
  const rawValue = getFormikFieldValue(values, name);
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
