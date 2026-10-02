import { ActionButton } from "@/components/ActionButton";
import { TableStatusBadge, type TableColumn } from "@/components/Table";
import {
  providerTypeLabels,
  type Provider,
  type ProviderType,
} from "@entities";
import { Pencil, Trash } from "lucide-react";

export type ProviderTableColumn = TableColumn<Provider>;

function formatLocation(provider: Provider) {
  if (provider.city && provider.region) {
    return `${provider.city} / ${provider.region}`;
  }
  return provider.city ?? provider.region ?? "—";
}

export const getProviderTableColumns = (
  onEdit: (provider: Provider) => void,
  onDelete: (provider: Provider) => void,
): ProviderTableColumn[] => [
  {
    id: "name",
    header: "Nome",
    accessorKey: "name",
    className: "font-medium max-w-[200px]",
    mobile: { role: "title" },
  },
  {
    id: "cnpj",
    header: "CNPJ",
    accessorKey: "cnpj",
    mobile: { role: "subtitle" },
    cell: ({ value }) => (value ? String(value) : "—"),
  },
  {
    id: "type",
    header: "Tipo",
    accessorKey: "type",
    mobile: { role: "field", label: "Tipo" },
    cell: ({ value }) => {
      if (value !== "product" && value !== "service") return "—";
      return providerTypeLabels[value as ProviderType];
    },
  },
  {
    id: "location",
    header: "Cidade / UF",
    mobile: { role: "field", label: "Local" },
    render: (provider) => formatLocation(provider),
  },
  {
    id: "phone1",
    header: "Telefone",
    accessorKey: "phone1",
    mobile: { role: "field", label: "Contato", className: "col-span-2" },
    cell: ({ row, value }) =>
      value ? String(value) : (row.email ?? "—"),
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
    render: (provider) => (
      <div className="flex items-center justify-end gap-1">
        <ActionButton
          variant="ghost"
          className="p-2"
          onClick={() => onEdit(provider)}
          aria-label={`Editar ${provider.name}`}
        >
          <Pencil className="h-4 w-4 text-kyowa-gold" strokeWidth={1.75} />
        </ActionButton>
        <ActionButton
          variant="ghost"
          className="p-2"
          onClick={() => onDelete(provider)}
          aria-label={`Remover ${provider.name}`}
        >
          <Trash className="h-4 w-4 text-red-700" strokeWidth={1.75} />
        </ActionButton>
      </div>
    ),
  },
];
