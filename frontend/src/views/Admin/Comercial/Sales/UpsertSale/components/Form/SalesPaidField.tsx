"use client";

import { getFormikFieldError } from "@/components/Form/formikField";
import { FormFieldError } from "@/components/Form/FormFieldError";
import { useFormikContext } from "formik";
import type { SalesFormSchema } from "../../UpsertSale.schema";

const optionBaseClass =
  "flex-1 px-4 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kyowa-maroon";

function optionClass(active: boolean): string {
  if (active) {
    return `${optionBaseClass} bg-kyowa-maroon text-white`;
  }
  return `${optionBaseClass} bg-white text-kyowa-ink hover:bg-kyowa-surface`;
}

export function SalesPaidField() {
  const { values, errors, touched, submitCount, setFieldValue } =
    useFormikContext<SalesFormSchema>();

  const isPaid = values.isPaid;
  const errorMessage = getFormikFieldError(
    touched,
    errors,
    "isPaid",
    submitCount,
  );

  function selectPaid(next: boolean) {
    void setFieldValue("isPaid", next);
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className="inline-flex w-full max-w-md overflow-hidden rounded-sm border border-kyowa-border bg-white shadow-sm"
        role="group"
        aria-label="Status do pagamento"
      >
        <button
          type="button"
          className={`${optionClass(!isPaid)} border-r border-kyowa-border`}
          aria-pressed={!isPaid}
          onClick={() => selectPaid(false)}
        >
          Não pago
        </button>
        <button
          type="button"
          className={optionClass(isPaid)}
          aria-pressed={isPaid}
          onClick={() => selectPaid(true)}
        >
          Pago
        </button>
      </div>
      <FormFieldError message={errorMessage} />
    </div>
  );
}
