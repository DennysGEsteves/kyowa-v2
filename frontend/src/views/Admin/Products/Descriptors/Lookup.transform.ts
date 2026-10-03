import type { ProductLookup } from "@entities";
import type { LookupFormSchema } from "./Lookup.schema";

export function lookupToFormValues(item: ProductLookup): LookupFormSchema {
  return {
    name: item.name,
  };
}

export function formValuesToUpsertLookupDTO(
  values: LookupFormSchema,
): { name: string } {
  return {
    name: values.name,
  };
}
