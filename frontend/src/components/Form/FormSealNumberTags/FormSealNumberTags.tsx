"use client";

import { getFormikFieldError } from "../formikField";
import { FormField } from "../FormField";
import { getFieldClassName } from "../FieldStyles";
import { useFormikContext } from "formik";
import { X } from "lucide-react";
import { sealNumberTagClass } from "@entities";
import { useCallback, useState, type KeyboardEvent } from "react";

function parseSealToken(raw: string): number | null {
  const trimmed = raw.trim();
  if (!trimmed) {
    return null;
  }

  const value = Number(trimmed);
  if (!Number.isInteger(value) || value < 1) {
    return null;
  }

  return value;
}

type FormSealNumberTagsProps = {
  name: string;
  label: string;
  id?: string;
  placeholder?: string;
  className?: string;
};

export function FormSealNumberTags({
  name,
  label,
  id,
  placeholder = "Digite o número e pressione Enter ou Tab",
  className,
}: FormSealNumberTagsProps) {
  const { values, errors, touched, setFieldValue, setFieldTouched } =
    useFormikContext<Record<string, unknown>>();

  const fieldId = id ?? name;
  const errorMessage = getFormikFieldError(touched, errors, name);
  const fieldError = Boolean(errorMessage);

  const tags = (values[name] as number[] | undefined) ?? [];
  const [draft, setDraft] = useState("");
  const [inputHint, setInputHint] = useState<string | null>(null);
  const commitDraft = useCallback(() => {
    const parsed = parseSealToken(draft);
    if (!parsed) {
      if (draft.trim()) {
        setInputHint("Informe um número inteiro maior ou igual a 1.");
      }
      return false;
    }

    if (tags.includes(parsed)) {
      setInputHint("Este número já foi adicionado.");
      return false;
    }

    void setFieldValue(name, [...tags, parsed]);
    void setFieldTouched(name, true, false);
    setDraft("");
    setInputHint(null);
    return true;
  }, [draft, name, setFieldTouched, setFieldValue, tags]);

  const removeTag = useCallback(
    (value: number) => {
      void setFieldValue(
        name,
        tags.filter((tag) => tag !== value),
      );
      void setFieldTouched(name, true, false);
    },
    [name, setFieldTouched, setFieldValue, tags],
  );

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === "Tab") {
      if (draft.trim()) {
        event.preventDefault();
        commitDraft();
      }
      return;
    }

    if (event.key === "Backspace" && draft === "" && tags.length > 0) {
      event.preventDefault();
      removeTag(tags[tags.length - 1]);
    }
  }

  return (
    <FormField
      label={label}
      htmlFor={fieldId}
      error={errorMessage}
      className={className}
    >
      <div
        className={getFieldClassName(
          fieldError,
          "flex min-h-[2.75rem] flex-wrap items-center gap-2 px-2 py-1.5",
        )}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className={`${sealNumberTagClass} gap-1`}
          >
            {tag}
            <button
              type="button"
              className="inline-flex rounded p-0.5 text-kyowa-muted transition hover:text-kyowa-ink"
              onClick={() => removeTag(tag)}
              aria-label={`Remover lacra ${tag}`}
            >
              <X className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </span>
        ))}
        <input
          id={fieldId}
          type="text"
          inputMode="numeric"
          aria-describedby={inputHint ? `${fieldId}-hint` : undefined}
          className="min-w-[8rem] flex-1 border-0 bg-transparent px-1 py-1 text-sm outline-none"
          value={draft}
          placeholder={tags.length === 0 ? placeholder : ""}
          onChange={(event) => {
            setDraft(event.target.value);
            setInputHint(null);
          }}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (draft.trim()) {
              commitDraft();
            }
          }}
        />
      </div>
      {inputHint ? (
        <p id={`${fieldId}-hint`} className="mt-1 text-xs text-red-600">
          {inputHint}
        </p>
      ) : null}
    </FormField>
  );
}
