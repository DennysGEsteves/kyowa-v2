import type { Address } from "@entities";
import { formatCepBR } from "@/utils/masks";

export type AddressFormValues = {
  cep: string;
  street: string;
  number: string;
  district: string;
  city: string;
  region: string;
};

export const emptyAddressFormValues = (): AddressFormValues => ({
  cep: "",
  street: "",
  number: "",
  district: "",
  city: "",
  region: "",
});

export function addressToFormValues(
  address: Address | null | undefined,
): AddressFormValues {
  return {
    cep: formatCepBR(address?.cep ?? ""),
    street: address?.street ?? "",
    number: address?.number ?? "",
    district: address?.district ?? "",
    city: address?.city ?? "",
    region: address?.region ?? "",
  };
}

export function formValuesToAddressPayload(values: AddressFormValues) {
  const hasValue = Object.values(values).some((field) => field.trim() !== "");
  if (!hasValue) {
    return undefined;
  }

  return {
    cep: values.cep.trim() || undefined,
    street: values.street.trim() || undefined,
    number: values.number.trim() || undefined,
    district: values.district.trim() || undefined,
    city: values.city.trim() || undefined,
    region: values.region.trim().toUpperCase() || undefined,
  };
}
