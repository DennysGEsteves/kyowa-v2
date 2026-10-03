"use client";

import { defaultFormAddressAutofillFields } from "../formAddressAutofill";
import { formFieldGrid2, formFieldGrid3 } from "../formLayout";
import { FormCepInput } from "../FormCepInput";
import { FormInput } from "../FormInput";

type FormAddressFieldsProps = {
  /** Prefixo para ids únicos (ex.: client, store) */
  idPrefix: string;
};

export function FormAddressFields({ idPrefix }: FormAddressFieldsProps) {
  return (
    <div className="space-y-4">
      <FormCepInput
        name="address.cep"
        label="CEP"
        id={`${idPrefix}-cep`}
        autofillAddressFields={defaultFormAddressAutofillFields}
      />
      <p className="text-xs text-kyowa-muted">
        Bairro, cidade, estado e rua são preenchidos ao informar o CEP.
      </p>
      <div className={formFieldGrid3}>
        <FormInput
          name="address.district"
          label="Bairro"
          id={`${idPrefix}-district`}
          locked
        />
        <FormInput
          name="address.city"
          label="Cidade"
          id={`${idPrefix}-city`}
          locked
        />
        <FormInput
          name="address.region"
          label="Estado"
          id={`${idPrefix}-region`}
          locked
        />
      </div>
      <div className={formFieldGrid2}>
        <FormInput
          name="address.street"
          label="Rua"
          id={`${idPrefix}-street`}
          locked
        />
        <FormInput
          name="address.number"
          label="Número"
          id={`${idPrefix}-number`}
        />
      </div>
    </div>
  );
}
