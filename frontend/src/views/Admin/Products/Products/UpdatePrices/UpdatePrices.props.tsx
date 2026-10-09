import type { ProductPriceUpdateListItem } from "@/api/Products/Products.dto";
import type { TableColumn } from "@/components/Table";
import { formatProductPrice } from "@entities";
import { currencyFieldLabel } from "@/utils/masks";

export type UpdatePricesTableColumn = TableColumn<ProductPriceUpdateListItem>;

export function computeAdjustedSellPrice(
  sellPrice: number | null | undefined,
  adjustmentPercent: number,
): number | null {
  if (sellPrice === null || sellPrice === undefined) {
    return null;
  }

  return sellPrice * (1 + adjustmentPercent / 100);
}

export function getUpdatePricesTableColumns(
  adjustmentPercent: number,
): UpdatePricesTableColumn[] {
  return [
    {
      id: "name",
      header: "Nome do produto",
      accessorKey: "name",
      className: "font-medium max-w-[180px]",
      mobile: { role: "title" },
    },
    {
      id: "fantasyName",
      header: "Nome fantasia",
      accessorKey: "fantasyName",
      className: "max-w-[160px]",
      mobile: { role: "subtitle" },
      cell: ({ value }) => (value ? String(value) : "—"),
    },
    {
      id: "providerName",
      header: "Fornecedor",
      mobile: { role: "field", label: "Fornecedor" },
      render: (product) => product.provider?.name ?? "—",
    },
    {
      id: "categoryName",
      header: "Categoria",
      mobile: { role: "field", label: "Categoria" },
      render: (product) => product.category?.name ?? "—",
    },
    {
      id: "sellPrice",
      header: currencyFieldLabel("Valor atual"),
      accessorKey: "sellPrice",
      align: "right",
      mobile: { role: "field", label: currencyFieldLabel("Valor atual") },
      cell: ({ value }) => formatProductPrice(value as number | null),
    },
    {
      id: "adjustedSellPrice",
      header: currencyFieldLabel("Valor após reajuste"),
      align: "right",
      mobile: {
        role: "trailing",
        label: currencyFieldLabel("Após reajuste"),
      },
      render: (product) =>
        formatProductPrice(
          computeAdjustedSellPrice(product.sellPrice, adjustmentPercent),
        ),
    },
  ];
}
