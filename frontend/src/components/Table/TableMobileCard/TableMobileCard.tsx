import { tableMobileCardClass } from "../TableStyles";
import type { ReactNode } from "react";

type TableMobileCardProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function TableMobileCard({
  children,
  className = "",
  onClick,
}: TableMobileCardProps) {
  return (
    <li
      className={`${tableMobileCardClass} ${className}`}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </li>
  );
}
