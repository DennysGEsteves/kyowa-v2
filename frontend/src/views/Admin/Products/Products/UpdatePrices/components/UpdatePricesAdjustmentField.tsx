"use client";

import { formInputClass, formLabelClass } from "@/components/Form/FieldStyles";

type UpdatePricesAdjustmentFieldProps = {
  value: number;
  onChange: (value: number) => void;
  onConfirm: () => void;
  isConfirming?: boolean;
  canConfirm?: boolean;
};

function clampPercent(value: number): number {
  if (Number.isNaN(value)) {
    return 0;
  }
  return Math.min(100, Math.max(0, value));
}

export function UpdatePricesAdjustmentField({
  value,
  onChange,
  onConfirm,
  isConfirming = false,
  canConfirm = false,
}: UpdatePricesAdjustmentFieldProps) {
  return (
    <div className="mb-4 max-w-xl rounded-sm border border-kyowa-border bg-white p-4">
      <label htmlFor="update-prices-adjustment" className={formLabelClass}>
        Reajuste do valor de venda (%)
      </label>
      <input
        id="update-prices-adjustment"
        type="number"
        min={0}
        max={100}
        step="0.01"
        value={value}
        onChange={(event) => {
          const next = event.target.value;
          if (next === "") {
            onChange(0);
            return;
          }
          onChange(clampPercent(Number(next)));
        }}
        className={formInputClass}
        inputMode="decimal"
        disabled={isConfirming}
      />
      <p className="mt-1 text-xs text-kyowa-muted">
        Máximo 100%. O valor após reajuste é calculado sobre o preço de venda
        atual. A confirmação altera todos os produtos que correspondem aos
        filtros da busca (não apenas a página atual).
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onConfirm}
          disabled={!canConfirm || isConfirming}
          className="inline-flex items-center justify-center bg-kyowa-maroon px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-kyowa-maroon-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isConfirming ? "Aplicando reajuste…" : "Confirmar reajuste"}
        </button>
      </div>
    </div>
  );
}
