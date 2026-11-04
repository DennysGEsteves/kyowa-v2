"use client";

import { SaleReceipt } from "@/views/Admin/Comercial/Sales/SaleReceipt";
import { useParams } from "next/navigation";

export default function VendaReciboPage() {
  const params = useParams();
  const id = params.id as string;

  return <SaleReceipt saleId={id} />;
}
