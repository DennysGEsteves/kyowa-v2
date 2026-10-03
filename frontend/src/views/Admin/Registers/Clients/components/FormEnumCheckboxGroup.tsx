"use client";

import { useFormikContext } from "formik";

type FormEnumCheckboxGroupProps<T extends string> = {
  name: string;
  label: string;
  options: { value: T; label: string }[];
};

export function FormEnumCheckboxGroup<T extends string>({
  name,
  label,
  options,
}: FormEnumCheckboxGroupProps<T>) {
  const { values, setFieldValue } = useFormikContext<Record<string, unknown>>();
  const selected = (values[name] as T[]) ?? [];

  function toggle(value: T, checked: boolean) {
    const next = checked
      ? [...selected, value]
      : selected.filter((item) => item !== value);
    setFieldValue(name, next);
  }

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-kyowa-ink">{label}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-2 text-sm text-kyowa-ink"
          >
            <input
              type="checkbox"
              checked={selected.includes(option.value)}
              onChange={(event) => toggle(option.value, event.target.checked)}
              className="h-4 w-4 rounded border-kyowa-border text-kyowa-maroon focus:ring-kyowa-maroon"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
