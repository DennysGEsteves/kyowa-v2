import { ActionButton } from "@/components/Form/ActionButton";
import { TableStatusBadge, type TableColumn } from "@/components/Table";
import {
  interestProductLabels,
  type Architect,
  type Client,
  type InterestProduct,
} from "@entities";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";

export type ClientTableColumn = TableColumn<Client>;

function formatLocation(client: Client) {
  if (client.city && client.region) {
    return `${client.city} / ${client.region}`;
  }
  return client.city ?? client.region ?? "—";
}

function formatInterestProducts(products: InterestProduct[] | null) {
  if (!products?.length) return "—";
  return products.map((item) => interestProductLabels[item]).join(", ");
}

export function buildArchitectNameLookup(architects: Architect[]) {
  const byId = new Map(architects.map((architect) => [architect.id, architect.name]));

  return (architectId: string | null) => {
    if (!architectId) return "—";
    return byId.get(architectId) ?? "—";
  };
}

export const getClientTableColumns = (
  getEditHref: (client: Client) => string,
  onDelete: (client: Client) => void,
  getArchitectName: (architectId: string | null) => string,
): ClientTableColumn[] => [
  {
    id: "name",
    header: "Nome",
    accessorKey: "name",
    className: "font-medium max-w-[200px]",
    mobile: { role: "title" },
  },
  {
    id: "cpf",
    header: "CPF",
    accessorKey: "cpf",
    mobile: { role: "subtitle" },
    cell: ({ value }) => (value ? String(value) : "—"),
  },
  {
    id: "location",
    header: "Cidade / UF",
    mobile: { role: "field", label: "Local" },
    render: (client) => formatLocation(client),
  },
  {
    id: "phone1",
    header: "Telefone",
    accessorKey: "phone1",
    mobile: { role: "field", label: "Telefone" },
    cell: ({ value }) => (value ? String(value) : "—"),
  },
  {
    id: "architect",
    header: "Arquiteto",
    accessorKey: "architectId",
    mobile: { role: "field", label: "Arquiteto" },
    cell: ({ value }) => getArchitectName(value as string | null),
  },
  {
    id: "interestProducts",
    header: "Interesses",
    accessorKey: "interestProducts",
    cell: ({ value }) =>
      formatInterestProducts(value as InterestProduct[] | null),
  },
  {
    id: "active",
    header: "Status",
    accessorKey: "active",
    mobile: { role: "trailing" },
    cell: ({ value }) => <TableStatusBadge active={Boolean(value)} />,
  },
  {
    id: "actions",
    header: "Ações",
    align: "right",
    mobile: { role: "actions" },
    render: (client) => (
      <div className="flex items-center justify-end gap-1">
        <Link
          href={getEditHref(client)}
          className="inline-flex p-2 text-sm font-medium text-kyowa-muted transition hover:text-kyowa-ink"
          aria-label={`Editar ${client.name}`}
        >
          <Pencil className="h-4 w-4 text-kyowa-gold" strokeWidth={1.75} />
        </Link>
        <ActionButton
          variant="ghost"
          className="p-2"
          onClick={() => onDelete(client)}
          aria-label={`Remover ${client.name}`}
        >
          <Trash className="h-4 w-4 text-red-700" strokeWidth={1.75} />
        </ActionButton>
      </div>
    ),
  },
];
