import { tableCellPadding } from "../TableStyles";
import type { ReactNode } from "react";

type TableHeadAlign = "left" | "right";

type TableHeadProps = {
  children: ReactNode;
  align?: TableHeadAlign;
  className?: string;
};

export function TableHead({
  children,
  align = "left",
  className = "",
}: TableHeadProps) {
  return (
    <th
      className={`${tableCellPadding} font-semibold ${
        align === "right" ? "text-right" : ""
      } ${className}`}
    >
      {children}
    </th>
  );
}
