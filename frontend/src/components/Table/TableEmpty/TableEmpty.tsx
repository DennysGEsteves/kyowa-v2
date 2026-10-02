import { tableEmptyClass } from "../TableStyles";
import type { ReactNode } from "react";

type TableEmptyProps = {
  children: ReactNode;
  className?: string;
};

export function TableEmpty({ children, className = "" }: TableEmptyProps) {
  return <div className={`${tableEmptyClass} ${className}`}>{children}</div>;
}
