import type { ReactNode } from "react";
import { formSectionsGrid } from "../formLayout";

type FormSectionsGridProps = {
  children: ReactNode;
  className?: string;
};

export function FormSectionsGrid({
  children,
  className = "",
}: FormSectionsGridProps) {
  return (
    <div className={`${formSectionsGrid} ${className}`.trim()}>{children}</div>
  );
}
