"use client";

import { BudgetReceiptView } from "@/views/Admin/Comercial/Budgets/BudgetReceipt";
import { useParams } from "next/navigation";

export default function OrcamentoReciboPage() {
  const params = useParams();
  const id = params.id as string;

  return <BudgetReceiptView budgetId={id} />;
}
