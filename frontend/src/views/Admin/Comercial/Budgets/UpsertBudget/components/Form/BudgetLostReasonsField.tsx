"use client";

import { formLabelClass } from "@/components/Form/FieldStyles";
import { FormFieldError } from "@/components/Form/FormFieldError";
import {
  budgetLostReasonLabels,
  budgetLostReasons,
  type BudgetLostReason,
} from "@entities";
import { useFormikContext } from "formik";
import type { BudgetFormSchema } from "../../UpsertBudget.schema";

export function BudgetLostReasonsField() {
  const { values, errors, touched, setFieldValue, setFieldTouched } =
    useFormikContext<BudgetFormSchema>();

  const showError = touched.lostReasons && errors.lostReasons;
  const errorMessage = showError ? String(errors.lostReasons) : undefined;

  function toggle(reason: BudgetLostReason) {
    const selected = new Set(values.lostReasons);
    if (selected.has(reason)) {
      selected.delete(reason);
    } else {
      selected.add(reason);
    }
    void setFieldValue(
      "lostReasons",
      budgetLostReasons.filter((key) => selected.has(key)),
    );
    void setFieldTouched("lostReasons", true, false);
  }

  return (
    <div className="sm:col-span-2">
      <p className={formLabelClass}>Motivo da perda</p>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {budgetLostReasons.map((reason) => {
          const id = `budget-lost-reason-${reason}`;
          return (
            <label
              key={reason}
              htmlFor={id}
              className="flex cursor-pointer items-center gap-3 text-sm text-kyowa-ink"
            >
              <input
                id={id}
                type="checkbox"
                checked={values.lostReasons.includes(reason)}
                onChange={() => toggle(reason)}
                className="h-4 w-4 rounded border-kyowa-border text-kyowa-maroon focus:ring-kyowa-maroon"
              />
              {budgetLostReasonLabels[reason]}
            </label>
          );
        })}
      </div>
      <FormFieldError message={errorMessage} />
    </div>
  );
}
