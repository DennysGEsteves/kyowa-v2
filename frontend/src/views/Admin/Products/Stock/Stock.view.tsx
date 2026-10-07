"use client";

import { DataTable, TablePagination } from "@/components/Table";
import { routes } from "@routes";
import { Plus } from "lucide-react";
import Link from "next/link";
import { StockSealsDialog } from "./components/StockSealsDialog";
import { StockLogic } from "./Stock.logic";

export function StockView() {
  const { data, methods } = StockLogic();

  const totalLabel =
    data.meta.total === 1
      ? "1 lançamento de estoque"
      : `${data.meta.total} lançamentos de estoque`;

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-kyowa-muted">{totalLabel}</p>
        <Link
          href={routes.stock.new}
          className="inline-flex items-center justify-center gap-2 bg-kyowa-maroon px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-kyowa-maroon-dark"
        >
          <Plus className="h-4 w-4" strokeWidth={2} />
          Novo lançamento
        </Link>
      </div>

      {data.isError ? (
        <p className="text-sm text-red-600">
          Não foi possível carregar o estoque. Tente novamente.
        </p>
      ) : data.isLoading ? (
        <p className="text-sm text-kyowa-muted">Carregando estoque…</p>
      ) : (
        <>
          <DataTable
            data={data.stockEntries}
            columns={data.columns}
            emptyMessage={
              <>
                Nenhum lançamento de estoque cadastrado. Use &quot;Novo
                lançamento&quot; para adicionar.
              </>
            }
          />
          <TablePagination
            page={data.meta.page}
            totalPages={data.meta.totalPages}
            onPageChange={methods.setPage}
            disabled={data.isFetching}
          />
        </>
      )}

      <StockSealsDialog
        open={Boolean(data.selectedStock)}
        stock={data.selectedStock}
        productLabel={
          data.selectedStock
            ? data.getProductLabel(data.selectedStock.productId)
            : ""
        }
        onClose={() => methods.setSelectedStock(null)}
      />
    </>
  );
}
