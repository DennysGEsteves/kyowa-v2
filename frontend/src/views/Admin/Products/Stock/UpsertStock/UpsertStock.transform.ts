import type { CreateStockDTO } from "@/api/Stock/Stock.dto";
import type { StockFormSchema } from "./UpsertStock.schema";

export function formValuesToCreateStockDTO(
  values: StockFormSchema,
  userId: string,
): CreateStockDTO {
  return {
    productId: values.productId,
    storeId: values.storeId,
    userId,
    sealNumbers: values.sealNumbers,
  };
}
