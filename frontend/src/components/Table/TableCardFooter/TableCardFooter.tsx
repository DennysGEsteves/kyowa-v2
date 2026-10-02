import type { ReactNode } from "react";

type TableCardFooterProps = {
  children: ReactNode;
};

export function TableCardFooter({ children }: TableCardFooterProps) {
  return (
    <div className="mt-4 flex justify-end border-t border-kyowa-border pt-3">
      {children}
    </div>
  );
}
