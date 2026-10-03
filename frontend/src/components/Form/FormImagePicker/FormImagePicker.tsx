"use client";

import { ImageIcon, X } from "lucide-react";
import { useFormikContext } from "formik";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { formLabelClass } from "../FieldStyles";
import { FormFieldError } from "../FormFieldError";
import { getFormikFieldError, getFormikFieldValue } from "../formikField";

const DEFAULT_ACCEPT = "image/jpeg,image/png,image/webp,image/gif";
const DEFAULT_MAX_SIZE_MB = 5;

type FormImagePickerProps = {
  name: string;
  label: string;
  id?: string;
  className?: string;
  accept?: string;
  maxSizeMb?: number;
  hint?: string;
};

export function FormImagePicker({
  name,
  label,
  id,
  className = "",
  accept = DEFAULT_ACCEPT,
  maxSizeMb = DEFAULT_MAX_SIZE_MB,
  hint = `JPG, PNG, WebP ou GIF. Máx. ${DEFAULT_MAX_SIZE_MB} MB.`,
}: FormImagePickerProps) {
  const { values, errors, touched, setFieldValue, setFieldTouched } =
    useFormikContext();

  const inputRef = useRef<HTMLInputElement>(null);
  const fieldId = id ?? name;
  const errorMessage = getFormikFieldError(touched, errors, name);
  const file = getFormikFieldValue(values, name) as File | null | undefined;

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;
    void setFieldValue(name, selected);
    void setFieldTouched(name, true, false);
    event.target.value = "";
  };

  const clearImage = () => {
    void setFieldValue(name, null);
    void setFieldTouched(name, true, false);
  };

  const displayHint =
    hint ?? `JPG, PNG, WebP ou GIF. Máx. ${maxSizeMb} MB.`;

  return (
    <div className={className}>
      <span className={formLabelClass}>{label}</span>

      <div
        className={`relative flex min-h-[10rem] flex-col items-center justify-center gap-3 rounded-sm border border-dashed p-4 ${
          errorMessage ? "border-red-400" : "border-kyowa-border bg-kyowa-surface/50"
        }`}
      >
        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt="Pré-visualização da imagem selecionada"
              className="max-h-48 w-full max-w-xs object-contain"
            />
            <p className="max-w-full truncate text-xs text-kyowa-muted">
              {file?.name}
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-kyowa-muted">
            <ImageIcon className="h-10 w-10 stroke-[1.25]" aria-hidden />
            <p className="text-sm">Nenhuma imagem selecionada</p>
          </div>
        )}

        <input
          ref={inputRef}
          id={fieldId}
          name={name}
          type="file"
          accept={accept}
          className="sr-only"
          onChange={handleFileChange}
        />

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={openFileDialog}
            className="border border-kyowa-border bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-kyowa-ink transition hover:bg-kyowa-surface"
          >
            Selecionar imagem
          </button>
          {file ? (
            <button
              type="button"
              onClick={clearImage}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-kyowa-muted transition hover:text-kyowa-ink"
            >
              <X className="h-4 w-4" aria-hidden />
              Remover
            </button>
          ) : null}
        </div>
      </div>

      <p className="mt-1.5 text-xs text-kyowa-muted">{displayHint}</p>
      <FormFieldError message={errorMessage} />
    </div>
  );
}
