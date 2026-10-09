import { ActionButton } from "@/components/Form/ActionButton";
import type { TableColumn } from "@/components/Table";
import {
  budgetStatusLabels,
  type Architect,
  type Budget,
  type Client,
  type Store,
} from "@entities";
import {
  currencyFieldLabel,
  formatCurrencyBRLFromNumber,
} from "@/utils/masks";
import { routes } from "@routes";
import Link from "next/link";

export type BudgetTableColumn = TableColumn<Budget>;

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

function formatBudgetCreatedAt(createdAt: string) {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }
  return dateTimeFormatter.format(date);
}

function formatBudgetTotal(total: number | null) {
  if (total === null || total === undefined) {
    return "—";
  }
  return formatCurrencyBRLFromNumber(total);
}

export function buildBudgetLookups(
  clients: Client[],
  stores: Store[],
  architects: Architect[],
) {
  const clientById = new Map(clients.map((client) => [client.id, client]));
  const storeById = new Map(stores.map((store) => [store.id, store]));
  const architectById = new Map(
    architects.map((architect) => [architect.id, architect]),
  );

  return {
    getClientName: (clientId: string | null) =>
      clientId ? (clientById.get(clientId)?.name ?? "—") : "—",
    getStoreName: (storeId: string) => storeById.get(storeId)?.name ?? "—",
    getArchitectName: (architectId: string | null) =>
      architectId ? (architectById.get(architectId)?.name ?? "—") : "—",
  };
}

export const getBudgetTableColumns = (
  lookups: ReturnType<typeof buildBudgetLookups>,
): BudgetTableColumn[] => [
  {
    id: "createdAt",
    header: "Data",
    accessorKey: "createdAt",
    className: "whitespace-nowrap",
    mobile: { role: "title" },
    cell: ({ value }) => formatBudgetCreatedAt(String(value)),
  },
  {
    id: "client",
    header: "Cliente",
    mobile: { role: "subtitle" },
    render: (budget) => lookups.getClientName(budget.clientId),
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
    render: (budget) => budgetStatusLabels[budget.status],
  },
  {
    id: "total",
    header: currencyFieldLabel("Total"),
    align: "right",
    mobile: { role: "field", label: currencyFieldLabel("Total") },
    render: (budget) => formatBudgetTotal(budget.total),
  },
  {
    id: "actions",
    header: "Ações",
    align: "right",
    mobile: { role: "actions" },
    render: (budget) => (
      <div className="flex justify-end">
        <Link href={routes.budgets.edit(budget.id)}>
          <ActionButton variant="primary" className="px-3 py-1.5 text-xs">
            Editar
          </ActionButton>
        </Link>
      </div>
    ),
  },
];
