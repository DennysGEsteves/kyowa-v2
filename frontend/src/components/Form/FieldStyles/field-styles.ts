export const formInputClass =
  "w-full rounded-sm border border-kyowa-border px-3 py-2.5 text-sm outline-none focus:border-kyowa-maroon";

export const formInputErrorClass = "border-red-400 focus:border-red-500";

export function getFieldClassName(hasError: boolean, className?: string) {
  return [
    formInputClass,
    hasError ? formInputErrorClass : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export const formLabelClass = "mb-1.5 block text-sm font-medium text-kyowa-ink";
