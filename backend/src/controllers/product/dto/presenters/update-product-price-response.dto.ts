export type UpdateProductsPriceResponse = {
  readonly updatedCount: number;
};

export function toUpdateProductsPriceResponse(
  updatedCount: number,
): UpdateProductsPriceResponse {
  return {
    updatedCount,
  };
}
