"use client";

import { useProviderNameSuggestionsQuery } from "@/api/Providers/providers.query";
import type { ProviderNameSuggestion } from "@/api/Providers/Providers.dto";
import { formInputClass, formLabelClass } from "@/components/Form/FieldStyles";
import { useEffect, useId, useRef, useState } from "react";

const DEBOUNCE_MS = 300;
const SUGGESTION_LIMIT = 10;

type ProviderNameAutocompleteProps = {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function ProviderNameAutocomplete({
  id: idProp,
  label,
  value,
  onChange,
  placeholder = "Buscar por fornecedor",
  className = "",
}: ProviderNameAutocompleteProps) {
  const generatedId = useId();
  const inputId = idProp ?? generatedId;
  const listboxId = `${inputId}-listbox`;

  const [inputValue, setInputValue] = useState(value);
  const [debouncedTerm, setDebouncedTerm] = useState(value.trim());
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedTerm(inputValue.trim());
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timeout);
  }, [inputValue]);

  const { data: suggestions = [], isFetching } =
    useProviderNameSuggestionsQuery(debouncedTerm, SUGGESTION_LIMIT);

  const showList =
    isOpen && debouncedTerm.length > 0 && (isFetching || suggestions.length > 0);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  function handleSelect(suggestion: ProviderNameSuggestion) {
    setInputValue(suggestion.name);
    onChange(suggestion.name);
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className={`relative ${className}`.trim()}>
      <label htmlFor={inputId} className={formLabelClass}>
        {label}
      </label>
      <input
        id={inputId}
        type="search"
        role="combobox"
        aria-expanded={showList}
        aria-controls={listboxId}
        aria-autocomplete="list"
        value={inputValue}
        onChange={(event) => {
          const next = event.target.value;
          setInputValue(next);
          onChange(next);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        className={formInputClass}
        autoComplete="off"
      />
      {showList ? (
        <ul
          id={listboxId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-60 w-full overflow-auto border border-kyowa-border bg-white py-1 shadow-sm"
        >
          {isFetching && suggestions.length === 0 ? (
            <li className="px-3 py-2 text-sm text-kyowa-muted">Buscando…</li>
          ) : null}
          {suggestions.map((suggestion) => (
            <li key={suggestion.id} role="option">
              <button
                type="button"
                className="w-full px-3 py-2 text-left text-sm text-kyowa-ink transition hover:bg-kyowa-surface"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelect(suggestion)}
              >
                {suggestion.name}
              </button>
            </li>
          ))}
          {!isFetching && suggestions.length === 0 ? (
            <li className="px-3 py-2 text-sm text-kyowa-muted">
              Nenhum fornecedor encontrado.
            </li>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
}
