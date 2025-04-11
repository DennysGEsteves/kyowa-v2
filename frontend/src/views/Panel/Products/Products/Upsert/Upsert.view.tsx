"use client";

import type { Product } from "@/@types";
import { PageTitle, Section } from "@/components";
import { MultiStepItem, MultiStepRoot } from "@/components/Form";
import { FormProvider } from "react-hook-form";
import { useLogic } from "./Upsert.logic";
import { DescriptorsStep, GeneralStep } from "./steps";

export type UpsertProps = {
  product?: Product;
};

export const Upsert = (props: UpsertProps) => {
  const { data, methods } = useLogic(props);

  return (
    <>
      <PageTitle>
        {props.product ? `Editar ${props.product.name}` : "Criar Produto"}
      </PageTitle>
      <Section>
        <FormProvider {...data.form}>
          <form onSubmit={methods.handleSubmit}>
            <MultiStepRoot onCancel={methods.backToProducts}>
              <MultiStepItem label="Dados Gerais">
                <GeneralStep />
              </MultiStepItem>
              <MultiStepItem label="Descritores">
                <DescriptorsStep />
              </MultiStepItem>
            </MultiStepRoot>
          </form>
        </FormProvider>
      </Section>
    </>
  );
};

export default Upsert;
