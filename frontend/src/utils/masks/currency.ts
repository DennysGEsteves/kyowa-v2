import { digitsOnly } from "./digits";

/** Sufixo padrão em labels de campos monetários (ex.: "Total" → "Total R$"). */
export function currencyFieldLabel(label: string): string {
  const trimmed = label.trimEnd();
  if (trimmed.endsWith("R$")) {
    return trimmed;
  }
  return `${trimmed} R$`;
}

function formatCentsAsBRL(cents: number): string {
  const abs = Math.abs(cents);
  const intPart = Math.floor(abs / 100);
  const dec = abs % 100;
  const intStr = intPart.toLocaleString("pt-BR");
  const sign = cents < 0 ? "-" : "";
  return `${sign}${intStr},${dec.toString().padStart(2, "0")}`;
}

/** Valor numérico da API → exibição no campo (ex.: 1234.5 → 1.234,50) */
export function formatCurrencyBRLFromNumber(value: number): string {
  if (!Number.isFinite(value)) return "";
  return formatCentsAsBRL(Math.round(value * 100));
}

/** Digitação no campo: só dígitos viram centavos mascarados */
export function maskCurrencyBRLInput(raw: string): string {
  const digits = digitsOnly(raw);
  if (!digits) return "";
  const cents = Number.parseInt(digits, 10);
  if (!Number.isFinite(cents)) return "";
  return formatCentsAsBRL(cents);
}

/** Texto mascarado → número para o DTO */
export function parseCurrencyBRL(value: string): number | undefined {
  const digits = digitsOnly(value);
  if (!digits) return undefined;
  const cents = Number.parseInt(digits, 10);
  if (!Number.isFinite(cents)) return undefined;
  return cents / 100;
}
