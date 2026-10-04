"use client";

import { formInputClass, formLabelClass } from "@/components/Form/FieldStyles";

type UpdatePricesAdjustmentFieldProps = {
  value: number;
  onChange: (value: number) => void;
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
}: UpdatePricesAdjustmentFieldProps) {
  return (
    <div className="mb-4 max-w-xs rounded-sm border border-kyowa-border bg-white p-4">
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
      />
      <p className="mt-1 text-xs text-kyowa-muted">
        Máximo 100%. O valor após reajuste é calculado sobre o preço de venda
        atual.
      </p>
    </div>
  );
}
