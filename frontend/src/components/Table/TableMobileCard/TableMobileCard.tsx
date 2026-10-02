import { tableMobileCardClass } from "../TableStyles";
import type { ReactNode } from "react";

type TableMobileCardProps = {
  children: ReactNode;
  className?: string;
};

export function TableMobileCard({
  children,
  className = "",
}: TableMobileCardProps) {
  return (
    <li className={`${tableMobileCardClass} ${className}`}>{children}</li>
  );
}
