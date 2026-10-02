export function resolveRowKey<T>(row: T, index: number): string {
  if (
    row !== null &&
    typeof row === "object" &&
    "id" in row &&
    (row as { id?: unknown }).id !== undefined &&
    (row as { id?: unknown }).id !== null
  ) {
    return String((row as { id: string | number }).id);
  }

  return String(index);
}
