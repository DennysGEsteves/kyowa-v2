import { ActionButton } from "@/components/Form/ActionButton";
import type { TableColumn } from "@/components/Table";
import {
  formatProductPrice,
  sealNumberTagClass,
  sealStatusBadgeClass,
  sealStatusLabels,
  type SealSearchItem,
} from "@entities";

export type SealLookupTableColumn = TableColumn<SealSearchItem>;

export const getSealLookupTableColumns = (
  onOpenSeal: (item: SealSearchItem) => void,
): SealLookupTableColumn[] => [
  {
    id: "number",
    header: "Número",
    accessorKey: "number",
    mobile: { role: "title" },
    render: (item) => (
      <span className={sealNumberTagClass}>{item.number}</span>
    ),
  },
  {
    id: "product",
    header: "Produto",
    accessorKey: "productName",
    mobile: { role: "subtitle" },
  },
  {
    id: "sellPrice",
    header: "Valor R$",
    align: "right",
    mobile: { role: "field", label: "Valor" },
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
    render: (item) => (
      <span className={sealStatusBadgeClass[item.status]}>
        {sealStatusLabels[item.status]}
      </span>
    ),
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
          className="px-3 py-1.5 text-xs"
          onClick={() => onOpenSeal(item)}
        >
          Abrir lacre
        </ActionButton>
      </div>
    ),
  },
];
