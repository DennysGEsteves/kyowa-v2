"use client";

import { BudgetReceipt } from "@/views/Admin/Comercial/Budgets/BudgetReceipt";
import { useParams } from "next/navigation";

export default function BudgetReceiptPage() {
  const params = useParams();
  const id = params.id as string;

  return <BudgetReceipt budgetId={id} />;
}
