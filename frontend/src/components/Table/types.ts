import type { ReactNode } from "react";

export type TableColumnAlign = "left" | "right";

export type TableColumnMobileRole =
  | "title"
  | "subtitle"
  | "trailing"
  | "field"
  | "actions";

export type TableColumnCellContext<T> = {
  row: T;
  value: unknown;
};

export type TableColumn<T> = {
  id: string;
  header: ReactNode;
  accessorKey?: keyof T;
  accessorFn?: (row: T) => unknown;
  cell?: (context: TableColumnCellContext<T>) => ReactNode;
  render?: (row: T) => ReactNode;
  align?: TableColumnAlign;
  className?: string;
  mobile?: {
    role: TableColumnMobileRole;
    label?: string;
    className?: string;
  };
};

export type DataTableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  emptyMessage?: ReactNode;
};
