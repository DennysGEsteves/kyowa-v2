import { tableHeadClass } from "../TableStyles";
import type { ReactNode } from "react";

type TableHeaderProps = {
  children: ReactNode;
  className?: string;
};

export function TableHeader({ children, className = "" }: TableHeaderProps) {
  return <thead className={`${tableHeadClass} ${className}`}>{children}</thead>;
}
