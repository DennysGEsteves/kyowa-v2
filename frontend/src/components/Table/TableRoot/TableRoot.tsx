import { tableContainerClass } from "../TableStyles";
import type { ReactNode } from "react";

type TableRootProps = {
  children: ReactNode;
  className?: string;
};

export function TableRoot({ children, className = "" }: TableRootProps) {
  return (
    <div className={`${tableContainerClass} ${className}`}>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}
