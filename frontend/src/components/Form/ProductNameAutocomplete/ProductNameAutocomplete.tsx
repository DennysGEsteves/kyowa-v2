"use client";

import { useProductNameSuggestionsQuery } from "@/api/Products/products.query";
import type { ProductNameSuggestion } from "@/api/Products/Products.dto";
import { formInputClass, formLabelClass } from "@/components/Form/FieldStyles";
import { useEffect, useId, useRef, useState } from "react";

const DEBOUNCE_MS = 300;
const SUGGESTION_LIMIT = 10;

type ProductNameAutocompleteProps = {
  id?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

function formatSuggestionLabel(suggestion: ProductNameSuggestion): string {
  if (suggestion.fantasyName && suggestion.fantasyName !== suggestion.name) {
    return `${suggestion.name} (${suggestion.fantasyName})`;
  }
  return suggestion.name;
}

export function ProductNameAutocomplete({
  id: idProp,
  label,
  value,
  onChange,
  placeholder = "Buscar por nome",
  className = "",
}: ProductNameAutocompleteProps) {
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

  const { data: suggestions = [], isFetching } = useProductNameSuggestionsQuery(
    debouncedTerm,
    SUGGESTION_LIMIT,
  );

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

  function handleSelect(suggestion: ProductNameSuggestion) {
    const next = suggestion.name;
    setInputValue(next);
    onChange(next);
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
                {formatSuggestionLabel(suggestion)}
              </button>
            </li>
          ))}
          {!isFetching && suggestions.length === 0 ? (
            <li className="px-3 py-2 text-sm text-kyowa-muted">
              Nenhum produto encontrado.
            </li>
          ) : null}
        </ul>
      ) : null}
    </div>
  );
}
