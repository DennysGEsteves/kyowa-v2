import type { ReactNode } from "react";

type FormBodyProps = {
  children: ReactNode;
  className?: string;
};

export function FormBody({ children, className = "" }: FormBodyProps) {
  return (
    <div
      className={`flex-1 overflow-y-auto px-5 py-5 sm:px-6 ${className ?? "space-y-4"}`}
    >
      {children}
    </div>
  );
}
