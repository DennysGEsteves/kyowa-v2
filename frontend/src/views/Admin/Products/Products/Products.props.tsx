import { ActionButton } from "@/components/Form/ActionButton";
import type { TableColumn } from "@/components/Table";
import {
  formatProductPrice,
  formatProductStock,
  type Product,
} from "@entities";
import { Pencil, Trash } from "lucide-react";

export type ProductTableColumn = TableColumn<Product>;

export const getProductTableColumns = (
  onEdit: (product: Product) => void,
  onDelete: (product: Product) => void,
): ProductTableColumn[] => [
  {
    id: "name",
    header: "Nome",
    accessorKey: "name",
    className: "font-medium max-w-[180px]",
    mobile: { role: "title" },
  },
  {
    id: "fantasyName",
    header: "Fantasia",
    accessorKey: "fantasyName",
    mobile: { role: "subtitle" },
    className: "max-w-[160px]",
  },
  {
    id: "ref",
    header: "Ref.",
    accessorKey: "ref",
    mobile: { role: "field", label: "Ref." },
    cell: ({ value }) => (value ? String(value) : "—"),
  },
  {
    id: "sellPrice",
    header: "Venda",
    accessorKey: "sellPrice",
    mobile: { role: "field", label: "Preço" },
    cell: ({ value }) => formatProductPrice(value as number | null),
  },
  {
    id: "stock",
    header: "Estoque",
    mobile: { role: "field", label: "Estoque" },
    render: (product) => formatProductStock(product),
  },
  {
    id: "actions",
    header: "Ações",
    align: "right",
    mobile: { role: "actions" },
    render: (product) => (
      <div className="flex items-center justify-end gap-1">
        <ActionButton
          variant="ghost"
          className="p-2"
          onClick={() => onEdit(product)}
          aria-label={`Editar ${product.name}`}
        >
          <Pencil className="h-4 w-4 text-kyowa-gold" strokeWidth={1.75} />
        </ActionButton>
        <ActionButton
          variant="ghost"
          className="p-2"
          onClick={() => onDelete(product)}
          aria-label={`Remover ${product.name}`}
        >
          <Trash className="h-4 w-4 text-red-700" strokeWidth={1.75} />
        </ActionButton>
      </div>
    ),
  },
];
