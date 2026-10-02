import { tableBodyClass } from "../TableStyles";
import type { ReactNode } from "react";

type TableBodyProps = {
  children: ReactNode;
  className?: string;
};

export function TableBody({ children, className = "" }: TableBodyProps) {
  return <tbody className={`${tableBodyClass} ${className}`}>{children}</tbody>;
}
