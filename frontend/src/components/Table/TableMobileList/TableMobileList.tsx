import { tableMobileListClass } from "../TableStyles";
import type { ReactNode } from "react";

type TableMobileListProps = {
  children: ReactNode;
  className?: string;
};

export function TableMobileList({
  children,
  className = "",
}: TableMobileListProps) {
  return <ul className={`${tableMobileListClass} ${className}`}>{children}</ul>;
}
