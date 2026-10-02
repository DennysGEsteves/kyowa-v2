import type { ReactNode } from "react";
import type { TableColumn } from "./types";

function getAccessorValue<T>(row: T, column: TableColumn<T>): unknown {
  if (column.accessorFn) {
    return column.accessorFn(row);
  }

  if (column.accessorKey) {
    return row[column.accessorKey];
  }

  return undefined;
}

function formatDefaultCellValue(value: unknown): ReactNode {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (typeof value === "boolean") {
    return value ? "Sim" : "Não";
  }

  return String(value);
}

export function resolveColumnCell<T>(row: T, column: TableColumn<T>): ReactNode {
  if (column.render) {
    return column.render(row);
  }

  const value = getAccessorValue(row, column);

  if (column.cell) {
    return column.cell({ row, value });
  }

  return formatDefaultCellValue(value);
}
