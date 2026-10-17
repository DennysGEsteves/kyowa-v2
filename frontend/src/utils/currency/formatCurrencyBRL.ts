import { formatCurrencyBRLFromNumber } from "@/utils/masks/currency";

/** Valor monetário da API → exibição em tabelas e textos (null/undefined → —). */
export function formatCurrencyBRL(value: number | null | undefined): string {
  if (value === null || value === undefined) {
    return "—";
  }
  const formatted = formatCurrencyBRLFromNumber(value);
  return formatted || "—";
}
