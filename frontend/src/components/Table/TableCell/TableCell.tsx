import { tableCellPadding } from "../TableStyles";
import type { ReactNode } from "react";

type TableCellAlign = "left" | "right";

type TableCellProps = {
  children: ReactNode;
  align?: TableCellAlign;
  className?: string;
};

export function TableCell({
  children,
  align = "left",
  className = "",
}: TableCellProps) {
  return (
    <td
      className={`${tableCellPadding} ${align === "right" ? "text-right" : ""} ${className}`}
    >
      {children}
    </td>
  );
}
