import { tableRowHoverClass } from "../TableStyles";
import type { ReactNode } from "react";

type TableRowProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function TableRow({ children, className = "", onClick }: TableRowProps) {
  return (
    <tr
      className={`${tableRowHoverClass} ${className}`}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
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
    >
      {children}
    </tr>
  );
}
