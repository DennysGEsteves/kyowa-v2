"use client";

import {
  formatDateOnlyIsoToDdMmYyyy,
  maskDateDdMmYyyy,
  parseDateOnlyDdMmYyyyToIso,
} from "@/utils/date/dateOnlyBr";
import { Calendar } from "lucide-react";
import type { InputHTMLAttributes } from "react";

type FormDateInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "onChange" | "inputMode"
> & {
  value: string;
  onChange: (displayValue: string) => void;
  showCalendar?: boolean;
};

export function FormDateInput({
  value,
  onChange,
  placeholder = "DD/MM/YYYY",
  autoComplete = "off",
  className = "",
  id,
  showCalendar = true,
  ...rest
}: FormDateInputProps) {
  const pickerId = id ? `${id}-picker` : undefined;
  const isoValue = parseDateOnlyDdMmYyyyToIso(value) ?? "";

  return (
    <div className="relative">
      <input
        {...rest}
        id={id}
        type="text"
        inputMode="numeric"
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(maskDateDdMmYyyy(event.target.value))}
        className={`${className}${showCalendar ? " pr-9" : ""}`}
      />
      {showCalendar ? (
        <>
          <label
            htmlFor={pickerId}
            className="pointer-events-none absolute inset-y-0 right-0 flex w-9 items-center justify-center text-kyowa-muted"
            aria-hidden
          >
            <Calendar className="h-4 w-4" />
          </label>
          <input
            id={pickerId}
            type="date"
            tabIndex={-1}
            value={isoValue}
            onChange={(event) => {
              const next = event.target.value;
              onChange(next ? formatDateOnlyIsoToDdMmYyyy(next) : "");
            }}
            className="absolute inset-y-0 right-0 w-9 cursor-pointer opacity-0"
            title="Abrir calendário"
            aria-label="Abrir calendário"
          />
        </>
      ) : null}
    </div>
  );
}
