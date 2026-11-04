import {
  tableActionIconClass,
  tableActionIconLinkClass,
  type TableColumn,
} from "@/components/Table";
import { sumSaleCheckoutTotal, type Sale } from "@entities";
import type { ConsignmentTableLookups } from "./Consignment.lookups";
import { formatDateTimeShort } from "@/utils/date";
import { formatCurrencyBRL } from "@/utils/currency";
import { currencyFieldLabel } from "@/utils/masks";
import { routes } from "@routes";
import { Pencil } from "lucide-react";
import Link from "next/link";

export const getConsignmentTableColumns = (
  lookups: ConsignmentTableLookups,
): TableColumn<Sale>[] => [
  {
    id: "sequentialId",
    header: "#",
    align: "center",
    className: "whitespace-nowrap text-center tabular-nums",
    mobile: { role: "field", label: "#" },
    render: (sale) =>
      sale.sequentialId != null ? String(sale.sequentialId) : "—",
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
    render: (sale) => lookups.getClientName(sale.clientId),
  },
  {
    id: "architect",
    header: "Arquiteto",
    mobile: { role: "field", label: "Arquiteto" },
    render: (sale) => lookups.getArchitectName(sale.architectId),
  },
  {
    id: "store",
    header: "Loja",
    mobile: { role: "field", label: "Loja" },
    render: (sale) => lookups.getStoreName(sale.storeId),
  },
  {
    id: "seller",
    header: "Vendedor",
    mobile: { role: "field", label: "Vendedor" },
    render: (sale) => lookups.getSellerName(sale.sellerId),
  },
  {
    id: "total",
    header: currencyFieldLabel("Total"),
    align: "left",
    className: "text-left",
    mobile: { role: "field", label: currencyFieldLabel("Total") },
    render: (sale) => formatCurrencyBRL(sumSaleCheckoutTotal(sale.checkout)),
  },
  {
    id: "actions",
    header: "Ações",
    align: "right",
    mobile: { role: "actions" },
    render: (sale) => (
      <div className="flex items-center justify-end gap-1">
        <Link
          href={routes.consignment.edit(sale.id)}
          className={tableActionIconLinkClass}
          aria-label={
            sale.sequentialId != null
              ? `Editar consignação #${sale.sequentialId}`
              : "Editar consignação"
          }
        >
          <Pencil
            className={`${tableActionIconClass} text-kyowa-gold`}
            strokeWidth={1.75}
          />
        </Link>
      </div>
    ),
  },
];
