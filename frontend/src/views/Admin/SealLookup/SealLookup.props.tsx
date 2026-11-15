import { ActionButton } from "@/components/Form/ActionButton";
import { SealNumberTag } from "@/components/SealNumberTag";
import { SealStatusBadge } from "@/components/SealStatusBadge";
import type { TableColumn } from "@/components/Table";
import { currencyFieldLabel } from "@/utils/masks";
import { formatProductPrice, type SealSearchItem } from "@entities";

export type SealLookupTableColumn = TableColumn<SealSearchItem>;

export const getSealLookupTableColumns = (
  onOpenSeal: (item: SealSearchItem) => void,
): SealLookupTableColumn[] => [
  {
    id: "number",
    header: "Número",
    accessorKey: "number",
    mobile: { role: "title" },
    render: (item) => <SealNumberTag number={item.number} />,
  },
  {
    id: "product",
    header: "Produto",
    accessorKey: "productName",
    mobile: { role: "subtitle" },
  },
  {
    id: "sellPrice",
    header: currencyFieldLabel("Valor"),
    align: "right",
    mobile: { role: "field", label: currencyFieldLabel("Valor") },
    render: (item) => formatProductPrice(item.sellPrice),
  },
  {
    id: "store",
    header: "Loja",
    accessorKey: "storeName",
    mobile: { role: "field", label: "Loja" },
  },
  {
    id: "status",
    header: "Status",
    mobile: { role: "field", label: "Status" },
    render: (item) => <SealStatusBadge status={item.status} />,
  },
  {
    id: "actions",
    header: "Ações",
    align: "right",
    mobile: { role: "actions" },
    render: (item) => (
      <div className="flex justify-end">
        <ActionButton
          variant="primary"
          size="sm"
          onClick={() => onOpenSeal(item)}
        >
          Abrir lacre
        </ActionButton>
      </div>
    ),
  },
];
