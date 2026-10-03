export type FormAddressAutofillFields = {
  street: string;
  district: string;
  city: string;
  region: string;
};

export const defaultFormAddressAutofillFields: FormAddressAutofillFields = {
  street: "address.street",
  district: "address.district",
  city: "address.city",
  region: "address.region",
};
