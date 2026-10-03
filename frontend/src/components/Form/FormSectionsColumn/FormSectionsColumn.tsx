import type { ReactNode } from "react";
import { formSectionsColumn } from "../formLayout";

type FormSectionsColumnProps = {
  children: ReactNode;
  className?: string;
};

export function FormSectionsColumn({
  children,
  className = "",
}: FormSectionsColumnProps) {
  return (
    <div className={`${formSectionsColumn} ${className}`.trim()}>{children}</div>
  );
}
