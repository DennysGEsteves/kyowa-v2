/** Máscara comum de RG: 00.000.000-0 (aceita X no dígito verificador). */
export function formatRgBR(value: string): string {
  const cleaned = value.replace(/[^\dXx]/gi, "").toUpperCase().slice(0, 9);
  if (!cleaned) return "";

  const endsWithX = cleaned.endsWith("X");
  const digits = cleaned.replace(/X/g, "").slice(0, 9);

  if (endsWithX && digits.length >= 8) {
    const body = digits.slice(0, 8);
    return `${body.slice(0, 2)}.${body.slice(2, 5)}.${body.slice(5, 8)}-X`;
  }

  if (digits.length <= 2) return digits;
  if (digits.length <= 5) {
    return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  }
  if (digits.length <= 8) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  }
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}-${digits.slice(8)}`;
}
