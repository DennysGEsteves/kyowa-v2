import { formatDateYyyyMmDd } from "@/utils/date/formatDateYyyyMmDd";

/** Ex.: criação 2026-10-15 + id `1` → `202610151`. */
export function buildReceiptNumber(
  createdAt: string,
  sequentialId: number,
): string {
  const datePart = formatDateYyyyMmDd(createdAt);
  return `${datePart}${sequentialId}`;
}
