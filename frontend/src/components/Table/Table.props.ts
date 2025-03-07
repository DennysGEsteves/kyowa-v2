/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from "react";

export type TableColumnsType = {
  accessorKey: string;
  title: string;
  render?: (data: any) => ReactNode;
};

export type TableComponentType = {
  columns: TableColumnsType[];
  items: Record<string, any>[];
  search?: boolean;
  searchKeys?: string[];
  onSearch?: (text: string) => void;
  pagination?: {
    total: number;
    totalPages: number;
    page: number;
    onPageChange: (page: number) => void;
  };
};
