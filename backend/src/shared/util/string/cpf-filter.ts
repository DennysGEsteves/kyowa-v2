import { escapeRegExp } from './escape-regexp';

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

/** Permite busca parcial ignorando pontuação do CPF armazenado. */
export function buildCpfPartialRegex(filter: string): string | null {
  const digits = digitsOnly(filter);
  if (!digits) {
    return null;
  }

  return digits
    .split('')
    .map((digit) => escapeRegExp(digit))
    .join('\\D*');
}
