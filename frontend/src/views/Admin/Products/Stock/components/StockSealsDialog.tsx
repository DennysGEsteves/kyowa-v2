"use client";

import { useStockDetailQuery } from "@/api/Stock/stock.query";
import { Modal } from "@/components/Modal";
import {
  sealNumberTagClass,
  sealStatusBadgeClass,
  sealStatusLabels,
  type Stock,
} from "@entities";

type StockSealsDialogProps = {
  open: boolean;
  stock: Stock | null;
  productLabel: string;
  onClose: () => void;
};

export function StockSealsDialog({
  open,
  stock,
  productLabel,
  onClose,
}: StockSealsDialogProps) {
  const stockId = open && stock ? stock.id : null;
  const { data, isLoading, isError } = useStockDetailQuery(stockId);

  const seals = data?.seals ?? [];

  return (
    <Modal.Root
      open={open}
      onClose={onClose}
      title="Lacres do lançamento"
    >
      <p className="text-sm text-kyowa-muted">{productLabel}</p>

      {isLoading ? (
        <p className="mt-4 text-sm text-kyowa-muted">Carregando lacres…</p>
      ) : isError ? (
        <p className="mt-4 text-sm text-red-600">
          Não foi possível carregar os lacres. Tente novamente.
        </p>
      ) : seals.length === 0 ? (
        <p className="mt-4 text-sm text-kyowa-muted">
          Nenhum lacra vinculado a este lançamento.
        </p>
      ) : (
        <ul className="mt-4 max-h-80 divide-y divide-kyowa-border overflow-y-auto border border-kyowa-border">
          {seals.map((seal) => (
            <li
              key={seal.id}
              className="flex items-center justify-between gap-3 px-3 py-2.5"
            >
              <span className={sealNumberTagClass}>{seal.number}</span>
              <span className={sealStatusBadgeClass[seal.status]}>
                {sealStatusLabels[seal.status]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Modal.Root>
  );
}
