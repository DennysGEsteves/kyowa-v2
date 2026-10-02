import { ActionButton } from "@/components/ActionButton";
import { TableStatusBadge, type TableColumn } from "@/components/Table";
import { permissionLabels, type User } from "@entities/user";
import { Pencil, Trash } from "lucide-react";

export type UserTableColumn = TableColumn<User>;

export const getUserTableColumns = (
  onEdit: (user: User) => void,
  onDelete: (user: User) => void,
): UserTableColumn[] => [
  {
    id: "name",
    header: "Nome",
    accessorKey: "name",
    className: "font-medium",
    mobile: { role: "title" },
  },
  {
    id: "email",
    header: "E-mail",
    accessorKey: "email",
    mobile: { role: "subtitle" },
  },
  {
    id: "permission",
    header: "Permissão",
    accessorKey: "permission",
    mobile: { role: "field", label: "Permissão" },
    cell: ({ value }) =>
      permissionLabels[value as User["permission"]] ?? String(value),
  },
  {
    id: "storeId",
    header: "Loja",
    accessorKey: "storeId",
    mobile: { role: "field", label: "Loja" },
    cell: ({ value }) => `#${value}`,
  },
  {
    id: "phone",
    header: "Telefone",
    accessorKey: "phone",
    mobile: { role: "field", label: "Telefone", className: "col-span-2" },
  },
  {
    id: "login",
    header: "Login",
    accessorKey: "login",
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
    render: (user) => (
      <div className="flex items-center justify-end gap-1">
        <ActionButton
          variant="ghost"
          className="p-2"
          onClick={() => onEdit(user)}
          aria-label={`Editar ${user.name}`}
        >
          <Pencil className="h-4 w-4 text-kyowa-gold" strokeWidth={1.75} />
        </ActionButton>
        <ActionButton
          variant="ghost"
          className="p-2"
          onClick={() => onDelete(user)}
          aria-label={`Remover ${user.name}`}
        >
          <Trash className="h-4 w-4 text-red-700" strokeWidth={1.75} />
        </ActionButton>
      </div>
    ),
  },
];
