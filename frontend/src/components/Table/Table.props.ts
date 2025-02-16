/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from "react";

export type TableColumnsType = {
  accessorKey: string;
  title: string;
  render?: (data: any) => ReactNode;
};

export type TableComponentType = {
  columns: TableColumnsType[];
  data: Record<string, any>;
  search: true;
  pagination?: boolean;
};
