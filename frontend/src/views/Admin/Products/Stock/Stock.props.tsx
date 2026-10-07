import { ActionButton } from "@/components/Form/ActionButton";
import type { TableColumn } from "@/components/Table";
import {
  getStockSealCount,
  type Product,
  type Stock,
  type Store,
  type User,
} from "@entities";

export type StockTableColumn = TableColumn<Stock>;

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

function formatStockCreatedAt(createdAt: string) {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }
  return dateTimeFormatter.format(date);
}

export function buildStockLookups(
  products: Product[],
  stores: Store[],
  users: User[],
) {
  const productById = new Map(products.map((product) => [product.id, product]));
  const storeById = new Map(stores.map((store) => [store.id, store]));
  const userById = new Map(users.map((user) => [user.id, user]));

  return {
    getProductLabel: (productId: string) => {
      const product = productById.get(productId);
      if (!product) return "—";
      return product.fantasyName
        ? `${product.name} (${product.fantasyName})`
        : product.name;
    },
    getStoreName: (storeId: string) => storeById.get(storeId)?.name ?? "—",
    getUserName: (userId: string) => userById.get(userId)?.name ?? "—",
  };
}

export const getStockTableColumns = (
  lookups: ReturnType<typeof buildStockLookups>,
  onViewSeals: (stock: Stock) => void,
): StockTableColumn[] => [
  {
    id: "createdAt",
    header: "Data",
    accessorKey: "createdAt",
    className: "whitespace-nowrap",
    mobile: { role: "title" },
    cell: ({ value }) => formatStockCreatedAt(String(value)),
  },
  {
    id: "product",
    header: "Produto",
    mobile: { role: "subtitle" },
    render: (stock) => lookups.getProductLabel(stock.productId),
  },
  {
    id: "store",
    header: "Loja",
    mobile: { role: "field", label: "Loja" },
    render: (stock) => lookups.getStoreName(stock.storeId),
  },
  {
    id: "user",
    header: "Cadastrado por",
    mobile: { role: "field", label: "Cadastrado por" },
    render: (stock) => lookups.getUserName(stock.userId),
  },
  {
    id: "sealCount",
    header: "Lacres",
    align: "right",
    mobile: { role: "field", label: "Lacres" },
    render: (stock) => String(getStockSealCount(stock)),
  },
  {
    id: "actions",
    header: "Ações",
    align: "right",
    mobile: { role: "actions" },
    render: (stock) => (
      <div className="flex justify-end">
        <ActionButton
          variant="primary"
          className="px-3 py-1.5 text-xs"
          onClick={() => onViewSeals(stock)}
        >
          Ver lacres
        </ActionButton>
      </div>
    ),
  },
];
