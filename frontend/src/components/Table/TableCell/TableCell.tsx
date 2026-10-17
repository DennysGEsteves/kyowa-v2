import type { TableColumnAlign } from "../types";
import { tableCellPadding } from "../TableStyles";
import type { ReactNode } from "react";

type TableCellProps = {
  children: ReactNode;
  align?: TableColumnAlign;
  className?: string;
};

function cellAlignClass(align: TableColumnAlign): string {
  if (align === "right") return "text-right";
  if (align === "center") return "text-center";
  return "text-left";
}

export function TableCell({
  children,
  align = "left",
  className = "",
}: TableCellProps) {
  return (
    <td
      className={`${tableCellPadding} align-middle ${cellAlignClass(align)} ${className}`}
    >
      {children}
    </td>
  );
}
