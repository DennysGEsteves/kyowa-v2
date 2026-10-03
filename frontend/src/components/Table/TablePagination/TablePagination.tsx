"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type TablePaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

export function TablePagination({
  page,
  totalPages,
  onPageChange,
  disabled = false,
}: TablePaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return (
    <nav
      className="mt-4 flex flex-col items-stretch gap-2 border-t border-kyowa-border pt-4 sm:flex-row sm:items-center sm:justify-between"
      aria-label="Paginação"
    >
      <p className="text-center text-sm text-kyowa-muted sm:text-left">
        Página {page} de {totalPages}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={disabled || !canGoPrev}
          onClick={() => onPageChange(page - 1)}
          className="inline-flex flex-1 items-center justify-center gap-1 rounded-sm border border-kyowa-border px-3 py-2 text-sm font-medium text-kyowa-ink transition hover:bg-kyowa-surface disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          Anterior
        </button>
        <button
          type="button"
          disabled={disabled || !canGoNext}
          onClick={() => onPageChange(page + 1)}
          className="inline-flex flex-1 items-center justify-center gap-1 rounded-sm border border-kyowa-border px-3 py-2 text-sm font-medium text-kyowa-ink transition hover:bg-kyowa-surface disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
        >
          Próxima
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </nav>
  );
}
