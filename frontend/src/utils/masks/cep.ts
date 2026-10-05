import { digitsOnly } from "./digits";

/** Máscara brasileira: 00000-000 */
export function formatCepBR(value: string): string {
  const digits = digitsOnly(value).slice(0, 8);
  if (digits.length === 0) return "";
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}
