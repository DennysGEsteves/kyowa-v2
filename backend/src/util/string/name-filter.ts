export function toNameFilter(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function resolveNameFilter(name: string, nameFilter?: string): string {
  const trimmed = nameFilter?.trim();
  return toNameFilter(trimmed ?? name);
}
