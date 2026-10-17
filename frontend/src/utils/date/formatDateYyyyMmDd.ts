const SAO_PAULO = "America/Sao_Paulo";

/** Data em `YYYYMMDD` (fuso de São Paulo). */
export function formatDateYyyyMmDd(
  value: Date | string | number,
  timeZone = SAO_PAULO,
): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(date)
    .replace(/-/g, "");
}
