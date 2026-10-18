import {
  tableActionIconClass,
  tableActionIconLinkClass,
  type TableColumn,
} from "@/components/Table";
import type { Budget } from "@entities";
import { BudgetStatusBadge } from "./components/BudgetStatusBadge";
import type { ClientStoreArchitectLookups } from "@/hooks/useClientStoreArchitectLookups";
import { formatDateTimeShort } from "@/utils/date";
import { formatCurrencyBRL } from "@/utils/currency";
import { currencyFieldLabel } from "@/utils/masks";
import { routes } from "@routes";
import { Pencil } from "lucide-react";
import Link from "next/link";

export const getBudgetTableColumns = (
  lookups: ClientStoreArchitectLookups,
): TableColumn<Budget>[] => [
  {
    id: "sequentialId",
    header: "#",
    align: "center",
    className: "whitespace-nowrap text-center tabular-nums",
    mobile: { role: "field", label: "#" },
    render: (budget) =>
      budget.sequentialId != null ? String(budget.sequentialId) : "—",
  },
  {
    id: "createdAt",
    header: "Criado em",
    accessorKey: "createdAt",
    className: "whitespace-nowrap",
    mobile: { role: "title" },
    cell: ({ value }) => formatDateTimeShort(String(value)),
  },
  {
    id: "client",
    header: "Cliente",
    mobile: { role: "subtitle" },
    render: (budget) => lookups.getClientName(budget.clientId),
  },
  {
    id: "architect",
    header: "Arquiteto",
    mobile: { role: "field", label: "Arquiteto" },
    render: (budget) => lookups.getArchitectName(budget.architectId),
  },
  {
    id: "store",
    header: "Loja",
    mobile: { role: "field", label: "Loja" },
    render: (budget) => lookups.getStoreName(budget.storeId),
  },
  {
    id: "status",
    header: "Status",
    mobile: { role: "field", label: "Status" },
    render: (budget) => (
      <BudgetStatusBadge status={budget.status} />
    ),
  },
  {
    id: "total",
    header: currencyFieldLabel("Total"),
    align: "left",
    className: "text-left",
    mobile: { role: "field", label: currencyFieldLabel("Total") },
    render: (budget) => formatCurrencyBRL(budget.total),
  },
  {
    id: "actions",
    header: "Ações",
    align: "right",
    mobile: { role: "actions" },
    render: (budget) => {
      const label =
        budget.sequentialId != null
          ? `Editar orçamento #${budget.sequentialId}`
          : "Editar orçamento";

      return (
        <div className="flex items-center justify-end gap-1">
          <Link
            href={routes.budgets.edit(budget.id)}
            className={tableActionIconLinkClass}
            aria-label={label}
          >
            <Pencil
              className={`${tableActionIconClass} text-kyowa-gold`}
              strokeWidth={1.75}
            />
          </Link>
        </div>
      );
    },
  },
];
