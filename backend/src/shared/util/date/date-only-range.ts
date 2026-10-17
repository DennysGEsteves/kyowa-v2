const BRAZIL_OFFSET = '-03:00';

/** Interpreta `YYYY-MM-DD` como início do dia (horário de Brasília). */
export function startOfDateOnly(dateOnly: string): Date {
  return new Date(`${dateOnly}T00:00:00.000${BRAZIL_OFFSET}`);
}

/** Interpreta `YYYY-MM-DD` como fim do dia (horário de Brasília). */
export function endOfDateOnly(dateOnly: string): Date {
  return new Date(`${dateOnly}T23:59:59.999${BRAZIL_OFFSET}`);
}
