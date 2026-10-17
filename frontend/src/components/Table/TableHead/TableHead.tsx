import type { TableColumnAlign } from "../types";
import { tableCellPadding, tableHeadCellClass } from "../TableStyles";
import type { ReactNode } from "react";

type TableHeadProps = {
  children: ReactNode;
  align?: TableColumnAlign;
  className?: string;
};

function headAlignClass(align: TableColumnAlign): string {
  if (align === "right") return "text-right";
  if (align === "center") return "text-center";
  return "text-left";
}

export function TableHead({
  children,
  align = "left",
  className = "",
}: TableHeadProps) {
  return (
    <th
      className={`${tableCellPadding} ${tableHeadCellClass} align-middle font-semibold ${headAlignClass(align)} ${className}`}
    >
      {children}
    </th>
  );
}
