import type { ReactNode } from "react";

type FormBodyProps = {
  children: ReactNode;
  className?: string;
};

export function FormBody({ children, className = "" }: FormBodyProps) {
  return (
    <div
      className={`flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-6 ${className}`}
    >
      {children}
    </div>
  );
}
