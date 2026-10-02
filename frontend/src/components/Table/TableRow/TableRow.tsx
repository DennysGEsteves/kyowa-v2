import { tableRowHoverClass } from "../TableStyles";
import type { ReactNode } from "react";

type TableRowProps = {
  children: ReactNode;
  className?: string;
};

export function TableRow({ children, className = "" }: TableRowProps) {
  return <tr className={`${tableRowHoverClass} ${className}`}>{children}</tr>;
}
