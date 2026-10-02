import type { ReactNode } from "react";

type TableElementProps = {
  children: ReactNode;
  className?: string;
};

export function TableElement({ children, className = "" }: TableElementProps) {
  return (
    <table className={`min-w-full text-left text-sm ${className}`}>
      {children}
    </table>
  );
}
