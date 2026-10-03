import { ActionButton } from "@/components/Form/ActionButton";
import type { TableColumn } from "@/components/Table";
import type { Store, User } from "@entities";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";

export type StoreTableColumn = TableColumn<Store>;

function formatLocation(store: Store) {
  const city = store.address?.city;
  const region = store.address?.region;
  if (city && region) {
    return `${city} / ${region}`;
  }
  return city ?? region ?? "—";
}

export const getStoreTableColumns = (
  getEditHref: (store: Store) => string,
  onDelete: (store: Store) => void,
  getManagerName: (managerId: string | null) => string,
): StoreTableColumn[] => [
  {
    id: "name",
    header: "Nome",
    accessorKey: "name",
    className: "font-medium max-w-[200px]",
    mobile: { role: "title" },
  },
  {
    id: "location",
    header: "Cidade / UF",
    mobile: { role: "subtitle" },
    render: (store) => formatLocation(store),
  },
  {
    id: "phone1",
    header: "Telefone",
    accessorKey: "phone1",
    mobile: { role: "field", label: "Telefone" },
    cell: ({ value }) => (value ? String(value) : "—"),
  },
  {
    id: "email",
    header: "E-mail",
    accessorKey: "email",
    mobile: { role: "field", label: "E-mail", className: "col-span-2" },
    cell: ({ value }) => (value ? String(value) : "—"),
  },
  {
    id: "manager",
    header: "Gerente",
    accessorKey: "managerId",
    mobile: { role: "field", label: "Gerente" },
    cell: ({ value }) => getManagerName(value as string | null),
  },
  {
    id: "actions",
    header: "Ações",
    align: "right",
    mobile: { role: "actions" },
    render: (store) => (
      <div className="flex items-center justify-end gap-1">
        <Link
          href={getEditHref(store)}
          className="inline-flex p-2 text-sm font-medium text-kyowa-muted transition hover:text-kyowa-ink"
          aria-label={`Editar ${store.name}`}
        >
          <Pencil className="h-4 w-4 text-kyowa-gold" strokeWidth={1.75} />
        </Link>
        <ActionButton
          variant="ghost"
          className="p-2"
          onClick={() => onDelete(store)}
          aria-label={`Remover ${store.name}`}
        >
          <Trash className="h-4 w-4 text-red-700" strokeWidth={1.75} />
        </ActionButton>
      </div>
    ),
  },
];

export function buildManagerNameLookup(users: User[]) {
  const byId = new Map(users.map((user) => [user.id, user.name]));

  return (managerId: string | null) => {
    if (!managerId) return "—";
    return byId.get(managerId) ?? "—";
  };
}
