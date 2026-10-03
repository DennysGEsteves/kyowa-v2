import { ActionButton } from "@/components/Form/ActionButton";
import { TableStatusBadge, type TableColumn } from "@/components/Table";
import type { Architect, User } from "@entities";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";

export type ArchitectTableColumn = TableColumn<Architect>;

function formatLocation(architect: Architect) {
  if (architect.city && architect.region) {
    return `${architect.city} / ${architect.region}`;
  }
  return architect.city ?? architect.region ?? "—";
}

export function buildSellerNameLookup(users: User[]) {
  const byId = new Map(users.map((user) => [user.id, user.name]));

  return (sellerId: string) => byId.get(sellerId) ?? "—";
}

export const getArchitectTableColumns = (
  getEditHref: (architect: Architect) => string,
  onDelete: (architect: Architect) => void,
  getSellerName: (sellerId: string) => string,
): ArchitectTableColumn[] => [
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
    render: (architect) => formatLocation(architect),
  },
  {
    id: "phone1",
    header: "Telefone",
    accessorKey: "phone1",
    mobile: { role: "field", label: "Telefone" },
    cell: ({ value }) => (value ? String(value) : "—"),
  },
  {
    id: "seller",
    header: "Vendedor",
    accessorKey: "sellerId",
    mobile: { role: "field", label: "Vendedor", className: "col-span-2" },
    cell: ({ value }) => getSellerName(String(value)),
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
    render: (architect) => (
      <div className="flex items-center justify-end gap-1">
        <Link
          href={getEditHref(architect)}
          className="inline-flex p-2 text-sm font-medium text-kyowa-muted transition hover:text-kyowa-ink"
          aria-label={`Editar ${architect.name}`}
        >
          <Pencil className="h-4 w-4 text-kyowa-gold" strokeWidth={1.75} />
        </Link>
        <ActionButton
          variant="ghost"
          className="p-2"
          onClick={() => onDelete(architect)}
          aria-label={`Remover ${architect.name}`}
        >
          <Trash className="h-4 w-4 text-red-700" strokeWidth={1.75} />
        </ActionButton>
      </div>
    ),
  },
];
