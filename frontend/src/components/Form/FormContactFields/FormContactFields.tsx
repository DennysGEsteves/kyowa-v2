"use client";

import { formFieldGrid2 } from "../formLayout";
import { FormInput } from "../FormInput";
import { FormPhoneInput } from "../FormPhoneInput";

type FormContactFieldsProps = {
  idPrefix: string;
};

export function FormContactFields({ idPrefix }: FormContactFieldsProps) {
  return (
    <div className="space-y-4">
      <FormInput
        name="email"
        label="E-mail"
        id={`${idPrefix}-email`}
        type="email"
      />
      <div className={formFieldGrid2}>
        <FormPhoneInput
          name="phone1"
          label="Telefone 1"
          id={`${idPrefix}-phone1`}
        />
        <FormPhoneInput
          name="phone2"
          label="Telefone 2"
          id={`${idPrefix}-phone2`}
        />
      </div>
    </div>
  );
}
