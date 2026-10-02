type FormActionsProps = {
  onCancel: () => void;
  submitLabel: string;
  cancelLabel?: string;
};

export function FormActions({
  onCancel,
  submitLabel,
  cancelLabel = "Cancelar",
}: FormActionsProps) {
  return (
    <div className="flex flex-col-reverse gap-2 border-t border-kyowa-border px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2.5 text-sm font-medium text-kyowa-muted hover:text-kyowa-ink"
      >
        {cancelLabel}
      </button>
      <button
        type="submit"
        className="bg-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white hover:bg-kyowa-maroon-dark"
      >
        {submitLabel}
      </button>
    </div>
  );
}
